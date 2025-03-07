"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/libs/supabase/client";
import { Loader2, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";

const tagOptions = [
  "Books",
  "Electronics",
  "Games",
  "Home",
  "Furniture",
  "Appliances",
  "Fashion",
];

const EditProductPage = () => {
  const params = useParams();

  const router = useRouter();
  const productId = params.id;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState("New");
  const [selectedTags, setSelectedTags] = useState([]);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
        return;
      }

      // Populate state with existing product data
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setOriginalPrice(data.originalPrice || "");
      setLocation(data.location);
      setCondition(data.condition);
      setPhone(data.phone || "");
      setSelectedTags(data.tags ? data.tags.split(",") : []);
      setImage(data.image);
      setImagePreview(data.image);
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("products")
        .update({
          name,
          description,
          price: parseFloat(price),
          originalPrice: originalPrice ? parseFloat(originalPrice) : null,
          location,
          condition,
          phone: phone || null,
          tags: selectedTags.join(","),
          image,
        })
        .eq("id", productId);

      if (error) throw error;
      toast.success("Product updated successfully!");
      router.push("/profile"); // Redirect to profile page
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }

    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);
      if (error) throw error;

      toast.success("Product deleted successfully!");
      router.push("/profile"); // Redirect to profile after deletion
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }

    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center py-12 space-y-6">
          {/* Animated loader with brand color */}
          <div className="relative">
            <Loader2 className="w-12 h-12 text-[#cc0000] animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Loading text */}
          <div className="text-center">
            <p className="text-lg font-medium text-[#4b4b4b]">
              Loading product details
            </p>
            <p className="text-sm text-gray-500">Please wait a moment...</p>
          </div>
        </div>{" "}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 md:px-8 lg:px-16 py-12">
      <div className="w-full max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="flex items-center space-x-2 text-sm text-neutral-600">
            <li>
              <a href="/" className="hover:text-[#cc0000]">
                Home
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="/marketplace" className="hover:text-[#cc0000]">
                Marketplace
              </a>
            </li>
            <li>/</li>
            <li className="text-neutral-400">Edit Product</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-[#4b4b4b]">
          Edit Product
        </h1>
        <div className="h-1 w-24 bg-[#cc0000] mt-4"></div>

        {alert.show && (
          <div
            className={`mt-6 p-4 rounded-md flex items-center gap-3 ${
              alert.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : alert.type === "error"
                ? "bg-red-50 text-red-800 border border-red-200"
                : "bg-blue-50 text-blue-800 border border-blue-200"
            }`}
          >
            {alert.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : alert.type === "error" ? (
              <XCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <p>{alert.message}</p>
            <button
              className="ml-auto text-gray-500 hover:text-gray-700"
              onClick={() => setAlert({ show: false, type: "", message: "" })}
            >
              &times;
            </button>
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-8 mt-6">
          {/* Name */}
          <input
            type="text"
            className="w-full border p-3 rounded-md focus:ring-2 focus:ring-[#cc0000] focus:border-[#cc0000] outline-none transition"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Description */}
          <textarea
            className="w-full border p-3 rounded-md focus:ring-2 focus:ring-[#cc0000] focus:border-[#cc0000] outline-none transition"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={4}
            required
          />

          {/* Price & Original Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-[#cc0000] focus:border-[#cc0000] outline-none transition"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="1"
              required
            />
            <input
              type="number"
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-[#cc0000] focus:border-[#cc0000] outline-none transition"
              placeholder="Original Price (Optional)"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              min="1"
            />
          </div>

          {/* Location & Condition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-[#cc0000] focus:border-[#cc0000] outline-none transition"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <select
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-[#cc0000] focus:border-[#cc0000] outline-none transition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>

          {/* Phone */}
          <input
            type="tel"
            className="w-full border p-3 rounded-md focus:ring-2 focus:ring-[#cc0000] focus:border-[#cc0000] outline-none transition"
            placeholder="Phone Number (Optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={15}
          />

          {/* Tags */}
          <div>
            <p className="mb-2 text-neutral-700">Select Tags:</p>
            <div className="flex flex-wrap gap-2">
              {tagOptions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`px-4 py-2 border rounded-md transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-[#cc0000] text-white border-[#cc0000]"
                      : "bg-gray-100 hover:bg-gray-200 border-gray-200"
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <p className="text-neutral-700">Product Image:</p>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {imagePreview && (
            <div className="mt-2">
              <p className="text-neutral-700 mb-2">Preview:</p>
              <div className="relative w-40 h-40 rounded-md overflow-hidden border border-gray-200">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                  onClick={() => setImagePreview(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              type="submit"
              className="bg-[#cc0000] text-white py-3 px-6 rounded-md hover:bg-[#a80000] transition-colors flex items-center justify-center gap-2 shadow-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                "Update Product"
              )}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-white border border-red-500 text-red-500 py-3 px-6 rounded-md hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                "Delete Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
