"use client";
import React from "react";
import WhoToFollow from "./WhoToFollow";
import SuggestedPosts from "./SuggestedPosts";
import { useSearchParams } from "next/navigation";

const SearchBody = ({ tweets }) => {
  const searchParam = useSearchParams();
  const query = searchParam.get("q");

  return (
    <>
      {!query && <WhoToFollow />}
          <SuggestedPosts tweets={tweets} />
    </>
  );
};

export default SearchBody;
