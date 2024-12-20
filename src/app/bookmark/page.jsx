import { getAllBookmark } from "@/actions/getAllBookmarks";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import BookMarkBody from "./componants/BookMarkBody";

const page = async () => {
  const allBookMarks = await getAllBookmark();
  return (
    <section className="flex flex-col h-screen overflow-x-auto">
      <CardHeader>
        <CardTitle>Bookmarks</CardTitle>
      </CardHeader>
      <CardContent>
        <BookMarkBody />
      </CardContent>
    </section>
  );
};

export default page;
