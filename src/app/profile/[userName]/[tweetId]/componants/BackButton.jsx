"use client"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter()
  return (
    <>
      <div className="w-full p-3 flex gap-3 items-center">
        <Button className="" size="icon" variant="ghost" onClick={()=> router.back()}>
          <ChevronLeft />
        </Button>
        <h1>Post</h1>
      </div>
      <Separator />
    </>
  );
};

export default BackButton;
