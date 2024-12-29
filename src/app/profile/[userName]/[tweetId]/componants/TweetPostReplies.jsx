"use client";
import SinglePost from "@/app/(feed)/componants/SinglePost";
import React, { useState } from "react";
import ReplaySinglePost from "./ReplaySinglePost";

const TweetPostReplies = ({ tweets, currentUser }) => {
  const [allReplies, setAllReplies] = useState(tweets.replies);

  return (
    <>
      <ReplaySinglePost
        id={currentUser.clerkUserId}
        setAllReplies={setAllReplies}
        parentTweetId={tweets.id}
      />
      {allReplies.length > 0 &&
        allReplies.map((replay) => (
          <SinglePost key={replay.id} post={replay} />
        ))}
    </>
  );
};

export default TweetPostReplies;
