"use client";

import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    setProgress(10);
    interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => setProgress(0), 500);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <div className="top-0 left-0  z-50">
      {progress > 0 && <Progress className="h-1" value={progress} />}
    </div>
  );
}
