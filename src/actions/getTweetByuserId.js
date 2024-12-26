import prisma from "@/lib/prismaDb";

export const getTweetByUserId = async (user, params = {}) => {
  try {
    if (!user) {
      console.error("User ID is required");
      return null;
    }

    const tweetInclude = {
      parentTweet: {
        include: {
          user: true,
          parentTweet: {
            include: {
              user: true,
            },
          },
        },
      },
      user: {
        include: {
          followers: {
            select: {
              followeeId: true,
            },
          },
        },
      },
      replies: true,
      bookmarks: true,
      pinnedTweet: true,
    };

    switch (params.q) {
      case "replies":
        return await prisma.tweet.findMany({
          where: {
            userId: user.clerkUserId,
            parentTweetId: {
              not: null,
            },
          },
          include: tweetInclude,
          orderBy: {
            createdAt: "desc",
          },
        });

      case "pin":
          return await prisma.pinnedTweets.findMany({
          where: {
            userId: user.id,
          },
          include: {
            tweet: {
              include: tweetInclude,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

      case "media":
        return await prisma.tweet.findMany({
          where: {
            userId: user.clerkUserId,
            hasImage: true,
          },
          include: tweetInclude,
          orderBy: {
            createdAt: "desc",
          },
        });

      default:
        return await prisma.tweet.findMany({
          where: {
            userId: user.clerkUserId,
          },
          include: tweetInclude,
          orderBy: {
            createdAt: "desc",
          },
        });
    }
  } catch (error) {
    console.error("Error fetching tweets:", error);
    throw new Error("Failed to fetch tweets");
  }
};
