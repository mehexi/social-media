import { getReports } from "@/actions/getReports";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import AllIssue from "./componant/AllIssue";
import BackButton from "@/components/ui/backbutton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const page = async () => {
  const allIssue = await getReports();
  return (
    <div className="h-screen">
      <Card className="bg-transparent border-none">
        <CardHeader className="flex flex-row  items-center p-3">
          <BackButton />
          <CardTitle>All reports</CardTitle>
          <Link href={"/settings/issue/addReport"} className="ml-auto">
            <Button size="icon"><Plus/></Button>
          </Link>
        </CardHeader>
        <Separator />
        <AllIssue issues={allIssue} />
      </Card>
    </div>
  );
};

export default page;
