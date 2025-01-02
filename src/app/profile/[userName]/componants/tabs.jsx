"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Tabs = () => {
  const pathname = usePathname();
  const router = useRouter();

  const routes = [
    {
      href: "followers",
      label: "following",
      active: pathname.includes("/follower")
    },
    {
      href: "following",
      label: "followers",
      active: pathname.includes("/following")
    }
  ];

  return (
    <>
      <div className="w-full flex">
        {routes.map((route, i) => (
          <Button
            onClick={() => router.replace(route.href)}
            key={i}
            className={`w-full rounded-none ${
              route.active && "border-b-4  border-primary "
            }`}
            variant="ghost"
          >
            {route.label}
          </Button>
        ))}
      </div>
      <Separator />
    </>
  );
};

export default Tabs;
