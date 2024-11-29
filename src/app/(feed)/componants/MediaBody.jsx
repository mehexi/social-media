import React from "react";
import PostBox from "./PostBox";
import PostBody from "./PostBody";
import { Separator } from "@/components/ui/separator";

const MediaBody = () => {
  return (
    <section className="flex flex-col  h-screen w-full max-sm:w-screen max-sm:max-w-none pt-6">
      <PostBox />
      <Separator/>
      <PostBody/>
    </section>
  );
};

export default MediaBody;
