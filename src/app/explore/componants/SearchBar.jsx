"use client";
import { Search } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import SearchUser from "./SearchUser";
import SearchContent from "./SearchContent";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ users: [], tweets: [] });
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults({ users: [], tweets: [] });
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(`/api/search?query=${searchQuery}`);
      setResults({ users: data.users, tweets: data.tweets });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults({ users: [], tweets: [] });
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-card relative">
      <div className="flex mx-3 my-3 bg-background py-2 px-3 rounded-full border">
        <Search
          size={24}
          className={`text-gray-400 transition-colors ${
            isFocused ? "text-primary" : ""
          }`}
        />
        <input
          className="w-full bg-transparent px-3 outline-none peer"
          placeholder="Search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            fetchSearchResults(e.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
      </div>
      {isFocused && (
        <div className="absolute top-full left-0 w-full shadow-lg border bg-background rounded-b-lg z-10">
          {loading && (
            <div className="p-2 text-sm text-gray-500">Loading...</div>
          )}
          {!loading && (results.users.length > 0 || results.tweets.length > 0) && (
            <ul>
              {results.users.length > 0 && (
                <>
                  <li className="p-2 text-xs text-gray-500">Users</li>
                  {results.users.map((user, index) => (
                    <li
                      key={`user-${index}`}
                      onClick={() => {
                        setQuery(user.username);
                        setIsFocused(false);
                      }}
                      className="cursor-pointer hover:bg-secondary"
                    >
                      <SearchUser item={user} />
                    </li>
                  ))}
                </>
              )}
              {results.tweets.length > 0 && (
                <>
                  <li className="p-2 text-xs text-gray-500">Tweets</li>
                  {results.tweets.map((tweet, index) => (
                    <li
                      key={`tweet-${index}`}
                      onClick={() => {
                        setQuery(tweet.content);
                        setIsFocused(false);
                      }}
                      className="cursor-pointer hover:bg-secondary"
                    >
                      <SearchContent item={tweet} />
                    </li>
                  ))}
                </>
              )}
            </ul>
          )}
          {!loading &&
            results.users.length === 0 &&
            results.tweets.length === 0 && (
              <div className="p-2 text-sm text-gray-500">No results found</div>
            )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;