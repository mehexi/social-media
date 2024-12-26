"use client"
import React, { useState } from "react";
import { Button } from "./button";
import { useQueryClient } from "@tanstack/react-query";
import { followUser } from "@/actions/postActions";

const FollowBtn = ({ followeeUser, followStatus }) => {
  const queryClient = useQueryClient();
  const [follow,setFollow] = useState(followStatus)

  const handleFollow = async () => {
    try {
      const res = await followUser(followeeUser.id);
      setFollow(!follow)
      queryClient.invalidateQueries(["posts"]);
    } catch (error) {
      console.error("Error handling follow:", error);
    }
  };

  return (
    <Button
      className="h-8 rounded-full"
      variant={follow ? "outline" : "secondary"}
      onClick={handleFollow}
    >
      {follow ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowBtn;
