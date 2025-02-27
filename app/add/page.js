"use client";

import { useState } from "react";

const tagOptions = ["Books", "Electronics", "Gaming", "Home", "Furniture", "Appliances", "Fashion"];

const page = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState("New");
  const [selectedTags, setSelectedTags] = useState([]); // Multi-select tags
  const [image, setImage] = useState(""); // Single image
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle tag selection
  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag) // Remove if already selected
        : [...prevTags, tag] // Add if not selected
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Store base64 string
        setImagePreview(reader.result); // Preview image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const productData = {
      name,
      description,
      price: parseFloat(price),
      originalPrice: parseFloat(originalPrice),
      location,
      condition,
      tags: selectedTags.join(","), // Store tags as a comma-separated string in Supabase
      image, // Single image in Base64 format
      listedDate: new Date().toISOString(),
    };

    console.log("Product Data:", productData);

    // Reset Form
    setIsSubmitting(false);
    alert("Product added successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add a New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full border p-2 rounded-md"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            required
          ></textarea>
        </div>

        {/* Price & Original Price */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-700">Price ($)</label>
            <input
              type="number"
              className="w-full border p-2 rounded-md"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="1"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-700">Original Price ($)</label>
            <input
              type="number"
              className="w-full border p-2 rounded-md"
              placeholder="Enter original price"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              min="1"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        {/* Condition */}
        <div>
          <label className="block text-gray-700">Condition</label>
          <select
            className="w-full border p-2 rounded-md"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
          </select>
        </div>

        {/* Tags Selection */}
        <div>
          <label className="block text-gray-700">Select Tags</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {tagOptions.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`px-4 py-2 border rounded-md ${
                  selectedTags.includes(tag) ? "bg-[#cc0000] text-white" : "bg-gray-100"
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Image Upload (Single Image Only) */}
        <div>
          <label className="block text-gray-700">Upload Image (1 only)</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border p-2 rounded-md"
            onChange={handleImageUpload}
            required
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Product Preview"
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#cc0000] text-white py-2 rounded-md hover:bg-[#a80000] transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Product"}
        </button>
      </form>
    </div>
  );
};

export default page;
