import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const ToolTipWrapper = ({ children, title }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className="w-full">
          {children}
        </TooltipTrigger>
        <TooltipContent className='capitalize'>{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTipWrapper;
