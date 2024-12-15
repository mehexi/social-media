import FormattedContent from "@/components/ui/FormatContent";
import React from "react";

const SearchContent = ({ item }) => {
  return <div className="flex items-center gap-3 px-3">
    <FormattedContent content={item.content}/>
  </div>;
};

export default SearchContent;
