import { User2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const OtherUserAvatars = ({ user, width = 8, height = 8 }) => {

  if (!user) {
    return
  }

  return (
    <div className={`w-${width} h-${height} bg-primary rounded-full flex-shrink-0 items-center flex justify-center`}>
      {
        user.profilePicture ? <Image unoptimized  alt="" width={300} height={300} src={user.profilePicture} className={`w-${width} h-${height} bg-primary rounded-full flex-shrink-0`}/> : <User2 size={18}/>
      }
    </div>
  )
};

export default OtherUserAvatars;
