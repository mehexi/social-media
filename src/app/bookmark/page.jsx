import { getAllBookmark } from "@/actions/getAllBookmarks";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import BookMarkBody from "./componants/BookMarkBody";

const page = async ({ searchParams }) => {
  const searchParam = await searchParams;
  const query = searchParam.q;
  const allBookMarks = await getAllBookmark(query);

  return (
    <section className="flex flex-col h-screen overflow-x-auto">
      <CardHeader>
        <CardTitle>Bookmarks</CardTitle>
      </CardHeader>
      <CardContent className='px-3'>
        <BookMarkBody allBookMarks={allBookMarks} />
      </CardContent>
    </section>
  );
};

export default page;
