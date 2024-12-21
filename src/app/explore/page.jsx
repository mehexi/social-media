import React from "react";
import SearchBar from "./componants/SearchBar";
import { Separator } from "@/components/ui/separator";
import SearchBody from "./componants/SearchBody";
import { getAllTweet } from "@/actions/getAllTweet";
import { getAllUser } from "@/actions/getAllUser";

const page = async ({searchParams}) => {
  const searchQuery = await searchParams
  const query = searchQuery.q || null
  
  const tweets = await getAllTweet(query)
  const users = await getAllUser()

  console.log(tweets)

  return (
    <section className="flex flex-col items-center h-screen overflow-x-auto">
      <SearchBar />
      <Separator/>
      <SearchBody tweets={tweets} users={users} />
    </section>
  );
};

export default page;
