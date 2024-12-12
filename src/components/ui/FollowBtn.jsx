import React from "react";
import { Button } from "./button";
import { useQueryClient } from "@tanstack/react-query";
import { followUser } from "@/actions/postActions";

const FollowBtn = ({ followeeUser, followStatus }) => {
  const queryClient = useQueryClient();

  const handleFollow = async () => {
    try {
      const res = await followUser(followeeUser.id);
      queryClient.invalidateQueries(["posts"]);
    } catch (error) {
      console.error("Error handling follow:", error);
    }
  };

  return (
    <Button
      className="h-8 rounded-full"
      variant={followStatus ? "outline" : "secondary"}
      onClick={handleFollow}
    >
      {followStatus ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowBtn;
