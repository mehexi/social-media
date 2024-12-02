import { getUserData } from "@/actions/getUserData";
import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const currentUser = await getUserData();

    console.log(page, limit);

    const tweets = await prisma.tweet.findMany({
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
        user: true,
        replies: true,
        bookmarks: true,
      },
    });

    const newTweets = tweets.map((tweet) => ({
      ...tweet,
      isLiked: tweet.likes.includes(currentUser.id),
      isBookmarked: tweet.bookmarks.some(
        (bookmark) => bookmark.userId === currentUser.id
      ),
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
