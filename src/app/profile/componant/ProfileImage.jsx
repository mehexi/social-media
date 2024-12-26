import React from "react";
import OtherUserAvatars from "@/components/ui/otherUserAvatars";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import FollowBtn from "@/components/ui/FollowBtn";
import { getUserData } from "@/actions/getUserData"; 

const ProfileImage = async ({ userData }) => {
  const currentUser = await getUserData(); 
  const isCurrentUser = currentUser?.userName === userData?.userName;
  const isFollowing = userData?.followers?.some(follower => follower.followeeId === currentUser.id)
  console.log(isFollowing)

  return (
    <div className="w-full">
      {/* Banner */}
      <div className="h-52 bg-secondary w-full"></div>

      <div className="-mt-14 mx-6 flex items-end justify-between">
        {/* Avatar */}
        <div className="w-28 h-28 pointer-events-none rounded-full flex-shrink-0">
          <OtherUserAvatars width={28} height={28} id={userData.clerkUserId} />
        </div>

        {/* Buttons */}
        {isCurrentUser ? (
          <Button className="rounded-full" variant="secondary">
            <Pen /> Edit Profile
          </Button>
        ) : (
          <FollowBtn followeeUser={userData} followStatus={isFollowing} />
        )}
      </div>
    </div>
  );
};

export default ProfileImage;
