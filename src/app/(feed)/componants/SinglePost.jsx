import FormattedContent from "@/components/ui/FormatContent";
import FormattedDate from "@/components/ui/FormatedTime";
import React from "react";

const SinglePost = ({ post }) => {
    
  return (
    <div className="flex mx-6 my-3 px-3 py-3 rounded-2xl border gap-3 h-80">
      <div className="h-8 w-8 bg-primary rounded-full flex-shrink-0"></div>
      <div className="text-nowrap w-10/12">
        <div className="flex items-center font-semibold gap-3">
          <h1 className="cursor-pointer">@{post.user.userName}</h1>
          <span className="text-secondary-foreground/60 text-xs font-thin">

          <FormattedDate timestamp={post.createdAt} showDate={false} showTime={true} />
          </span>
        </div>
        <p className="whitespace-pre-wrap break-words text-sm text-foreground/80">
          <FormattedContent content={post.content}/>
        </p>
      </div>
    </div>
  );
};

export default SinglePost;
