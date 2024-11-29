"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import EmojiPicker, { Theme as EmojiTheme } from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Smile, Image as ImageIcon, Loader2, X } from "lucide-react";
import { useTheme } from "next-themes";
import Progress from "../../../components/ui/Progress";
import AavatarButton from "@/components/ui/avatarButton";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Fetch posts mutation
const addPost = async ({ content, images }) => {
  const formData = new FormData();
  formData.append("content", content);
  images.forEach((image) => formData.append("images", image)); 

  const { data } = await axios.post("/api/post", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

const PostBox = () => {
  const CHARACTER_LIMIT = 200;

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [postText, setPostText] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]); // For storing selected images
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
      setSelectedImages([]);
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
    postTweet({ content: postText, images: selectedImages });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedImages.length > 4) {
      alert("You can upload a maximum of 4 images.");
      e.target.value = "";
      return;
    }
    setSelectedImages((prev) => [...prev, ...files]);
    e.target.value = ""; 
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= CHARACTER_LIMIT) {
      setPostText(inputText);
    }
  };

  return (
    <>
      <div className=" rounded-lg px-6 py-3 flex gap-3">
        <AavatarButton />
        <div className="w-full flex flex-col gap-3 group">
          <textarea
            className="focus:outline-none w-full rounded-lg resize-none bg-transparent"
            rows={2}
            draggable={false}
            placeholder="What's Cooking?"
            value={postText}
            onChange={handleChange}
            disabled={isPosting}
          />
          <hr />
          <div
            className={`grid ${
              selectedImages.length > 1 ? "grid-cols-2" : "grid-cols-1"
            } gap-2 mt-2`}
          >
            {selectedImages.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  width={1024}
                  height={1024}
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  className={` rounded-md col-span-1  object-cover ${
                    selectedImages.length > 1
                      ? "max-h-64"
                      : "max-h-96 overflow-y-auto"
                  }`}
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-3 right-3 rounded-full w-8 h-8 flex items-center justify-center  bg-secondary/50"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="relative space-x-2">
              <Button size="icon" className="w-8 h-8 cursor-pointer p-0" variant="outline">
                <Label htmlFor="imageUpload" className='cursor-pointer w-full h-full flex justify-center items-center'>
                  <ImageIcon />
                </Label>
              </Button>
              <Input
                id="imageUpload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
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
    </>
  );
};

export default PostBox;
