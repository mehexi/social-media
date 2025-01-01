"use client"
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const SettingsItem = ({ setting }) => {
  const { icon: Icon, label, des, href, className } = setting;
  const route = useRouter()
  const pathname = usePathname()
  return (
      <Button
      onClick={() => route.push(`${href}`)}
      className={`w-full h-fit justify-start gap-3 ${className}`}
      variant="secondary"
    >
      <Icon />
      <div className="text-wrap text-start">
        <h1>{label}</h1>
        <p className="text-secondary-foreground/50 text-xs">{des}</p>
      </div>
      <div className="ml-auto">
        <ChevronRight />
      </div>
    </Button>
  );
};

export default SettingsItem;
