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
        <h1 className="capitalize text-secondary-foreground/30">@{userName}</h1>
        <h1 className="capitalize text-xl">{userData.firstName} {userData.lastName}</h1>
        <p>
          {bio}
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
