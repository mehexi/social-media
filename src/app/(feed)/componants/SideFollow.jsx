import React from "react";
import FollowItem from "../../../components/ui/FollowItem";
import { getAllUser } from "@/actions/getAllUser";
import { Separator } from "@/components/ui/separator";

const SideFollow = async () => {
  const allUsers = await getAllUser();
  return (
    <div className="space-y-2 py-6">
      <h1 className="px-3">Suggested Users</h1>
      <div className="flex gap-3 flex-col px-3">
        {allUsers?.map((user) => (
          <FollowItem key={user.id} data={user} />
        ))}
      </div>
      <Separator />
    </div>
  );
};

export default SideFollow;
