"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import EmojiPicker, { Theme as EmojiTheme } from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Smile, Image as ImageIcon, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import Progress from "../../../components/ui/Progress";
import AavatarButton from "@/components/ui/avatarButton";

// Fetch posts mutation
const addPost = async (content) => {
  const { data } = await axios.post("/api/post", { content });
  return data;
};

const PostBox = () => {
  const CHARACTER_LIMIT = 200;

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [postText, setPostText] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const { theme: appTheme } = useTheme();
  const queryClient = useQueryClient();

  const emojiTheme = appTheme === "dark" ? EmojiTheme.DARK : EmojiTheme.LIGHT;

  const handleEmojiClick = (emojiObject) => {
    setPostText((prev) => {
      const newText = prev + emojiObject.emoji;
      return newText.length <= CHARACTER_LIMIT ? newText : prev;
    });
  };

  const { mutate: postTweet } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      setPostText("");
      setIsPosting(false);
    },
    onError: (error) => {
      console.log("Error posting tweet:", error);
      setIsPosting(false);
    },
  });

  const handlePost = async () => {
    if (postText.trim().length === 0 || isPosting) return;
    setIsPosting(true);
    postTweet(postText);
  };

  const handleChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= CHARACTER_LIMIT) {
      setPostText(inputText);
    }
  };

  return (
    <div className="h-40 rounded-lg px-6 py-3 flex gap-3">
      <AavatarButton />
      <div className="w-full flex flex-col gap-3 group">
        <textarea
          className="focus:outline-none w-full rounded-lg resize-none bg-transparent"
          rows={4} // Adjust rows for more space if needed
          draggable={false}
          placeholder="What's Cooking?"
          value={postText}
          onChange={handleChange}
          disabled={isPosting}
        />
        <hr />
        <div className="flex justify-between items-center">
          <div className="relative space-x-2">
            <Button size="icon" className="w-8 h-8" variant="outline">
              <ImageIcon />
            </Button>
            <Button
              size="icon"
              className="w-8 h-8"
              variant="outline"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <Smile />
            </Button>
            {showEmojiPicker && (
              <div
                className="absolute top-10 left-0 z-50"
                onMouseLeave={() => setShowEmojiPicker(false)}
              >
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  theme={emojiTheme}
                />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Progress
              size={20}
              strokeWidth={2}
              progress={postText.length}
              limit={CHARACTER_LIMIT}
            />
            {isPosting ? (
              <Button className="rounded-full" disabled>
                <span className="animate-spin">
                  <Loader2 />
                </span>
              </Button>
            ) : (
              <Button
                onClick={handlePost}
                className="rounded-full"
                disabled={isPosting || postText.trim().length === 0}
              >
                {isPosting ? "Posting..." : "Post"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostBox;
