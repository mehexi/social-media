"use client";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

const FollowLinks = ({ userData }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  return (
    <div className="space-x-3">
      <Button
        variant="link"
        className="p-0 text-secondary-foreground hover:no-underline"
        onClick={() => router.push(`${pathname}/followers`)}
      >
        {userData?.following?.length}
        <span className="text-secondary-foreground/50">Following</span>
      </Button>
      <Button
        variant="link"
        className="p-0 text-secondary-foreground hover:no-underline"
        onClick={() => router.push(`${pathname}/following`)}
      >
        {userData?.followers?.length} 
        <span className="text-secondary-foreground/50">Followers</span>
      </Button>
    </div>
  );
};

export default FollowLinks;
