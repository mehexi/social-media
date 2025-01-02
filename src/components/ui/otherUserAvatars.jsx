import { User2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { openModal } from "../image/ImageModal";

const OtherUserAvatars = ({ user, width = 8, height = 8 }) => {

  if (!user) {
    return
  }

  return (
    <div className={`w-${width} h-${height} rounded-full flex-shrink-0 items-center flex justify-center`}>
      {
        user.profilePicture ? <Image unoptimized  alt="" width={300} height={300} src={user.profilePicture} className={`w-${width} h-${height} bg-primary rounded-full flex-shrink-0 object-cover`}/> :<div className={`w-${width} h-${height} rounded-full flex-shrink-0 items-center flex justify-center  bg-background border`}><User2 size={14}/></div>
      }
    </div>
  )
};

export default OtherUserAvatars;
