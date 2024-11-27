import prisma from "@/lib/prismaDb";
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const { content, parentTweetId } = data;

    if (!content) {
      return new Response("Content is required", { status: 400 });
    }

    const user = await currentUser();
    if (!user) {
      return new Response("You must be logged in to create a tweet", {
        status: 401,
      });
    }

    const userExists = await prisma.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (!userExists) {
      return new Response("User not found", { status: 404 });
    }

    const newTweet = await prisma.tweet.create({
      data: {
        content: content,
        parentTweetId: parentTweetId || null,
        userId: user.id,
      },
    });

    await prisma.user.update({
      where: { clerkUserId: user.id },
      data: {
        tweetIds: { push: newTweet.id }, 
      },
    });

    return NextResponse.json({ newTweet }, { status: 200 });
  } catch (error) {
    console.error("Error while creating tweet:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
