'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import FollowItem from "./FollowItem";
import { Separator } from "@/components/ui/separator";

const SideFollow = ({ allUser }) => {
  return (
    <Card className='bg-background border-none mt-6'>
      <CardHeader className='p-0'>
      </CardHeader>
      <div className="py-6 flex flex-col gap-6">
      {
        allUser.map(user => <FollowItem key={user.id} user={user}/>)
      }
      </div>
      <Separator/>
    </Card>
  );
};

export default SideFollow;
