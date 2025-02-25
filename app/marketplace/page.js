"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/libs/supabase/client";
import ButtonAccount from "@/components/ButtonAccount";
import config from "@/config";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/icon.png";
import ProductCard from "@/components/ProductCard";
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

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.error("Error fetching products:", error.message);
      } else {
        console.log(data);
        setProducts(data);
        setFilteredProducts(data);
      }
      setIsLoading(false);
    };

    fetchProducts();
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
      filtered = filtered.filter((product) => product.tags.includes(tag));
    }

    setFilteredProducts(filtered);
  };

  return (
    <main className="min-h-screen pb-24 bg-base-100">
      <header className="bg-base-200 w-full flex justify-between px-8 py-4">
        <Link className="flex items-center gap-2 shrink-0" href="/" title={`${config.appName} homepage`}>
          <Image src={logo} alt={`${config.appName} logo`} className="w-8" placeholder="blur" priority={true} width={32} height={32} />
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
        <TagsFilter tags={["ALL", "Books", "Games", "Electronics", "Home"]} selectedTag={selectedTag} onFilter={handleFilter} />
      </div>

      {/* Products */}
      <div className="flex flex-wrap mt-6">
        {isLoading ? (
          <div className="w-full flex justify-center items-center py-16">
            <Loader className="w-8 h-8 text-[#cc0000] animate-spin" />
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="text-center w-full mt-10">No products found.</p>
        )}
      </div>
    </main>
  );
}