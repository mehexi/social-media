import prisma from "@/lib/prismaDb";

export const getAllTweet = async (query) => {
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
      include: {
        user: true,
        parentTweet: {
          include: {
            user: true
          }
        }
      }
    });

    return allTweets;
  } catch (error) {
    console.error(error);
    return null;
  }
};
