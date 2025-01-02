"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import OtherUserAvatars from "@/components/ui/otherUserAvatars";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

const ReplaySinglePost = ({ user, setAllReplies, parentTweetId }) => {
  const [content, setContent] = useState("");
  const [loading,setLoading] = useState(false)
  const handleReplay = async () => {
    try {
      setLoading(true)
      if (!content.trim()) return;
      const data = await axios.post(`/api/post/${parentTweetId}`, { content });
      setAllReplies((prevReplies) => [...prevReplies, data.data]);

    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <>
      <div className="w-full flex p-3 gap-2">
        <div className="w-14 h-14 flex-shrink-0 pointer-events-none">
          <OtherUserAvatars user={user} height={14} width={14} />
        </div>
        <div className="w-full flex items-center">
          <input
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full  bg-background outline-none"
            placeholder="Post Your Replay"
          />
          <Button onClick={handleReplay} disabled={!content.trim() || loading} > {loading && <Loader2 className="animate-spin"/>} Replay</Button>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default ReplaySinglePost;
