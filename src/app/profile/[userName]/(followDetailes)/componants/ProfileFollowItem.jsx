import FollowBtn from "@/components/ui/FollowBtn";
import OtherUserAvatars from "@/components/ui/otherUserAvatars";
import { useUser } from "@clerk/nextjs";
import React from "react";

const ProfileFollowItem = ({ data,currentUser }) => {
  const isFollowing = currentUser.following.some(follow => follow.followerId === data.id)
  
  return (
    <div className="flex items-center  gap-3">
      <div className="w-8 h-8 rounded-full flex-shrink-0">
        <OtherUserAvatars id={data.clerkUserId} />
      </div>
      <div>
        <h1 className="capitalize">{data.userName}</h1>
        <h1 className="text-secondary-foreground/50 text-sm truncate">
          {data.bio === null ? `No bio added by ${data.userName}` : data.bio}
        </h1>
      </div>
      <div className="ml-auto">
        {currentUser.clerkUserId !== data.clerkUserId ? (
          <FollowBtn followeeUser={data} followStatus={isFollowing}/>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileFollowItem;