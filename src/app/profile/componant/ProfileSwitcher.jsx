"use client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const ProfileSwitcher = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const param = searchParams.get("q");

  const menuItems = [
    {
      label: "Posts",
      query: "",
      active: !param
    },
    {
      label: "Replies",
      query: "replies",
      active: param === "replies"
    },
    {
      label: "Highlights",
      query: "pin",
      active: param === "pin"
    },
    {
      label: "Media",
      query: "media",
      active: param === "media"
    }
  ];

  return (
    <div className="w-full flex justify-around">
      {menuItems.map((item, i) => (
        <Button
          key={i}
              className={`w-full rounded-none px-6  ${item.active && 'border-b-4 border-primary'}`}
          variant="ghost"
          onClick={() => router.push(`?q=${item.query}`)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default ProfileSwitcher;
