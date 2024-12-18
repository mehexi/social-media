import prisma from "@/lib/prismaDb";
import { getUserData } from "./getUserData";

export const getAllTweet = async (query) => {
  const currentUser =await getUserData()
  try {
    if (query) {
      const queryTweets = await prisma.tweet.findMany({
        where: {
          content: {
            contains: query,
            mode: "insensitive"
          }
        },
        include: {
          user: true,
          parentTweet: {
            include: {
              user: true
            }
          }
        }
      });

      return queryTweets;
    }

    const allTweets = await prisma.tweet.findMany({
      where: {
        userId: {
          not: currentUser.clerkUserId
        }
      },
      include: {
        user: true,
        parentTweet: {
          include: {
            user: true
          }
        }
      },
      take: 5
    });

    return allTweets;
  } catch (error) {
    console.error(error);
    return null;
  }
};
