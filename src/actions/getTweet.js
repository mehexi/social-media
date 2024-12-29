import prisma from "@/lib/prismaDb";
import { getUserData } from "./getUserData";

export const getTweetById = async (tweetId) => {
  try {
    const currentUser = await getUserData();

    if (!tweetId) {
      console.log("tweet Id required");
      return null;
    }

    const tweet = await prisma.tweet.findUnique({
      where: {
        id: tweetId,
      },
      include: {
        user: {
          include: {
            followers: true,
            following: true,
          },
        },
        bookmarks: true,
        pinnedTweet: true,
        parentTweet: {
          include: {
            user: true,
          },
        },
        replies: {
          include: {
            user: {
              include: {
                followers: true,
                following: true,
              },
            },
            bookmarks: true,
            pinnedTweet: true,
            replies: true,
          },
        },
      },
    });

    if (!tweet) {
      console.log("Tweet not found");
      return null;
    }

    const newTweets = {
      ...tweet,
      isLiked: tweet.likes.includes(currentUser.id),
      isBookmarked: tweet.bookmarks.some(
        (bookmark) => bookmark.userId === currentUser.id
      ),
      isPinned: tweet.pinnedTweet.some((pin) => pin.userId === currentUser.id),
      isFollowing: tweet.user.followers.some(
        (follower) => follower.followeeId === currentUser.id
      ),
    };

    return newTweets;
  } catch (error) {
    console.log(error);
    return null;
  }
};
