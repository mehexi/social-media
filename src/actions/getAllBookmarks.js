import prisma from "@/lib/prismaDb";
import { getUserData } from "./getUserData";

export const getAllBookmark = async () => {
  try {
    const currentUser = await getUserData();

    if (!currentUser) {
      console.log("user not authenticated");
      return null;
    }

    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: currentUser.id
      },
      include: {
        tweet: {
          include: {
            user: true,
            parentTweet: true
          }
        }
      }
    });

    return bookmarks;
  } catch (error) {
    console.log(error);
    return null;
  }
};
