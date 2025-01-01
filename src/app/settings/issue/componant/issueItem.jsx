import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const IssueItem = ({ issue }) => {
  return (
    <Card className="">
      <CardHeader className="p-3">
        <CardTitle className="text-lg first-letter:uppercase">
          {issue.status === "resolved" ? (
            <span className="ml-auto text-sm flex items-center capitalize gap-1">
              {" "}
              <div className="w-2 h-2 rounded-full bg-green-500"></div>{" "}
              {issue.status}
            </span>
          ) : (
            <span className="ml-auto text-sm flex items-center capitalize gap-1">
              {" "}
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>{" "}
              {issue.status}
            </span>
          )}
          {issue.title}
        </CardTitle>
        <CardDescription className="text-sm">
          <h1 className=" w-10/12 truncate">{issue.issue}</h1>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default IssueItem;
