import { getUserData } from "@/actions/getUserData";
import React from "react";
import ProfileBody from "./componant/ProfileBody";

const page = async () => { 
  const currentUser = await getUserData()
  
  return (
    <section className="flex flex-col items-center h-screen overflow-x-auto">
      <ProfileBody user={currentUser} />
    </section>
  );
};

export default page;
