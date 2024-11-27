"use client";

import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import SinglePost from "./SinglePost";
import PostSkeleton from "./PostSkeleton";

const fetchPosts = async ({ pageParam = 1 }) => {
  const res = await axios.get(`/api/getPost?page=${pageParam}&limit=10`);
  return res.data.newTweets;
};

const PostBody = () => {
  const lastPostRef = useRef(null); // Reference for the last post element

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      return lastPage.length > 0 ? currentPage + 1 : undefined;
    },
  });

  // IntersectionObserver to detect when the last post is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 } // 100% of the element must be in view to trigger the observer
    );

    if (lastPostRef.current) {
      observer.observe(lastPostRef.current); // Observe the last post element
    }

    return () => {
      if (lastPostRef.current) {
        observer.unobserve(lastPostRef.current); // Clean up the observer
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "loading") {
    return <PostSkeleton />;
  }

  if (status === "error") {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className="">
      <div className="space-y-4">
        {data?.pages?.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.map((tweet, index) => (
              <SinglePost key={index} post={tweet} />
            ))}
            <div ref={lastPostRef}></div>
          </div>
        ))}
      </div>

      {isFetchingNextPage && <PostSkeleton />}
    </div>
  );
};

export default PostBody;
