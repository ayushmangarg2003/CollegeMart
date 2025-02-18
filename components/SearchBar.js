import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 px-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            className="w-full h-12 pl-12 pr-4 border border-neutral bg-white shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent
                     text-lg transition-all duration-200"
          />
        </div>
        <button
          onClick={handleSearch}
          className="h-12 px-8 text-white bg-[#cc0000] hover:bg-[#b30000] 
                   transition-colors duration-200 focus:outline-none focus:ring-2 
                   focus:ring-[#cc0000] focus:ring-offset-2 shadow-sm flex items-center justify-center"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
