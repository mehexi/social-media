import React, { useState } from "react";
import { Separator } from "../ui/separator";
import AavatarButton from "../ui/avatarButton";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

const EditPost = ({ post, setOpen }) => {
  const [text, setText] = useState(post.content);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.put(`/api/post/?id=${post.id}`, { content: text });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
      setOpen(false);
      toast({
        title: "Post updated successfully",
      })
    },
    onError: (error) => {
      console.error("Error", error);
    },
  });

  return (
    <>
      <Separator />
      <div className="flex gap-4 flex-col">
        <div className="w-full flex items-center gap-1">
          <AavatarButton size={10} />
          <div>
            <h1 className="capitalize">{post.user.userName}</h1>
            <p className="text-sm text-primary">@{post.user.userName}</p>
          </div>
        </div>
        <textarea
          className="focus:outline-none w-full rounded-lg resize-none bg-transparent "
          rows={2}
          onChange={(e) => setText(e.target.value)}
          draggable={false}
          placeholder="What's Cooking?"
          value={text}
        />
        <div className="max-h-80 grid justify-start gap-3 w-full grid-cols-2">
          {post.hasImage &&
            post.image.map((item, i) => (
              <Image
                key={i}
                width={580}
                height={580}
                src={item}
                alt=""
                className="max-h-80 object-scale-down rounded-2xl w-fit grid-cols-1"
              />
            ))}
        </div>
        <Separator />
        <Button className="w-fit" onClick={() => mutation.mutate()}>
          <Pencil /> Edit
        </Button>
      </div>
    </>
  );
};

export default EditPost;
