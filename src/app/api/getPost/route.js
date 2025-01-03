import { getUserData } from "@/actions/getUserData";
import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const isFollower = searchParams.get("isFollower") === "true"; // Check if isFollower is true
    const currentUser = await getUserData();

    let whereCondition = {};

    if (isFollower) {
      const followeeIds = currentUser.following.map(f => f.followerId);
      console.log(followeeIds)
      whereCondition = {
        user: {
          id: {
           in: followeeIds,
         }
        }
      };
    }

    // Fetch tweets with or without condition
    const tweets = await prisma.tweet.findMany({
      where: whereCondition,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
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
                followeeId: true
              }
            }
          }
        },
        replies: true,
        bookmarks: true,
        pinnedTweet: true,
      },
    });

    const newTweets = tweets.map((tweet) => ({
      ...tweet,
      isLiked: tweet.likes.includes(currentUser.id),
      isBookmarked: tweet.bookmarks.some(
        (bookmark) => bookmark.userId === currentUser.id
      ),
      isPinned: tweet.pinnedTweet.some((pin) => pin.userId === currentUser.id),
      isFollowing: tweet.user.followers.some((follower) => follower.followeeId === currentUser.id)
    }));  

    return NextResponse.json({ newTweets }, { status: 200 });
  } catch (error) {
    console.error("Error occurred in GET /api endpoint:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
