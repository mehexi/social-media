import React from "react";
import SearchBar from "./componants/SearchBar";
import { Separator } from "@/components/ui/separator";

const page = async () => {
  return (
    <section className="flex flex-col items-center h-screen overflow-x-auto">
      <SearchBar />
      <Separator/>
    </section>
  );
};

export default page;
