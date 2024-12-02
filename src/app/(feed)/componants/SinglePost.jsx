import FormattedContent from "@/components/ui/FormatContent";
import FormattedDate from "@/components/ui/FormatedTime";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { ThumbsUp } from "lucide-react";
import React, { useState, useEffect } from "react";
import CreateReplay from "./CreateReplay";
import OtherUserAvatars from "@/components/ui/otherUserAvatars";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SubMenu from "@/components/ui/SubMenu";

const SinglePost = ({ post, onReplySubmit }) => {
  const [like, setLike] = useState(post.likeCount);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    setLike(post.likeCount);
    setIsLiked(post.isLiked);
  }, [post]);

  const handleLike = async (tweetId) => {
    setIsLiking(true);
    setIsLiked(true);
    try {
      const res = await axios.post("/api/toggleLike", { tweetId });
      console.log(res);
      const { isLiked: updatedIsLiked, like: updatedLikeCount } = res.data;

      setLike(updatedLikeCount);
      setIsLiked(updatedIsLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLiking(false);
    }
  };

  console.log(post);

  return (
    <div className="flex px-3 py-3 border-b  gap-3 hover:bg-accent/20">
      <div className=" flex flex-col gap-3  items-center">
        <OtherUserAvatars id={post.userId} />
        <div className=" overflow-hidden h-full">
          {post.parentTweet && <Separator orientation="vertical" />}
        </div>
      </div>
      <div className="text-nowrap w-full flex flex-col">
        <div className="flex items-start font-semibold gap-3">
          <div className="flex gap-2 items-center">
            <h1 className="group">
              @
              <span className="cursor-pointer group-hover:underline">
                {post.user.userName}
              </span>
            </h1>
            {post.updatedAt ? (
              <span className="text-secondary-foreground/60 text-xs font-thin flex gap-1">
                <h1>edited .</h1> 
                <FormattedDate
                  timestamp={post.updatedAt}
                  showDate={true}
                  showTime={true}
                />
              </span>
            ) : (
              <span className="text-secondary-foreground/60 text-xs font-thin">
                <FormattedDate
                  timestamp={post.createdAt}
                  showDate={true}
                  showTime={false}
                />
              </span>
            )}
          </div>
          <div className="ml-auto">
            <SubMenu post={post} />
          </div>
        </div>
        <div className="w-auto">
          <p className="whitespace-pre-wrap break-words text-sm text-foreground/80 w-9/12">
            <FormattedContent content={post.content} />
          </p>
        </div>
        {post.parentTweet ? (
          <div className="flex py-3 gap-3">
            <>
              <div className="">
                <OtherUserAvatars id={post.parentTweet.userId} />
              </div>
              <div className="text-nowrap w-full flex flex-col">
                <div className="flex items-center font-semibold gap-3">
                  <h1 className="group">
                    @
                    <span className="cursor-pointer group-hover:underline">
                      {post.parentTweet.user.userName}
                    </span>
                  </h1>
                  <span className="text-secondary-foreground/60 text-xs font-thin">
                    <FormattedDate
                      timestamp={post.parentTweet.createdAt}
                      showDate={true}
                      showTime={false}
                    />
                  </span>
                </div>
                <p className="whitespace-pre-wrap break-words text-sm text-foreground/80">
                  <FormattedContent content={post.parentTweet.content} />
                </p>

                {post.parentTweet.hasImage ? (
                  <div
                    className={`grid  items-center justify-center ${
                      post.parentTweet.image.length > 1
                        ? "grid-cols-2"
                        : "grid-cols-1"
                    } gap-2 mt-2`}
                  >
                    {post.parentTweet.image.map((image, i) => (
                      <Image
                        width={1024}
                        height={1024}
                        key={i}
                        alt={post.parentTweet.content}
                        src={image}
                        className={`col-span-1 max-h-96 rounded-lg ${
                          post.parentTweet.image.length <= 1
                            ? "object-contain"
                            : "object-cover"
                        }`}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            </>
          </div>
        ) : null}

        {post.hasImage ? (
          <div
            className={`flex items-start justify-start ${
              post.image.length > 1 ? " " : ""
            } gap-2 mt-2`}
          >
            {post.image.map((image, i) => (
              <Image
                width={200}
                height={384}
                key={i}
                alt={post.content}
                src={image}
                className={`col-span-1 w-fit  max-h-96 ${
                  post.image.length <= 1 ? "object-contain" : "object-cover"
                }`}
              />
            ))}
          </div>
        ) : null}
        <Separator className="mt-3" />
        <div className="flex justify-between pr-3 pt-3">
          <Button
            disabled={isLiking}
            variant="ghost"
            className={`text-xs w-full ${
              isLiked ? "text-primary" : "text-secondary-foreground"
            }`}
            onClick={() => handleLike(post.id)}
          >
            <span className="p-2 rounded-full">
              <ThumbsUp size={14} />
            </span>
            <span className="-ml-1 z-10">{like == 0 ? 'Like' : `${like}`}</span>
          </Button>
          <Separator orientation="vertical" />
          <CreateReplay currentPost={post} onReplySubmit={onReplySubmit} />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
