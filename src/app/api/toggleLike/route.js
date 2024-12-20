import { getTweetById } from "@/actions/getTweet";
import { getUserData } from "@/actions/getUserData";
import prisma from "@/lib/prismaDb";
import { pusherServer } from "@/lib/pusher";
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
        tweetId: tweet.id
      }
    });

    const hasNotification = await prisma.notification.findFirst({
      where: {
        userId: tweet.user.id,
        type: "Like",
        actorId: user.id
      }
    });

    console.log(hasNotification)

    if (isAlreadyLiked) {
      //removed liked tweet id from user
      await prisma.user.update({
        where: { id: user.id },
        data: {
          likes: user.likes.filter((like) => like !== tweetId)
        }
      });
      //removed liked user id from tweet
      const updatedTweet = await prisma.tweet.update({
        where: { id: tweet.id },
        data: {
          likes: tweet.likes.filter((like) => like !== user.id),
          likeCount: { set: tweet.likeCount > 0 ? tweet.likeCount - 1 : 0 }
        }
      });

      //removed like
      await prisma.like.delete({
        where: { id: isAlreadyLiked.id }
      });

      //remove notification
      if (hasNotification) {
        await prisma.notification.delete({
          where: { id: hasNotification.id }
        });
      }

      return NextResponse.json(
        { like: updatedTweet.likeCount, isLiked: false }, // Combine response
        { status: 200 }
      );
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          likes: [...user.likes, tweetId]
        }
      });
      const updatedTweet = await prisma.tweet.update({
        where: { id: tweet.id },
        data: {
          likes: [...tweet.likes, user.id],
          likeCount: { increment: 1 }
        }
      });

      await prisma.like.create({
        data: {
          userId: user.id,
          tweetId: tweet.id
        }
      });

      const notification = await prisma.notification.create({
        data: {
          userId: tweet.user.id,
          type: "Like",
          actorId: user.id,
          content: `${user.userName} gave your tweet a thumbs up! 👍`
        },
        include: {
          actor: true
        }
      });

      await pusherServer.trigger(
        tweet.user.id,
        "notification:new",
        notification
      );

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
