"use client"
import SinglePost from "@/app/(feed)/componants/SinglePost";
import React from "react";

const Bookmarks = ({allBookMarks}) => {
  return (
    <div className="py-6 flex flex-col gap-2">
      {allBookMarks.map((bookmark) => (
        <div key={bookmark.id} className="bg-card rounded-xl overflow-hidden">
          <SinglePost post={bookmark.tweet} key={bookmark.id} />
        </div>
      ))}
    </div>
  );
};

export default Bookmarks;
