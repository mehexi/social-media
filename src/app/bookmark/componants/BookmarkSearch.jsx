"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BookmarkSearch = () => {
    const router = useRouter()
     
  const handleSearch = (e) => {
      router.push(`?q=${e.target.value}`)
  };
  return (
    <div className="w-full bg-card relative">
      <div className="flex bg-background py-2 px-3 rounded border gap-3">
        <Search />
        <input
          onChange={handleSearch}
          placeholder="Search Your Bookmarks"
          className="w-full outline-none bg-transparent"
        />
      </div>
    </div>
  );
};

export default BookmarkSearch;
