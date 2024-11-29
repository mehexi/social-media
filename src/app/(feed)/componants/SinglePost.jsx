import FormattedContent from "@/components/ui/FormatContent";
import FormattedDate from "@/components/ui/FormatedTime";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { ThumbsUp } from "lucide-react";
import React, { useState, useEffect } from "react";
import CreateReplay from "./CreateReplay";
import OtherUserAvatars from "@/components/ui/otherUserAvatars";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

const SinglePost = ({ post }) => {
  const [like, setLike] = useState(post.likeCount);
  const [isLiked, setIsLiked] = useState(post.isLiked);

  useEffect(() => {
    setLike(post.likeCount);
    setIsLiked(post.isLiked);
  }, [post]);

  const handleLike = async (tweetId) => {
    try {
      const res = await axios.post("/api/toggleLike", { tweetId });
      console.log(res);
      const { isLiked: updatedIsLiked, like: updatedLikeCount } = res.data;

      setLike(updatedLikeCount);
      setIsLiked(updatedIsLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  console.log(post);

  return (
    <div className="flex px-3 py-3 border-b  gap-3 hover:bg-accent/20">
      <div className="pl-3">
        <OtherUserAvatars id={post.userId} />
      </div>
      <div className="text-nowrap w-full flex flex-col gap-3">
        <div className="flex items-center font-semibold gap-3">
          <h1 className="group">
            @
            <span className="cursor-pointer group-hover:underline">
              {post.user.userName}
            </span>
          </h1>
          <span className="text-secondary-foreground/60 text-xs font-thin">
            <FormattedDate
              timestamp={post.createdAt}
              showDate={true}
              showTime={false}
            />
          </span>
        </div>
        <p className="whitespace-pre-wrap break-words text-sm text-foreground/80">
          <FormattedContent content={post.content} />
        </p>
        {post.hasImage ? (
          <div
            className={`grid  items-center justify-center ${
              post.image.length > 1 ? "grid-cols-2" : "grid-cols-1"
            } gap-2 mt-2`}
          >
            {post.image.map((image, i) => (
              <Image
                width={1024}
                height={1024}
                key={i}
                alt={post.content}
                src={image}
                className={`col-span-1 max-h-96 ${
                  post.image.length <= 1 ? "object-contain" : "object-cover"
                }`}
              />
            ))}
          </div>
        ) : null}
        <Separator/>
        <div className="flex justify-between pr-3">
          <button
            className={`flex justify-center items-center gap-1 text-xs group ${
              isLiked ? "text-primary" : "text-secondary-foreground"
            }`}
            onClick={() => handleLike(post.id)}
          >
            <span className="group-hover:bg-primary/20 p-2 rounded-full">
              <ThumbsUp size={14} />
            </span>
            <span className="-ml-1 z-10">{like}</span>
          </button>
          <Separator orientation="vertical" />
          <CreateReplay currentPost={post} />
          <Separator orientation="vertical" />
          <CreateReplay currentPost={post} />
          <Separator orientation="vertical" />
          <CreateReplay currentPost={post} />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
