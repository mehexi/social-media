import BackButton from "@/components/ui/backbutton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import ReportBody from "./componants/ReportBody";
import { getReports } from "@/actions/getReports";

const page = async() => {
    const reports = await getReports()
    console.log(reports)
  return (
    <div className="h-screen">
      <Card className="bg-transparent border-none">
        <CardHeader className="flex-row p-3">
          <BackButton /> <CardTitle>Report issues</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="py-3">
          <h1 className="text-secondary text-xs">
            There are no errors you are just seeing things
          </h1>
        </CardContent>
        <Separator />
        <ReportBody/>
        <Separator />
      </Card>
    </div>
  );
};

export default page;
