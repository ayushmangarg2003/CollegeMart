// pages/marketplace.js
"use client";

import { useState } from "react";
import ButtonAccount from "@/components/ButtonAccount";
import config from "@/config";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/icon.png";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import TagsFilter from "@/components/TagsFilter";
import {dummyData} from "@/libs/dummyData"; // Corrected import path

export const dynamic = "force-dynamic";

export default function Marketplace() {
  const [filteredProducts, setFilteredProducts] = useState(dummyData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("ALL");

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterProducts(query, selectedTag);
  };

  const handleFilter = (tag) => {
    setSelectedTag(tag);
    filterProducts(searchQuery, tag);
  };

  const filterProducts = (query, tag) => {
    let filtered = dummyData;

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
      <div className="flex justify-between">
        <header className="bg-base-200 w-full flex justify-between px-8 py-4">
          <Link
            className="flex items-center gap-2 shrink-0 "
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
      </div>

      <div className="w-full flex justify-center">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Center the tags filter */}
      <div className="w-full flex justify-center ">
        <TagsFilter
          tags={["ALL", "Books", "Games", "Electronics", "Home"]}
          selectedTag={selectedTag}
          onFilter={handleFilter}
        />
      </div>

      <div className="flex flex-wrap mt-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
