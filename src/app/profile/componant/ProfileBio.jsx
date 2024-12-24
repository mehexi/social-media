import FormattedDate from "@/components/ui/FormatedTime";
import { Calendar } from "lucide-react";
import Link from "next/link";
import React from "react";
import FollowLinks from "./FollowLinks";

const ProfileBio = ({ userData }) => {
  const { userName, bio, createdAt } = userData;
  return (
    <div className="w-full items-start px-6 py-3 space-y-3">
      <div>
        <h1 className="text-2xl capitalize">@{userName}</h1>
        <p>
          {bio} Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Adipisci sapiente illo, voluptate eos dolores, vero, hic ex atque odio
          perspiciatis asperiores facilis voluptatum distinctio. Nihil, rem
          maxime. In, placeat blanditiis.
        </p>
      </div>
      <div>
        <p className="flex items-center gap-1 text-secondary-foreground/50">
          <Calendar size={14} fill="current" /> Joined{" "}
          <FormattedDate timestamp={createdAt} showTime={false} />
        </p>
      </div>
      <FollowLinks userData={userData} />
    </div>
  );
};

export default ProfileBio;
