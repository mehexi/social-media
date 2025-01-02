"use client";
import FollowBtn from "@/components/ui/FollowBtn";
import OtherUserAvatars from "@/components/ui/otherUserAvatars";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import React, { useEffect, useState } from "react";

const FollowItem = ({ data }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFOllowing, setIsFollowing] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/api/clerkUser/?userId=${data.clerkUserId}`
        );
        setUserData(res.data);
        setIsFollowing(res.data.isFollowing);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [data]);

  useEffect(() => {
    const handleFollowEvent = (e) => {
      if (e.detail.followId === userData?.userFromDB?.id) {
        setIsFollowing(e.detail.isFollowing);
      }
    };

    window.addEventListener("follow", handleFollowEvent);

    return () => {
      window.removeEventListener("follow", handleFollowEvent);
    };
  }, [userData?.userFromDB?.id]);

 

  if (isLoading) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className={"w-8 h-8 rounded-full"} />
          <div>
            <Skeleton className={"w-20 h-4"} />
            <Skeleton className={"w-10 h-2 mt-2"} />
          </div>
        </div>
        <Skeleton className={"w-10 h-5"} />
      </div>
    );
  }

  if (!userData) return null;
  if (isFOllowing) return null

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0">
          <OtherUserAvatars user={userData.userFromDB} />
        </div>
        <div>
          <h1 className="">{userData.user.username}</h1>
          <h1 className="text-foreground/60 text-sm">
            {userData.user.username}
          </h1>
        </div>
      </div>
      <FollowBtn
        followeeUser={userData.userFromDB}
        followStatus={isFOllowing}
      />
    </div>
  );
};

export default FollowItem;
