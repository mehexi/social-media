import AavatarButton from "@/components/ui/avatarButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormattedContent from "@/components/ui/FormatContent";
import OtherUserAvatars from "@/components/ui/otherUserAvatars";
import Progress from "@/components/ui/Progress";
import { Separator } from "@/components/ui/separator";
import ToolTipWrapper from "@/components/ui/ToolTipWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Reply } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const retweetPost = async ({ content, parentTweetId }) => {
  const res = await axios.post(`/api/post/${parentTweetId}`, { content });
  return res.data;
};

const CreateReplay = ({ currentPost, onReplySubmit }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [content, setContent] = useState(""); // Added state for textarea
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: retweetPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      setContent(""); // Clear textarea after successful submission
      setIsDialogOpen(false);
      onReplySubmit?.();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return; // Prevent empty submissions
    mutate({ content, parentTweetId: currentPost.id });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <ToolTipWrapper title={'Reply'}>
      <DialogTrigger asChild>
          <Button className="text-xs w-full" variant="ghost">
            <Reply />
          </Button>
      </DialogTrigger>
        </ToolTipWrapper>
      <DialogContent className='max-w-xl'>
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="flex gap-3 h-fit">
            <div className="flex flex-col items-center gap-1">
              <OtherUserAvatars id={currentPost.userId} />
              <Separator orientation="vertical" />
            </div>
            <div className="">
              <div className="text-md capitalize flex items-center gap-2">
                <h1>{currentPost.user.userName}</h1>
                <p className="text-primary text-xs">
                  @{currentPost.user.userName}
                </p>
              </div>
              <div className="text-md capitalize flex flex-col gap-3 justify-between">
                <h1>{currentPost.content}</h1>
                {currentPost.hasImage && (
                  <div className="flex gap-1">
                    {currentPost.image.map((img, i) => (
                      <Image
                        key={i}
                        src={img}
                        width={1024}
                        height={1024}
                        alt=""
                        className="w-14 h-14 object-cover rounded-md"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <form
              onSubmit={handleSubmit} // Added form submit handler
              className="space-y-3 flex flex-col items-end"
            >
              <div className="flex gap-3 w-full">
                <AavatarButton />
                <textarea
                  className="focus:outline-none w-full rounded-lg resize-none bg-transparent"
                  rows={2}
                  draggable={false}
                  placeholder="What's Cooking?"
                  value={content} // Bind state to textarea
                  onChange={(e) => setContent(e.target.value)} // Update state on change
                  disabled={isLoading}
                />
              </div>
              <div className="flex justify-center items-center gap-3">
                <Progress
                  size={32}
                  strokeWidth={2}
                  limit={200}
                  progress={content.length}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !content.trim()} // Disable button for empty or loading state
                >
                  {isLoading ? "Posting..." : "Reply"}
                </Button>
              </div>
            </form>
            {isError && (
              <p className="text-red-500 mt-2">
                Failed to reply. Please try again.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReplay;
