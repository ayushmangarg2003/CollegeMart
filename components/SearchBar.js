// components/SearchBar.js
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="relative w-full md:w-96 mx-auto mt-6">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleChange}
        className="w-full py-3 px-6 rounded-lg border border-neutral focus:outline-none focus:ring-2 focus:ring-[#cc0000] text-lg"
      />
      <button
        onClick={handleSearch}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white bg-[#cc0000] px-4 py-2 rounded-lg focus:outline-none"
      >
        <span className="material-icons">search</span>
      </button>
    </div>
  );
};

export default SearchBar;
