import React from "react";
import BookmarkSearch from "./BookmarkSearch";
import Bookmarks from "./Bookmarks";

const BookMarkBody = ({ allBookMarks }) => {
  console.log(allBookMarks);
  return (
    <div>
      <BookmarkSearch />
      <Bookmarks allBookMarks={allBookMarks} />
    </div>
  );
};

export default BookMarkBody;
