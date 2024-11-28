import FormattedContent from "@/components/ui/FormatContent";
import FormattedDate from "@/components/ui/FormatedTime";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { ThumbsUp } from "lucide-react";
import React, { useState, useEffect } from "react";
import CreateReplay from "./CreateReplay";
import OtherUserAvatars from "@/components/ui/otherUserAvatars";

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
      console.log(res)
      const { isLiked: updatedIsLiked, like: updatedLikeCount } = res.data;

      setLike(updatedLikeCount); 
      setIsLiked(updatedIsLiked); 
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="flex mx-6 my-3 px-3 py-3 rounded-2xl border gap-3">
      {/* <OtherUserAvatars id={post.userId} /> */}
      <div className="text-nowrap w-10/12 flex flex-col gap-3">
        <div className="flex items-center font-semibold gap-3">
          <h1 className="cursor-pointer">@{post.user.userName}</h1>
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
        <Separator />
        <div className="flex justify-between">
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
          <CreateReplay currentPost={post} />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
