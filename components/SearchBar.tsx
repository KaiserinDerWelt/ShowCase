// This component was created by search for the movies, the user can search the movies manually.
"use client";

import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}
// Working on component development
export default function SearchBar({
  onSearch,
  placeholder = "Search",
  initialValue = "",
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative w-full max-w-2xl">
      {/* Search Icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-zinc-900 text-white placeholder-zinc-500 pl-12 pr-12 py-4 rounded-full border-2 border-zinc-800 focus:border-amber-500 focus:outline-none transition-all duration-300 text-lg shadow-lg hover:shadow-amber-500/10 focus:shadow-amber-500/20"
      />

      {/* Clear Button */}
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
          aria-label="Clear search"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
