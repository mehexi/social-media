import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const AavatarButton = ({size='12'}) => {

  const user = useUser(); 
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push(`/profile/${user.user.username}`)}
      width={1020}
      height={1020}
      className={cn(
        "rounded-full cursor-pointer object-cover flex-shrink-0",
        `h-${size} w-${size}`
      )}
      src={user?.user?.imageUrl || `/user.png`}
      alt="User Avatar"
    />
  );
};

export default AavatarButton;
