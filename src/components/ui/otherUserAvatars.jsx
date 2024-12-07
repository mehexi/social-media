import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import FollowBtn from "./FollowBtn";
import { Separator } from "./separator";
import { Calendar } from "lucide-react";
import FormattedDate from "./FormatedTime";
import { Skeleton } from "./skeleton";

const OtherUserAvatars = ({ id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      try {
        const response = await axios.get(`/api/clerkUser?userId=${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getUser();
    }
  }, [id]);

  if (loading)
    return <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />;

  const { user, userFromDB, isFollowing } = data;

  return (
    <HoverCard>
      <HoverCardTrigger className="w-8 h-8">
        <Image
          alt={
            user?.firstName
              ? `${user.firstName}'s Avatar`
              : "Default User Avatar"
          }
          width={1024}
          height={1024}
          src={user?.imageUrl || "/user.png"}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
      </HoverCardTrigger>
      <HoverCardContent className="shadow-sm shadow-primary flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <Image
            alt={
              user?.firstName
                ? `${user.firstName}'s Avatar`
                : "Default User Avatar"
            }
            width={1024}
            height={1024}
            src={user?.imageUrl || "/user.png"}
            className="w-14 h-14 rounded-full object-cover"
          />
          <FollowBtn followeeUser={userFromDB} followStatus={isFollowing} user={user} />
        </div>
        <Separator />
        <div className="flex flex-col ">
          <h1 className="capitalize">
            {user?.firstName
              ? user?.firstName + " " + user?.lastName
              : user?.username}
          </h1>
          <p className="text-primary text-sm">@{user?.username}</p>
          <p className="text-secondary-foreground/20 truncate">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            consectetur fuga vitae similique earum saepe aspernatur dicta in
            voluptate nesciunt, ullam amet, ratione quidem? Voluptates odit
            repudiandae laudantium totam quasi?
          </p>
        </div>
        <Separator />
        <span className="flex items-center text-secondary-foreground/20 text-sm gap-1">
          <Calendar size={12} /> <FormattedDate timestamp={user?.createdAt} />{" "}
        </span>
      </HoverCardContent>
    </HoverCard>
  );
};

export default OtherUserAvatars;
