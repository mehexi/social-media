import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const SuggestedPosts = () => {
  return (
    <Card className="w-full bg-background border-none">
      <CardHeader>
        <CardTitle>Suggested Post</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
      <Separator />
    </Card>
  );
};

export default SuggestedPosts;
