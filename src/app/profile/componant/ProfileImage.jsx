import React from "react";
import OtherUserAvatars from "@/components/ui/otherUserAvatars";
import { Button } from "@/components/ui/button";
import { Pen, Search } from "lucide-react";
import FollowBtn from "@/components/ui/FollowBtn";
import { getUserData } from "@/actions/getUserData";
import SearchButton from "./SearchButton";

const ProfileImage = async ({ userData }) => {
  const currentUser = await getUserData();
  const isCurrentUser = currentUser?.userName === userData?.userName;
  const isFollowing = userData?.followers?.some(
    (follower) => follower.followeeId === currentUser.id
  );
  return (
    <div className="w-full">
      <div className="h-52 bg-secondary w-full"></div>
      <div className="-mt-14 mx-6 flex items-end justify-between">
        <div className="w-28 h-28 pointer-events-none rounded-full flex-shrink-0">
          <OtherUserAvatars width={28} height={28} id={userData.clerkUserId} />
        </div>
        <div className="flex gap-1">
          <SearchButton username={userData.userName}/>
        {isCurrentUser ? (
          <Button className="rounded-full h-8" variant="secondary">
            <Pen /> Edit Profile
          </Button>
        ) : (
          <FollowBtn followeeUser={userData} followStatus={isFollowing} />
        )}
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;