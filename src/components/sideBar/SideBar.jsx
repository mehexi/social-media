"use client";
import useRoute from "@/hooks/useRoute";
import React from "react";
import SideBarItem from "./SideBarItem";
import UserButton from "../ui/UserButton";

const SideBar = () => {
  const routes = useRoute();

  return (
    <div className="max-md:col-span-1 col-span-2 border-r h-screen flex flex-col gap-1 py-6 justify-between max-sm:hidden">
      <div className="flex flex-col gap-2">
        {routes.map((route, i) => (
          <SideBarItem key={i} data={route} />
        ))}
      </div>
      <UserButton />
    </div>
  );
};

export default SideBar;
