"use client";
import useRoute from "@/hooks/useRoute";
import React from "react";
import SideBarItem from "./SideBarItem";
import ToolTipWrapper from "../ui/ToolTipWrapper";

const MobileNav = () => {
  const route = useRoute();
  return (
    <div className="hidden max-sm:flex fixed bottom-0 w-full z-10 bg-card justify-around px-8 py-1">
      {route.map((route, i) => (
        <React.Fragment key={i}>
          <ToolTipWrapper title={route.label}>
            <div>
              <SideBarItem data={route} key={i} />
            </div>
          </ToolTipWrapper>
        </React.Fragment>
      ))}
    </div>
  );
};

export default MobileNav;
