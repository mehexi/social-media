import FollowItem from "@/components/ui/FollowItem";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const WhoToFollow = ({ users }) => {
  return (
    <Card className="w-full bg-background border-none">
      <CardHeader>
        <h1 className="text-secondary-foreground/50">Suggested Users</h1>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {users.map((user) => (
          <FollowItem key={user.id} data={user} />
        ))}
      </CardContent>
      <Separator />
    </Card>
  );
};

export default WhoToFollow;
