import { getAllUser } from "@/actions/getAllUser";
import React from "react";
import FollowItem from "../../../components/ui/FollowItem";

const FollowCOntainer = async () => {
  const allUsers = await getAllUser();
  return (
    <div>
      {allUsers.map((user) => (
        <FollowItem key={user.id} data={user} />
      ))}
    </div>
  );
};

export default FollowCOntainer;
