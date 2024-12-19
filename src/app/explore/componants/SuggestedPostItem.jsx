import { CarouselItem } from "@/components/ui/carousel";
import OtherUserAvatars from "@/components/ui/otherUserAvatars";
import Image from "next/image";
import React from "react";

const SuggestedPostItem = ({ tweet }) => {

  return (
    <CarouselItem className="basis-72  border px-2 py-3 flex flex-col gap-3 rounded-xl ml-2">
      <div className="flex items-center gap-3">
        <OtherUserAvatars id={tweet.userId}/>
        <h1>{tweet.user.userName}</h1>
      </div>
      <div className="flex justify-between">
        <h1 className="max-w-36 truncate">{tweet.content}</h1>
        {tweet.hasImage &&
          tweet.image.map((image, i) => (
            <Image
              key={i}
              width={80}
              height={80}
              alt=""
              src={image}
              className="rounded"
            />
          ))}
      </div>
    </CarouselItem>
  );
};

export default SuggestedPostItem;
