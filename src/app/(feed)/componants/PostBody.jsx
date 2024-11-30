"use client";

import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import SinglePost from "./SinglePost";
import PostSkeleton from "./PostSkeleton";

const fetchPosts = async ({ pageParam = 1 }) => {
  const res = await axios.get(`/api/getPost?page=${pageParam}&limit=2`);
  console.log("Fetched data:", res.data); // Debugging
  return res.data.newTweets;
};

const PostBody = () => {
  const lastPostRef = useRef(null);
  const topRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: fetchPosts,
      getNextPageParam: (lastPage, allPages) => {
        const currentPage = allPages.length;
        return lastPage.length > 0 ? currentPage + 1 : undefined;
      },
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (lastPostRef.current) {
      observer.observe(lastPostRef.current);
    }

    return () => {
      if (lastPostRef.current) {
        observer.unobserve(lastPostRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") {
    return <PostSkeleton />;
  }

  if (status === "error") {
    return <div>Something went wrong.</div>;
  }

  const scrollToTop = () => {
    setTimeout(() => {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }, 200); // Add a delay to ensure DOM has updated
  };

  return (
    <>
      <div>
        <div ref={topRef} id="top"></div>
        <div>
          {data?.pages?.map((page, pageIndex) => (
            <div key={pageIndex}>
              {page.map((tweet, index) => (
                <SinglePost
                  key={index}
                  post={tweet}
                  onReplySubmit={scrollToTop}
                />
              ))}
              <div ref={lastPostRef}></div>
            </div>
          ))}
        </div>
        {isFetchingNextPage && <PostSkeleton />}
      </div>
    </>
  );
};

export default PostBody;
