import React from "react";
import FollowItem from "../following/Componants/FollowItem";
import { getAllUser } from "@/actions/getAllUser";

const SideFollow = async () => {
  const allUsers = await getAllUser();
  return (
    <div>
      {allUsers?.map((user) => (
        <FollowItem key={user.id} data={user} />
      ))}
    </div>
  );
};

export default SideFollow;
