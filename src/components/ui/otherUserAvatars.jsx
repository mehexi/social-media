import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import FollowBtn from "./FollowBtn";
import { Separator } from "./separator";
import { Calendar } from "lucide-react";
import FormattedDate from "./FormatedTime";

const OtherUserAvatars = ({ id }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`/api/clerkUser?userId=${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (id) {
      getUser();
    }
  }, [id]);

  return (
    <HoverCard>
      <HoverCardTrigger className="w-8 h-8">
        <Image
          alt={user?.firstName ? `${user.firstName}'s Avatar` : "Default User Avatar"}
          width={1024}
          height={1024}
          src={user?.imageUrl || "/user.png"}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
      </HoverCardTrigger>
      <HoverCardContent className="shadow-sm shadow-primary flex flex-col gap-3">
        <div className="flex items-start justify-between">
        <Image
          alt={user?.firstName ? `${user.firstName}'s Avatar` : "Default User Avatar"}
          width={1024}
          height={1024}
          src={user?.imageUrl || "/user.png"}
          className="w-14 h-14 rounded-full object-cover"
          />
          <FollowBtn user={id} />
        </div>
        <Separator />
        <div className="flex flex-col ">
          <h1 className="capitalize">{user?.username}</h1>
          <p className="text-primary text-sm">@{user?.username}</p>
          <p className="text-secondary-foreground/20 truncate">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure consectetur fuga vitae similique earum saepe aspernatur dicta in voluptate nesciunt, ullam amet, ratione quidem? Voluptates odit repudiandae laudantium totam quasi?
          </p>
        </div>
        <Separator />
        <span className="flex items-center text-secondary-foreground/20 text-sm gap-1"><Calendar size={12}/> <FormattedDate timestamp={user?.createdAt}/> </span>
      </HoverCardContent>
    </HoverCard>
  );
};

export default OtherUserAvatars;
