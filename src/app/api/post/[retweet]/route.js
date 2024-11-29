import prisma from "@/lib/prismaDb";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const user = await currentUser();
    const { retweet } = await params;
    const { content } = await req.json();

      if (!user || !content) {
          return new Response("Error: User or content not found", { status: 400 });
      }

      const newTweet = await prisma.tweet.create({
          data: {
              content,
              userId: user.id,
              parentTweetId: retweet
          },
          include:{
            parentTweet: true
          }
      })

      console.log(newTweet)
      
    return NextResponse.json(newTweet,{status:200});
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
