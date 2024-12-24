"use client";

import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import SinglePost from "./SinglePost";
import PostSkeleton from "./PostSkeleton";

// Exportable fetchPosts function
export const fetchPosts = async ({ pageParam = 1,isFollower=false }) => {
  const res = await axios.get(`/api/getPost`, {
    params: {
      page: pageParam,
      limit: 5,
      isFollower
    },
  });

  return res.data.newTweets || [];
};

// Exportable useFetchPosts hook
export const useFetchPosts = (isFollower) => {
  return useInfiniteQuery({
    queryKey: ["posts", isFollower], 
    queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam, isFollower }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.length > 0 ? nextPage : undefined;
    },
  });
};

const PostBody = () => {
  const lastPostRef = useRef(null);
  const topRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useFetchPosts();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "0px 0px 300px 0px", threshold: 0.1 }
    );

    const current = lastPostRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
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
              {page.map((tweet) => (
                <SinglePost
                  key={tweet.id}
                  post={tweet}
                  onReplySubmit={scrollToTop}
                />
              ))}
            </div>
          ))}
          <div ref={lastPostRef} className="">
            <PostSkeleton />
          </div>
        </div>
        {isFetchingNextPage && <PostSkeleton />}
      </div>
    </>
  );
};

export default PostBody;
