import { getUserData } from "@/actions/getUserData";
import React from "react";
import { getFollow } from "@/actions/getFollow";
import { Separator } from "@/components/ui/separator";
import ProfileFollowItem from "../componants/ProfileFollowItem";

const page = async ({ params }) => {
  const currentUser = await getUserData();
  const param = await params;
  const userData = await getUserData(param.userName);
  const followers = await getFollow({ followerId: userData.id });

  return (
    <div className="w-full space-y-3 mt-3 ">
      <h1 className=" px-6">
        People Who following{" "}
        <span className="text-primary capitalize">@{param.userName}</span>
      </h1>
      <Separator />
      <div className="px-6 space-y-3 w-full">
        {followers.map((follower) => (
          <ProfileFollowItem
            key={follower.id}
            data={follower.followee}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
