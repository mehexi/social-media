"use client";
import SinglePost from "@/app/(feed)/componants/SinglePost";
import { Pin, Search } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProfileDatas = ({ searchParam, tweetData }) => {
  if (tweetData.length < 1) {
    return <div className="text-center flex flex-col items-center mt-12">
      <Search size={64} className="text-primary"/>
      <h1 className="text-secondary-foreground/50">Nothing to show</h1>
    </div>;
  }

  if (searchParam.q === "media") {
    return (
      <div className="grid grid-cols-3 gap-1 p-1  h-screen">
        {tweetData.map((tweet) =>
          tweet.image.map((img, index) => (
            <Image
              className="aspect-square object-cover"
              key={index}
              src={img}
              alt={`Image for tweet ${tweet.id}`}
              width={500}
              height={300}
            />
          ))
        )}
      </div>
    );
  }

  console.log(searchParam.q === "pin");

  return (
    <div className="w-full mb-20  p-1">
      {searchParam.q === "pin"
        ? tweetData.map((tweet) => (
            <div key={tweet.id} className="h-fit">
              <SinglePost post={tweet.tweet} />
            </div>
          ))
        : tweetData.map((tweet) => (
            <div key={tweet.id} className="">
              <SinglePost post={tweet} />
            </div>
          ))}
    </div>
  );
};

export default ProfileDatas;
