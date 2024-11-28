import { getTweetById } from "@/actions/getTweet";
import { getUserData } from "@/actions/getUserData";
import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { tweetId } = await req.json();
    const tweet = await getTweetById(tweetId);
    const user = await getUserData();

    if (!tweet || !user) {
      return new Response("Error: Tweet or user not found", { status: 404 });
    }

    const isAlreadyLiked = await prisma.like.findFirst({
      where: {
        userId: user.id,
        tweetId: tweet.id,
      },
    });

    if (isAlreadyLiked) {
      //removed liked tweet id from user
      await prisma.user.update({
        where: { id: user.id },
        data: {
          likes: user.likes.filter((like) => like !== tweetId),
        },
      });
      //removed liked user id from tweet
      const updatedTweet = await prisma.tweet.update({
        where: { id: tweet.id },
        data: {
          likes: tweet.likes.filter((like) => like !== user.id),
          likeCount: { decrement: 1 },
        },
      });

      //removed like
      await prisma.like.delete({
        where: { id: isAlreadyLiked.id },
      });

      return NextResponse.json(
        { like: updatedTweet.likeCount, isLiked: false }, // Combine response
        { status: 200 }
      );
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          likes: [...user.likes, tweetId],
        },
      });
      const updatedTweet = await prisma.tweet.update({
        where: { id: tweet.id },
        data: {
          likes: [...tweet.likes, user.id],
          likeCount: { increment: 1 },
        },
      });

      await prisma.like.create({
        data: {
          userId: user.id,
          tweetId: tweet.id,
        },
      });

      return NextResponse.json(
        { like: updatedTweet.likeCount, isLiked: true },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
