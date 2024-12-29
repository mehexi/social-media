"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import OtherUserAvatars from "@/components/ui/otherUserAvatars";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import React from "react";

const ReplaySinglePost = ({ id, setAllReplies, parentTweetId }) => {
  const handleReplay = async () => {
    try {
      const content = "try";
      const data = await axios.post(`/api/post/${parentTweetId}`, { content });
      setAllReplies((prevReplies) => [...prevReplies,data.data])
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <div className="w-full flex p-3 gap-2">
        <div className="w-14 h-14 flex-shrink-0 pointer-events-none">
          <OtherUserAvatars id={id} height={14} width={14} />
        </div>
        <div className="w-full flex items-center">
          <input
            className="w-full h-full  bg-background outline-none"
            placeholder="Post Your Replay"
          />
          <Button onClick={handleReplay}>Replay</Button>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default ReplaySinglePost;
