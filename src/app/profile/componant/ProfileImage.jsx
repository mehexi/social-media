import React from "react";
import OtherUserAvatars from "@/components/ui/otherUserAvatars";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";

const ProfileImage = ({ userData }) => {
    const { clerkUserId } = userData;

  return (
    <div className="w-full mt-6">
      <div className="h-52 bg-secondary w-full"></div>
      <div className="-mt-14  mx-6 flex items-end justify-between">
        <div className=" border-[6px] w-28 h-28 pointer-events-none rounded-full border-background">
        <OtherUserAvatars width={28} height={28} id={clerkUserId} />
      </div>
        <Button className='rounded-full' variant='secondary'><Pen/> Edit Profile</Button>
      </div>
    </div>
  );
};

export default ProfileImage;