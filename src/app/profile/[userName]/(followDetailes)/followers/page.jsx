import { getUserData } from "@/actions/getUserData";
import React from "react";
import { getFollow } from "@/actions/getFollow";
import ProfileFollowItem from "../componants/ProfileFollowItem";
import { Separator } from "@/components/ui/separator";

const page = async ({ params }) => {
  const currentUser = await getUserData();
  const param = await params;
  const userData = await getUserData(param.userName);
  const following = await getFollow({ followeeId: userData.id });

  return (
    <div className="w-full space-y-3 mt-3">
      <h1 className=" px-6">
        People Who{" "}
        <span className="text-primary capitalize">@{param.userName}</span> is
        Following
      </h1>
      <Separator />
        <div className="px-6 space-y-3">
          {following.map((follower) => (
            <ProfileFollowItem
              key={follower.id}
              data={follower.follower}
              currentUser={currentUser}
            />
          ))}
        </div>
    </div>
  );
};

export default page;
