import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";
import React from "react";

const SettingsBody = () => {
  const settings = useSettings();
  return (
    <div className="pt-3">
      {settings.map((setting, i) => (
          <Button key={i} className="w-full" variant="secondary">
              
        </Button>
      ))}
    </div>
  );
};

export default SettingsBody;
