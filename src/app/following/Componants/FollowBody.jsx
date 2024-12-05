import PostBox from "@/app/(feed)/componants/PostBox";
import { Separator } from "@/components/ui/separator";
import React from "react";
import FollowPostFeed from "./FollowPostFeed";

const FollowBody = () => {
  return (
    <section className="flex flex-col h-svh w-full  max-sm:max-w-none pt-6">
      <PostBox />
      <Separator />
      <FollowPostFeed />
    </section>
  );
};

export default FollowBody;
