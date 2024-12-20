"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const SideBarItem = ({ data }) => {
  const router = useRouter();
    const goTo = () => {
        router.push(data.href);
  }
  
  const {icon: Icon} = data
    
  return (
    <Button
      onClick={goTo}
      className="w-fit rounded-full"
      variant="ghost"
    >
      <div className="relative">
        <Icon size={32} fill={data.active ? 'currentColor' : ''} className={data.active ? 'text-primary' : ''} />
        {
          data.new && <div className="w-2 h-2 absolute bg-chart-3 rounded-full top-0 -right-1"></div>
        }
      </div>
      <h1 className={`capitalize max-md:hidden ${data.active ? 'font-semibold' : 'font-medium'}`}>{data.label}</h1>
    </Button>
  );
};

export default SideBarItem;
