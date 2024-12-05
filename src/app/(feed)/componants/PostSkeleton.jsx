import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const PostSkeleton = () => {
  return (
    <>
      <div className="flex flex-col  mx-6 my-3 gap-3">
        <div className="flex gap-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="space-y-2">
            <Skeleton className={"w-32 h-4"} />
            <Skeleton className={"w-24 h-4"} />
          </div>
        </div>

        <div className="text-nowrap w-10/12 h-40"></div>
        <div className="flex justify-between">
          <Skeleton className={"w-24 max-sm:w-12 h-4"} />
          <Skeleton className={"w-24 max-sm:w-12 h-4"} />
          <Skeleton className={"w-24 max-sm:w-12 h-4"} />
          <Skeleton className={"w-24 max-sm:w-12 h-4"} />
        </div>
      </div>
      <Separator/>
    </>
  );
};

export default PostSkeleton;
