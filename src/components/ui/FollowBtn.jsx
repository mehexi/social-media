import React, { useState } from "react";
import { Button } from "./button";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const FollowBtn = ({ followeeUser, followStatus }) => {
  const [isFollowing, setIsFollowing] = useState(followStatus);
  const currentUser = useUser();
  const queryClient = useQueryClient()

  const handleFollow = async () => {
    setIsFollowing(!isFollowing);
    try {
      const res = await axios.post(`/api/toogleFollow/?id=${followeeUser.id}`);
      console.log(res.data);
      setIsFollowing(res.data.follow);
      queryClient.invalidateQueries(['posts'])
      toast({
        title: res.data.follow ? "User Added To Followed List" : 'UnFollowed'
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error"
      });
    }
  };

  if (followeeUser.clerkUserId === currentUser.user.id) {
    return null;
  }

  return (
    <Button
      className="h-8 rounded-full"
      variant={isFollowing? "outline" : 'secondary'}
      onClick={handleFollow}
    >
      {isFollowing? 'Following' : 'Follow'}
    </Button>
  );
};

export default FollowBtn;
