import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import FollowBtn from "./FollowBtn";
import { Separator } from "./separator";
import { Calendar } from "lucide-react";
import FormattedDate from "./FormatedTime";
import { Skeleton } from "./skeleton";

const OtherUserAvatars = ({ id, width = 8, height = 8 }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followState, setIsFollowing] = useState(null);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      try {
        const response = await axios.get(`/api/clerkUser?userId=${id}`);
        setData(response.data);
        setIsFollowing(response.data.isFollowing);
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

  useEffect(() => {
    const handleFollowEvent = (e) => {
      if (e.detail.followId === data?.userFromDB?.id) {
        setIsFollowing(e.detail.isFollowing);
      }
    };

    window.addEventListener("follow", handleFollowEvent);

    return () => {
      window.removeEventListener("follow", handleFollowEvent);
    };
  }, [data?.userFromDB?.id]);

  if (loading)
    return <Skeleton className={`w-${width} h-${height} rounded-full flex-shrink-0`} />;

  const { user, userFromDB } = data;

  return (
    <HoverCard>
      <HoverCardTrigger className={`w-${width} h-${height}`}>
        <Image
          alt={
            user?.firstName
              ? `${user.firstName}'s Avatar`
              : "Default User Avatar"
          }
          width={128}
          height={128}
          src={`${user?.imageUrl}?w=12&h=12&fit=crop`}
          className={`w-${width} h-${height} rounded-full object-cover flex-shrink-0`}
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
            className={`w-${Math.ceil(width * 1.75)} h-${Math.ceil(height * 1.75)} rounded-full object-cover`}
          />
          <FollowBtn followeeUser={userFromDB} followStatus={followState} user={user} />
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
