"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/libs/supabase/client"; // Ensure correct import

const tagOptions = [
  "Books",
  "Electronics",
  "Games",
  "Home",
  "Furniture",
  "Appliances",
  "Fashion",
];

const AddProductPage = () => {
  // Form Fields
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

  // Logged in User State 
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");

  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  //  Function to handle image while uploading
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save the product in Supabase
      const { data, error } = await supabase.from("products").insert([
        {
          name,
          description,
          price: parseFloat(price),
          originalPrice: originalPrice ? parseFloat(originalPrice) : null,
          location,
          condition,
          phone: phone || null,
          tags: selectedTags.join(","),
          image,
          listedDate: new Date().toISOString(),
          owner: email,
        },
      ]);

      if (error) throw error;

      alert("Product added successfully!");

      // Reset form after successful submission
      setName("");
      setDescription("");
      setPrice("");
      setOriginalPrice("");
      setLocation("");
      setCondition("New");
      setPhone("");
      setSelectedTags([]);
      setImage("");
      setImagePreview(null);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-white px-4 md:px-8 lg:px-16 py-12">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header Section with Breadcrumb */}
        <div className="mb-8">
          <nav className="mb-4">
            <ol className="flex items-center space-x-2 text-sm text-neutral-600">
              <li>
                <a href="/" className="hover:text-[#cc0000] transition">
                  Home
                </a>
              </li>
              <li>/</li>
              <li>
                <a
                  href="/marketplace"
                  className="hover:text-[#cc0000] transition"
                >
                  Marketplace
                </a>
              </li>
              <li>/</li>
              <li className="text-neutral-400">{name || "Add Product"}</li>
            </ol>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-[#4b4b4b]">
            {name ? `Edit "${name}"` : "Add New Product"}
          </h1>
          <div className="h-1 w-24 bg-[#cc0000] mt-4"></div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#cc0000] focus:border-[#cc0000] outline-none transition"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Description{" "}
              <span className="text-sm text-gray-400">
                ({description.length}/500 characters)
              </span>
            </label>
            <textarea
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#cc0000] focus:border-[#cc0000] outline-none transition min-h-[120px]"
              placeholder="Describe your product in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Product Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#cc0000] transition cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="image-upload"
                onChange={handleImageUpload}
                required
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                {!imagePreview ? (
                  <div className="space-y-2">
                    <div className="mx-auto flex justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500">
                      Click to upload an image or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">
                      JPG, PNG or GIF (Max 5MB)
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Product Preview"
                      className="h-60 w-full object-contain rounded"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setImagePreview(null);
                        document.getElementById("image-upload").value = "";
                      }}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-700"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Price & Original Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Price ($)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  className="w-full border border-gray-300 pl-8 p-3 rounded-md focus:ring-2 focus:ring-[#cc0000] focus:border-[#cc0000] outline-none transition"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="1"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Original Price ($){" "}
                <span className="text-sm text-gray-400">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  className="w-full border border-gray-300 pl-8 p-3 rounded-md focus:ring-2 focus:ring-[#cc0000] focus:border-[#cc0000] outline-none transition"
                  placeholder="0.00"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  min="1"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {/* Location & Condition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#cc0000] focus:border-[#cc0000] outline-none transition"
                placeholder="City, State"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Condition
              </label>
              <select
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#cc0000] focus:border-[#cc0000] outline-none transition appearance-none bg-white"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Phone Number <span className="text-sm text-gray-400">(+1)</span>
              </label>
              <input
                type="tel"
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#cc0000] focus:border-[#cc0000] outline-none transition"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => {
                  const regex = /^[0-9\b]+$/;
                  if (e.target.value === "" || regex.test(e.target.value)) {
                    setPhone(e.target.value);
                  }
                }}
                maxLength={15}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Email Id
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#cc0000] focus:border-[#cc0000] outline-none transition"
                placeholder="Enter email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Tags Selection */}
          <div className="space-y-3">
            <label className="block text-lg font-medium text-gray-700">
              Product Tags
            </label>
            <div className="flex flex-wrap gap-3">
              {tagOptions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`px-5 py-2 text-base rounded-full transition ${
                    selectedTags.includes(tag)
                      ? "bg-[#cc0000] text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-6 mt-8 border-t">
            <button
              type="button"
              className="px-8 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition flex-1 md:flex-none"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-md bg-[#cc0000] text-white hover:bg-[#a80000] transition flex-1 md:flex-none flex justify-center items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Product</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
