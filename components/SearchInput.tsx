"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type SearchInputProps = {
  placeholder?: string;
  items: Array<{ title: string; slug: string }>;
  onNoMatch?: (query: string) => void;
  className?: string;
  contactRedirectPrefix?: string;
};

export default function SearchInput({ placeholder = "Search...", items, onNoMatch, className = "", contactRedirectPrefix = "Other: " }: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setFilteredItems(items);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const exactMatches = items.filter((item) => item.title.toLowerCase() === lowerQuery);
    const partialMatches = items.filter(
      (item) => item.title.toLowerCase().includes(lowerQuery) && !exactMatches.includes(item)
    );

    setFilteredItems([...exactMatches, ...partialMatches]);
  }, [query, items]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const match = items.find((item) => item.title.toLowerCase() === query.toLowerCase());
    if (match) {
      router.push(match.slug);
      setQuery("");
    } else if (onNoMatch) {
      onNoMatch(query);
    } else {
      // Default behavior: redirect to contact page
      router.push(`/contact?projectType=${encodeURIComponent(`${contactRedirectPrefix}${query}`)}`);
      setQuery("");
    }
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 pr-10 text-sm text-[#111827] shadow-inner focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
          aria-label="Search"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#111827] transition"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      {isFocused && query && filteredItems.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-[#E5E7EB] bg-white shadow-xl z-50">
          <div className="p-2 space-y-1">
            {filteredItems.slice(0, 10).map((item) => (
              <a
                key={item.slug}
                href={item.slug}
                className="block rounded-xl px-4 py-2 text-sm text-[#111827] hover:bg-[#F3F4F6] hover:text-[#3B82F6] transition"
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}


