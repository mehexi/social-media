"use client";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

const ReportBody = () => {
  const [issue, setIssue] = useState({
    title: "",
    issue: "",
  });
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    try {
      await axios.post("/api/report", issue);
      toast({
        title: "Report submitted successfully",
      });
      setIssue({ title: "", issue: "" }); 
    } catch (error) {
      toast({
        title: "Error submitting the report",
        description: "Please try again.",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent className="py-3 w-full flex flex-col gap-3">
      <h1>Title</h1>
      <input
        placeholder="Title your Problem"
        className="w-full resize-none rounded p-3 outline-none border"
        value={issue.title}
        onChange={(e) => setIssue({ ...issue, title: e.target.value })}
      />
      <textarea
        className="w-full resize-none rounded p-3 outline-none border"
        rows={5}
        placeholder="Describe your issue"
        value={issue.issue}
        onChange={(e) => setIssue({ ...issue, issue: e.target.value })}
      />
      <Button className="ml-auto" onClick={onClick} disabled={loading}>
        {loading && <Loader2 className="animate-spin mr-2" />}
        Submit
      </Button>
    </CardContent>
  );
};

export default ReportBody;
