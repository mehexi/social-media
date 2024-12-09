import React from "react";
import ExploreSearch from "./componants/ExploreSearch";
import SuggestedFollowers from "./componants/SuggestedFollowers";
import { getAllUser } from "@/actions/getAllUser";
import SuggestedPosts from "./componants/SuggestedPosts";
import { getAllPosts } from "@/actions/getAllPosts";

const page = async () => {
  const allUsers = await getAllUser(800);
  const allPost = await getAllPosts(5)

  console.log(allPost)

  return (
    <section className="flex flex-col items-center h-screen w-full  overflow-x-auto p-0">
      <ExploreSearch />
      <SuggestedFollowers allUsers={allUsers} />
      <SuggestedPosts/>
    </section>
  );
};

export default page;
