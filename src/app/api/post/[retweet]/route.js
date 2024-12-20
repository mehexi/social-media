import { getTweetById } from "@/actions/getTweet";
import { getUserData } from "@/actions/getUserData";
import prisma from "@/lib/prismaDb";
import { pusherServer } from "@/lib/pusher";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const user = await currentUser();
    const getCurrentUser =await getUserData()
    const { retweet } = await params;
    const { content } = await req.json();
    const getTweet = await getTweetById(retweet);

    if (!user || !content) {
      return new Response("Error: User or content not found", { status: 400 });
    }

    const newTweet = await prisma.tweet.create({
      data: {
        content,
        userId: user.id,
        parentTweetId: retweet
      },
      include: {
        parentTweet: true
      }
    });

    console.log({
      userId: getTweet.user.id,
      actorId: getCurrentUser.id,
      type: "retweet",
      content: `${getCurrentUser.userName} had This ${newTweet.content} To Say! about your tweet`
    });

    const notification = await prisma.notification.create({
      data: {
        userId: getTweet.user.id,
        actorId: getCurrentUser.id,
        type: "retweet",
        content: `${getCurrentUser.userName} had '${newTweet.content}' To Say! about your tweet`
      },
      include: {
        actor: true
      }
    });

    await pusherServer.trigger(
      getTweet.user.id,
      "notification:new",
      notification
    );

    return NextResponse.json(newTweet, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(error.message, { status: 500 });
  }
}
