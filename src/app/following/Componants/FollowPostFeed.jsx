"use client";
import { useEffect, useRef } from "react";
import { useFetchPosts } from "@/app/(feed)/componants/PostBody";
import PostSkeleton from "@/app/(feed)/componants/PostSkeleton";
import SinglePost from "@/app/(feed)/componants/SinglePost";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

  if (status === "pending") {
    return <PostSkeleton />;
  }

  if (status === "error") {
    return <div>Something went wrong.</div>;
  }

  if (data.pages[0].length <= 0) {
    return (
      <div className="w-full flex items-center justify-center  flex-col gap-3">
        <div className="flex flex-col gap-1 mt-6 ">
          <h1 className="text-3xl">Welcome to Xwitter!</h1>
          <p className="text-secondary-foreground/50">
            It seems like you&apos;re not following anyone yet.
          </p>
          <Link href={'/explore'}>
          <Button className="w-fit mt-4">
            Discover People to Follow
          </Button>
          </Link>
        </div>
      </div>
    );
  }

  console.log(data);

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
