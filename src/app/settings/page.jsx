import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import SettingsBody from "./componants/SettingsBody";

const page = () => {
  return (
    <Card className="border-none h-screen">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <SettingsBody />
      </CardContent>
    </Card>
  );
};

export default page;
