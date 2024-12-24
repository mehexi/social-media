import { getUserData } from "@/actions/getUserData";
import React from "react";
import ProfileBody from "./componant/ProfileBody";

const page = async ({searchParams}) => { 
  const searchParam = await searchParams
  const currentUser = await getUserData()
 
  return (
    <section className="flex flex-col items-center h-screen overflow-x-auto">
      <ProfileBody user={currentUser} searchParam={searchParam} />
    </section>
  );
};

export default page;
