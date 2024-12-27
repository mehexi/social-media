import { getUserData } from "@/actions/getUserData";
import React from "react";
import { getFollow } from "@/actions/getFollow";
import { Separator } from "@radix-ui/react-dropdown-menu";
    import ProfileFollowItem from "../componants/ProfileFollowItem";

const page = async ({ params }) => {
  const currentUser = await getUserData()
  const param = await params;
  const userData = await getUserData(param.userName);
  const following = await getFollow({ followeeId: userData.id });
 
  return (
    <section className="flex flex-col items-center h-screen overflow-x-auto">
      <div className="w-full space-y-3 mt-3">
        <h1 className=" px-6 max-sm:px-3">
          People Who{" "}
          <span className="text-primary capitalize">@{param.userName}</span> is
          Following
        </h1>
        <Separator />
        {following.length === 0 ? (
          <h1>noting</h1>
        ) : (
          <div className="px-6 max-sm:px-3 space-y-3">
            {following.map((follower) => (
              <ProfileFollowItem key={follower.id} data={follower.follower} currentUser={currentUser}/>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default page;
