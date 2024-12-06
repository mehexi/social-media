"use client";
import { useEffect, useRef } from "react";
import { useFetchPosts } from "@/app/(feed)/componants/PostBody";
import PostSkeleton from "@/app/(feed)/componants/PostSkeleton";
import SinglePost from "@/app/(feed)/componants/SinglePost";
import React from "react";

const FollowPostFeed = () => {
  const isFollower = true; // Fetch posts for followers
  const lastPostRef = useRef(null);
  const topRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useFetchPosts(isFollower);

  // Infinite Scroll Logic
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

  // Scroll to top on reply
  const scrollToTop = () => {
    setTimeout(() => {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    }, 200); // Delay ensures DOM updates first
  };

  // Handle loading and error states
  if (status === "loading") {
    return <PostSkeleton />;
  }

  if (status === "error") {
    return <div>Something went wrong.</div>;
  }

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
          {hasNextPage && (
            <div ref={lastPostRef}>
              <PostSkeleton />
            </div>
          )}
        </div>
        {isFetchingNextPage && <PostSkeleton />}
      </div>
    </>
  );
};

export default FollowPostFeed;
