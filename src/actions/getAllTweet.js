import prisma from "@/lib/prismaDb";
import { getUserData } from "./getUserData";

export const getAllTweet = async (query) => {
  const currentUser = await getUserData();
  try {
    if (query) {

      if (query.startsWith('from:')) {
        const parts = query.split("from:")[1].trim().split(" ")
        const userName = parts[0]
        const user = await getUserData(userName)

        const results = await prisma.tweet.findMany({
          where: {
            userId: user.clerkUserId,
            content: {
              contains: parts[1],
              mode:'insensitive'
            }
          },
        include: {
          user: true,
          parentTweet: {
            include: {
              user: true,
            },
          },
          replies: true,
        },
        })  
        return results
      }

      const queryTweets = await prisma.tweet.findMany({
        where: {
          content: {
            contains: query,
            mode: "insensitive",
          },
        },
        include: {
          user: true,
          parentTweet: {
            include: {
              user: true,
            },
          },
          replies: true,
        },
      });

      return queryTweets;
    }

    const allTweets = await prisma.tweet.findMany({
      where: {
        userId: {
          not: currentUser.clerkUserId,
        },
      },
      include: {
        user: true,
        parentTweet: {
          include: {
            user: true,
          },
        },
      },
      take: 5,
    });

    return allTweets;
  } catch (error) {
    console.error(error);
    return null;
  }
};
