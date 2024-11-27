import React from "react";
import PostBox from "./PostBox";
import PostBody from "./PostBody";
import { ThemeColorToggle } from "@/components/darkmode/ThemeColor";

const MediaBody = () => {
  return (
    <section className="flex flex-col max-w-xl h-screen w-full max-sm:w-screen max-sm:max-w-none pt-6">
      <PostBox />
      <PostBody/>
    </section>
  );
};

export default MediaBody;
