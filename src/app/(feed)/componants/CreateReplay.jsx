import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OtherUserAvatars from "@/components/ui/otherUserAvatars";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Reply } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const retweetPost = async ({ content, parentTweetId }) => {
  const res = await axios.post(`/api/post/${parentTweetId}`, { content });
  return res.data;
};

const CreateReplay = ({ currentPost,onReplySubmit }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: retweetPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      setIsDialogOpen(false);
      onReplySubmit();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs w-full" variant="ghost">
          <Reply /> 0
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="flex gap-3 h-fit overflow-hidden">
            <div className="flex flex-col items-center gap-1">
              <OtherUserAvatars id={currentPost.userId} />
              <Separator orientation="vertical" />
            </div>
            <div className="w-full">
              <div className="text-md capitalize flex items-center gap-2">
                <h1>{currentPost.user.userName}</h1>
                <p className="text-primary text-xs">
                  @{currentPost.user.userName}
                </p>
              </div>
              <div className="text-md capitalize flex flex-col gap-3 justify-between w-full">
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
            <Button
              onClick={() =>
                mutate({
                  content: "Replying to this post",
                  parentTweetId: currentPost.id,
                })
              }
              disabled={isLoading}
            >
              {isLoading ? "Posting..." : "Reply"}
            </Button>
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
