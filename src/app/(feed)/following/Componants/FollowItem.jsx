"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const FollowItem = ({ data }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(
          `/api/clerkUser/?userId=${data.clerkUserId}`
        );
      };
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, [data]);

  return (
    <div>
      <h1>{data.userName}</h1>
    </div>
  );
};

export default FollowItem;
