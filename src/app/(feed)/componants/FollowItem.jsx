"use client";
import FollowBtn from "@/components/ui/FollowBtn";
import FormattedDate from "@/components/ui/FormatedTime";
import OtherUserAvatars from "@/components/ui/otherUserAvatars";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useEffect, useState } from "react";

const FollowItem = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [clerkUser, setClerkUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClerkUser = async () => {
      try {
        const response = await axios.get(
          `/api/clerkUser?userId=${user.clerkUserId}`
        );
        setClerkUser(response.data);
        setIsFollowing(response.data.isFollowing);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClerkUser();
  }, [user.clerkUserId]);

  useEffect(() => {
    const handleFollowEvent = (e) => {
      if (e.detail.followId === user?.id) {
        setIsFollowing(e.detail.isFollowing);
      }
    };

    window.addEventListener("follow", handleFollowEvent);

    return () => {
      window.removeEventListener("follow", handleFollowEvent);
    };
  }, [user?.userFromDB?.id]);

  if (loading) {
    return (
      <div className="flex gap-3">
        <Skeleton className={"w-8 h-8 rounded-full"} />
        <div className="space-y-1">
          <Skeleton className={"h-3 w-24"} />
          <Skeleton className={"h-2 w-12"} />
        </div>
        <Skeleton className="h-8 w-16 rounded-full ml-auto" />
      </div>
    );
  }

  if (error || isFollowing) {
    return null;
  }

  return (
    <div className="w-full flex">
      <div className="flex-shrink-0">
        <OtherUserAvatars id={user.clerkUserId} />
      </div>
      <div className="ml-3">
        <h1 className="text-sm">@{clerkUser.user.username}</h1>
        <h1 className="text-secondary-foreground/20 text-xs">
          <FormattedDate timestamp={clerkUser.user.createdAt} />
        </h1>
      </div>
      <div className="w-fit ml-auto">
        <FollowBtn
          followeeUser={clerkUser.userFromDB}
          followStatus={isFollowing}
        />
      </div>
    </div>
  );
};

export default FollowItem;
