import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import React from "react";

const BackButton = () => {
  return (
    <>
      <div className="w-full p-3 flex gap-3 items-center">
        <Button className="" size="icon" variant="ghost">
          <ChevronLeft />
        </Button>
        <h1>Post</h1>
      </div>
      <Separator />
    </>
  );
};

export default BackButton;
