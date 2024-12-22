import React from "react";
import OtherUserAvatars from "@/components/ui/otherUserAvatars";

const ProfileImage = ({ userData }) => {
    const { clerkUserId } = userData;

  return (
    <div className="w-full">
      <div className="h-52 bg-secondary w-full"></div>
      <div className="-translate-y-1/2 mx-6 border-[6px] pointer-events-none w-fit rounded-full border-background">
        <OtherUserAvatars width={28} height={28} id={clerkUserId} />
      </div>
    </div>
  );
};

export default ProfileImage;