import FollowItem from "@/app/(feed)/componants/FollowItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const SuggestedFollowers = ({ allUsers }) => {

  return (
    <Card className="w-full bg-background border-none">
      <CardHeader>
        <CardTitle>Suggested</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {allUsers.map((user) => (
          <FollowItem key={user.id} user={user} />
        ))}
      </CardContent>
      <Separator/>
    </Card>
  );
};

export default SuggestedFollowers;
