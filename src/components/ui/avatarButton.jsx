import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const AavatarButton = () => {
  const user = useUser(); 
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/profile")}
      width={1020}
      height={1020}
      className="h-12 w-12 rounded-full cursor-pointer object-cover flex-shrink-0"
      src={user?.user?.imageUrl || "/user.png"}
      alt="User Avatar"
    />
  );
};

export default AavatarButton;
