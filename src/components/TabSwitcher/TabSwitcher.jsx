"use client";
import React from "react";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import Link from "next/link";

const TabSwitcher = () => {
  const pathname = usePathname();

  return (
    <div className="flex w-full">
      <Link
        href="/"
        className={`w-full flex items-center justify-center relative  py-2 hover:bg-secondary/40`}
      >
        For You
        {pathname === "/" && (
          <div className="border-b-4 border-primary w-32 bottom-0 absolute "></div>
        )}
      </Link>
      <Separator orientation />
      <Link
        href="/following"
        className={`w-full flex items-center relative justify-center py-2 hover:bg-secondary/40`}
      >
        Following
        {pathname === "/following" && (
          <div className="border-b-4 border-primary w-32 bottom-0 absolute "></div>
        )}
      </Link>
    </div>
  );
};

export default TabSwitcher;
