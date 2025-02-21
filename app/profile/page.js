"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/libs/supabase/client";
import ButtonAccount from "@/components/ButtonAccount";
import ProductCard from "@/components/ProductCard";
import { Loader } from "lucide-react";
import Link from "next/link";

const dummyProducts = [
  {
    id: 2,
    name: "Vintage Book Collection",
    price: "150",
    originalPrice: "200",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&fit=crop",
    tags: ["Books", "Vintage", "Collectibles"],
    description:
      "A curated collection of classic literature in excellent condition.",
    brand: "Various",
    condition: "Very Good",
    location: "Boston, MA",
    listedDate: "2024-02-10",
  },
  {
    id: 3,
    name: "PlayStation 5 Digital Edition",
    price: "399",
    originalPrice: "499",
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=400&fit=crop",
    tags: ["Electronics", "Games", "Console"],
    description: "Like-new PS5 Digital Edition with two controllers.",
    brand: "Sony",
    condition: "Excellent",
    location: "Austin, TX",
    listedDate: "2024-02-17",
  },
];

const dummyWatchlist = [
  {
    id: 2,
    name: "Vintage Book Collection",
    price: "150",
    originalPrice: "200",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&fit=crop",
    tags: ["Books", "Vintage", "Collectibles"],
    description:
      "A curated collection of classic literature in excellent condition.",
    brand: "Various",
    condition: "Very Good",
    location: "Boston, MA",
    listedDate: "2024-02-10",
  },
];

const Profile = () => {
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [userProducts, setUserProducts] = useState(dummyProducts);
  const [watchlist, setWatchlist] = useState(dummyWatchlist);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };

    getUser();
  }, [supabase]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 text-[#cc0000] animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-xl font-semibold text-[#cc0000]">
              ClarkMart
            </a>
            <ButtonAccount />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        {/* User Profile Info */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-[#4b4b4b] mb-3">
            {user?.user_metadata?.name || "Welcome back!"}
          </h1>
          <p className="text-xl text-neutral-600">{user?.email}</p>
        </section>

        {/* User's Listed Products */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-[#4b4b4b]">
              Your Listed Products
            </h2>
            <Link href="/add">
              <button
                className="text-[#cc0000] hover:text-[#b30000] font-medium"
                onClick={() => alert("Add new product")}
              >
                + Add New Product
              </button>
            </Link>
          </div>

          {userProducts.length > 0 ? (
            <div className="flex flex-wrap mt-6">
              {userProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-neutral-50">
              <p className="text-lg text-neutral-600">
                You haven't listed any products yet.
              </p>
            </div>
          )}
        </section>

        {/* Watchlist Section */}
        <section>
          <h2 className="text-2xl font-semibold text-[#4b4b4b] mb-8">
            Your Watchlist
          </h2>
          {watchlist.length > 0 ? (
            <div className="flex flex-wrap mt-6">
              {watchlist.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-neutral-50">
              <p className="text-lg text-neutral-600">
                No items in your watchlist yet.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Profile;
