"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/libs/supabase/client"; // Ensure correct import
import ButtonAccount from "@/components/ButtonAccount";
import config from "@/config";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import logo from "@/app/icon.png";
import SearchBar from "@/components/SearchBar";
import TagsFilter from "@/components/TagsFilter";
import { Loader } from "lucide-react";

export const dynamic = "force-dynamic";

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);

      // **Step 1: Load from cache first**
      const cachedProducts = localStorage.getItem("cachedProducts");
      if (cachedProducts) {
        const parsedProducts = JSON.parse(cachedProducts);
        setProducts(parsedProducts);
        setFilteredProducts(parsedProducts);
        setIsLoading(false);
      }

      // **Step 2: Fetch fresh data from Supabase in the background**
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        console.error("Error fetching products:", error.message);
      } else {
        console.log("Fetched fresh data:", data);
        setProducts(data);
        setFilteredProducts(data);
        localStorage.setItem("cachedProducts", JSON.stringify(data)); // **Update cache**
      }

      setIsLoading(false);
    };

    loadProducts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterProducts(query, selectedTag);
  };

  const handleFilter = (tag) => {
    setSelectedTag(tag);
    filterProducts(searchQuery, tag);
  };

  const filterProducts = (query, tag) => {
    let filtered = products;

    if (query) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (tag && tag !== "ALL") {
      filtered = filtered.filter(
        (product) => product.tags.toLowerCase().includes(tag.toLowerCase()) // ✅ Fix: Substring check
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <main className="min-h-screen pb-24 bg-base-100">
      <header className="bg-base-200 w-full flex justify-between px-8 py-4">
        <Link
          className="flex items-center gap-2 shrink-0"
          href="/"
          title={`${config.appName} homepage`}
        >
          <Image
            src={logo}
            alt={`${config.appName} logo`}
            className="w-8"
            placeholder="blur"
            priority={true}
            width={32}
            height={32}
          />
          <span className="font-extrabold text-lg">{config.appName}</span>
        </Link>
        <ButtonAccount />
      </header>

      {/* Search Bar */}
      <div className="w-full flex justify-center">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Tags Filter */}
      <div className="w-full flex justify-center">
        <TagsFilter
          tags={["ALL", "Books", "Games", "Electronics", "Home"]}
          selectedTag={selectedTag}
          onFilter={handleFilter}
        />
      </div>

      {/* Products */}
      <div className="flex flex-wrap mt-6">
        {isLoading ? (
          <div className="w-full flex justify-center items-center py-16">
            <Loader className="w-8 h-8 text-[#cc0000] animate-spin" />
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            // <ProductCard key={product.id} product={product} />
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="group relative bg-white border hover:border-[#cc0000] shadow-md hover:shadow-xl transition-all duration-300">
                <Link href={`/product/${product.id}`}>
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={product.image || "/placeholder-image.jpg"}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                    {product.originalPrice > product.price && (
                      <div className="absolute top-3 left-3 bg-[#cc0000] text-white px-3 py-1 text-sm font-medium">
                        {Math.round(
                          (1 - product.price / product.originalPrice) * 100
                        )}
                        % OFF
                      </div>
                    )}

                    {product.condition && (
                      <div className="absolute bottom-3 left-3 bg-neutral-800 bg-opacity-70 text-white px-3 py-1 text-sm">
                        {product.condition}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg group-hover:text-[#cc0000] transition-colors duration-200">
                        {product.name}
                      </h3>
                      <ArrowRight className="h-5 w-5 transform translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#cc0000]" />
                    </div>

                    <div className="mt-2 flex justify-between items-center">
                      <div className="flex items-baseline gap-2">
                        <p className="text-lg font-bold text-[#cc0000]">
                          ${product.price?.toLocaleString()}
                        </p>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.originalPrice?.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-full mt-10">No products found.</p>
        )}
      </div>
    </main>
  );
}
