import { getUserData } from "@/actions/getUserData";
import { redirect } from "next/navigation";
import React from "react";
import ProfileBody from "../componant/ProfileBody";

const page = async ({ searchParams, params }) => {
  const searchParam = await searchParams;
  const { userName } = await params;
  const userData = await getUserData(userName);
  
  return (
    <section className="flex flex-col items-center h-screen overflow-x-auto">
      <ProfileBody user={userData} searchParam={searchParam} />
    </section>
  );
};

export default page;
