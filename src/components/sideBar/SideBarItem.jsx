"use client";
import React from "react";
import { Button } from "../ui/button";
import { BarChart } from "lucide-react";
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
      <Icon size={32} />
      <h1 className={`capitalize max-md:hidden ${data.active ? 'font-semibold' : 'font-light'}`}>{data.label}</h1>
    </Button>
  );
};

export default SideBarItem;
