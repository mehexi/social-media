import React from "react";
import FollowItem from "../following/Componants/FollowItem";

const SideFollow = ({ allUsers }) => {
  return (
    <div className="border h-20">
      {allUsers.map((user) => (
        <FollowItem key={user.id} data={user} />
      ))}
    </div>
  );
};

export default SideFollow;
