import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const PostSkeleton = () => {
  return (
    <>
      <div className="flex mx-6 my-3 px-3 py-3 rounded-2xl border gap-3">
        <Skeleton className="w-8 h-8 rounded-full" />
        <div className="text-nowrap w-10/12">
          <Skeleton className={"w-80 h-20"} />
        </div>
      </div>

      <div className="flex mx-6 my-3 px-3 py-3 rounded-2xl border gap-3">
        <Skeleton className="w-8 h-8 rounded-full" />
        <div className="text-nowrap w-10/12">
          <Skeleton className={"w-80 h-20"} />
        </div>
      </div>
    </>
  );
};

export default PostSkeleton;
