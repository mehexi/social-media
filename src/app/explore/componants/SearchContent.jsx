import FormattedContent from "@/components/ui/FormatContent";
import { useRouter } from "next/navigation";
import React from "react";

const SearchContent = ({ item }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`?q=${item.content}`)
  }

  return (
    <div className="flex items-center gap-3 px-3 py-3" onClick={handleClick}>
      <FormattedContent content={item.content} />
    </div>
  );
};

export default SearchContent;
