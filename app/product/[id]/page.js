"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/libs/supabase/client"; // Ensure correct import
import { useParams } from "next/navigation";
import {
  Calendar,
  MessageCircle,
  Clock,
  MapPin,
  Tag,
  Loader,
  User,
  Mail,
} from "lucide-react";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    if (!params.id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productId = params.id;

        // Fetch product from Supabase
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .single(); // Fetch only one item

        if (error) {
          throw new Error(error.message);
        }

        // Convert tags from string to array
        const processedProduct = {
          ...data,
          tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
        };

        setProduct(processedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 text-[#cc0000] animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-neutral-800">
          {error || "Product not found"}
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 md:px-8 lg:px-16 py-6">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto mb-8">
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
          <li className="text-neutral-400">{product.name}</li>
        </ol>
      </nav>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Image Section */}
          <div className="relative aspect-square bg-neutral-50">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full"
            />
            {product.originalPrice > product.price && (
              <div className="absolute top-6 left-6 bg-[#cc0000] text-white px-4 py-2 text-sm font-medium">
                {Math.round((1 - product.price / product.originalPrice) * 100)}%
                OFF
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex flex-col gap-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold text-[#4b4b4b] mb-4">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-[#cc0000]">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-neutral-500 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4 text-base text-neutral-600">
              <div className="flex items-center gap-3">
                <Tag size={20} className="text-neutral-400" />
                <span className="font-medium min-w-[100px]">Condition:</span>
                <span>{product.condition}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-neutral-400" />
                <span className="font-medium min-w-[100px]">Location:</span>
                <span>{product.location}</span>
              </div>
              <div className="flex items-center gap-3 ">
                <User size={20} className="text-neutral-400" />
                <span className="font-medium min-w-[100px]">Owner:</span>
                <span>{product.owner.split("@")[0]}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-neutral-400" />
                <span className="font-medium min-w-[100px]">Listed:</span>
                <span>{new Date(product.listedDate).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {product.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 text-base bg-[#ff4d4d]/10 text-[#cc0000]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold text-neutral-800 mb-4">
                Description
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-6 mt-8">
              <button
                className="flex-1 bg-[#cc0000] text-white py-4 px-8 flex items-center justify-center gap-3 transition-colors duration-200"
                onClick={() => alert("Added to waitlist!")}
              >
                <Mail className="w-6 h-6" />
                Mail Owner
              </button>
              <button
                className="flex-1 border-2 border-[#cc0000] text-[#cc0000] hover:bg-[#cc0000] hover:text-white py-4 px-8 flex items-center justify-center gap-3 transition-colors duration-200"
                onClick={() => alert("Message sent!")}
              >
                <MessageCircle className="w-6 h-6" />
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
