'use client'
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";
import React from "react";
import SettingsItem from "./SettingsItem";

const SettingsBody = () => {
  const settings = useSettings();
  return (
    <div className="pt-3 space-y-3">
      {settings.map((setting, i) => <SettingsItem key={i} setting={setting} />)}
    </div>
  );
};

export default SettingsBody;
