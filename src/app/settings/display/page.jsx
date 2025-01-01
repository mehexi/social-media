import BackButton from "@/components/ui/backbutton";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import DisplayBody from "./componants/DisplayBody";

const page = () => {
  return (
    <div>
      <Card className="border-none bg-transparent">
        <CardHeader className="flex-row p-3">
          <BackButton /> <CardTitle>Display Settings</CardTitle>
        </CardHeader> 
        <Separator />
        <DisplayBody />
      </Card>
    </div>
  );
};

export default page;
