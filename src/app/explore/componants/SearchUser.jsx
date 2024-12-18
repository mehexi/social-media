import OtherUserAvatars from "@/components/ui/otherUserAvatars";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const SearchUser = ({ item }) => {

  const router = useRouter()

  const handleOnclick = () => {
    router.push(`/@${item.userName}`)
  }
  
  return (
    <div className="flex items-center gap-3 px-3 py-2 group" onClick={handleOnclick}>
      <OtherUserAvatars id={item.clerkUserId} />
      <h1>@{item.userName}</h1>
      <div className="ml-auto hidden group-hover:block">
        <ChevronRight size={14} />
      </div>
    </div>
  );
};

export default SearchUser;
