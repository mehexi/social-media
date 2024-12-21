import prisma from "@/lib/prismaDb";
import { getUserData } from "./getUserData";

export const getAllBookmark = async (query) => {
  try {
    const currentUser = await getUserData();

    if (!currentUser) {
      console.log("user not authenticated");
      return null;
    }

    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: currentUser.id,
        tweet: {
          content: {
            contains: query,
            mode: "insensitive"
          }
        }
      },
      include: {
        tweet: {
          include: {
            user: true,
            parentTweet: {
              include: {
                user: true
              }
            },
            replies: true,
            bookmarks: true,
            pinnedTweet: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(bookmarks)

    // return bookmarks

    const newBookmarks = bookmarks.map((bookmark) => ({
      ...bookmark,
      tweet: {
        ...bookmark.tweet,
        isLiked: bookmark.tweet.likes.includes(currentUser.id),
        isBookmarked: bookmark.tweet.bookmarks.some((b) => b.userId === currentUser.id),
      },
    }))
    
    console.log(newBookmarks)

    return newBookmarks;
  } catch (error) {
    console.log(error);
    return null;
  }
};
