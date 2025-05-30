"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/libs/supabase/client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Calendar,
  MessageCircle,
  MapPin,
  Tag,
  Loader,
  User,
  Mail,
  Check,
  ShoppingCart,
  Heart,
} from "lucide-react";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (!params.id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productId = params.id;

        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        const processedProduct = {
          ...data,
          tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
        };

        setProduct(processedProduct);
        
        // Check if product is in wishlist
        checkWishlistStatus(processedProduct.id);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  // Function to check if current product is in wishlist
  const checkWishlistStatus = (productId) => {
    if (typeof window !== 'undefined') {
      try {
        const wishlistData = localStorage.getItem('wishlist');
        
        // Make sure we have valid data
        if (!wishlistData) {
          setIsInWishlist(false);
          return;
        }
        
        // Try to parse the data safely
        const wishlist = JSON.parse(wishlistData);
        
        // Ensure wishlist is an array before using .some()
        if (Array.isArray(wishlist)) {
          setIsInWishlist(wishlist.some(item => item && item.id === productId));
        } else {
          // If wishlist isn't an array, reset it and set status to false
          localStorage.setItem('wishlist', JSON.stringify([]));
          setIsInWishlist(false);
        }
      } catch (err) {
        console.error("Error reading wishlist from localStorage:", err);
        // Reset wishlist if data is corrupted
        localStorage.setItem('wishlist', JSON.stringify([]));
        setIsInWishlist(false);
      }
    }
  };

  // Function to toggle wishlist status
  const toggleWishlist = () => {
    if (!product) return;
    
    try {
      // Get current wishlist from localStorage with error handling
      let wishlist = [];
      try {
        const wishlistData = localStorage.getItem('wishlist');
        wishlist = wishlistData ? JSON.parse(wishlistData) : [];
        
        // Ensure wishlist is an array
        if (!Array.isArray(wishlist)) {
          wishlist = [];
        }
      } catch (err) {
        console.error("Error parsing wishlist:", err);
        wishlist = [];
      }
      
      if (isInWishlist) {
        // Remove from wishlist
        const updatedWishlist = wishlist.filter(item => item && item.id !== product.id);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        setIsInWishlist(false);
      } else {
        // Add to wishlist
        const productToSave = {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          condition: product.condition,
        };
        
        const updatedWishlist = [...wishlist, productToSave];
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        setIsInWishlist(true);
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
    }
  };

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

  // Function to open mail client
  const handleMailClick = () => {
    if (!product.owner) {
      alert("Owner's email is not available.");
      return;
    }

    const mailtoLink = `https://mail.google.com/mail/u/0/?fs=1&to=${product.owner}&tf=cm`;

    // Force the browser to open the email client
    window.open(mailtoLink, "_blank");
  };

  // Check if current user is the product owner
  const isCurrentUserOwner = currentUser && product.owner === currentUser.email;

  return (
    <main className="min-h-screen bg-white px-4 md:px-8 lg:px-16 py-6 relative">
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

      <div className="max-w-7xl mx-auto relative">
        {/* Owner Check Mark */}
        {isCurrentUserOwner && (
          <div className="absolute top-0 right-0 z-10 bg-[#cc0000] text-white px-4 py-2 rounded-bl-lg flex items-center gap-2">
            <Check size={20} />
            Your Listing
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
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

          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-start">
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
              
              {/* Wishlist Heart Button */}
              <button 
                onClick={toggleWishlist}
                className="p-3 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart 
                  className={`w-8 h-8 ${isInWishlist ? "fill-[#cc0000] text-[#cc0000]" : "text-neutral-400"}`} 
                />
              </button>
            </div>

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
              <div className="flex items-center gap-3">
                <User size={20} className="text-neutral-400" />
                <span className="font-medium min-w-[100px]">Owner:</span>
                <span>
                  {product.owner ? product.owner.split("@")[0] : "Unknown"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-neutral-400" />
                <span className="font-medium min-w-[100px]">Listed:</span>
                <span>
                  {new Date(product.listed_date).toLocaleDateString()}
                </span>
              </div>
            </div>

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

            <div>
              <h2 className="text-2xl font-semibold text-neutral-800 ">
                Description
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Contact Buttons Row */}
              <div className="flex gap-6">
                {/* Mail Owner Button */}
                <button
                  onClick={handleMailClick}
                  className="flex-1 bg-[#cc0000] text-white py-4 px-8 flex items-center justify-center gap-3 transition-colors duration-200"
                >
                  <Mail className="w-6 h-6" />
                  Send Mail
                </button>

                {/* WhatsApp Button (Shown only if phone number exists) */}
                {product.phone && (
                  <a
                    href={`https://wa.me/+1${product.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border-2 border-[#cc0000] text-[#cc0000] hover:bg-[#cc0000] hover:text-white py-4 px-8 flex items-center justify-center gap-3 transition-colors duration-200"
                  >
                    <MessageCircle className="w-6 h-6" />
                    WhatsApp
                  </a>
                )}
              </div>
              
              {/* Buy Now Button - Only shown if current user is not the owner */}
              {!isCurrentUserOwner && (
                <a
                  href="/payment"
                  className="bg-[#cc0000] text-white text-lg font-medium py-4 px-8 flex items-center justify-center gap-3 hover:bg-[#aa0000] transition-colors duration-200"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Buy Now
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;