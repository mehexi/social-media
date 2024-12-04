import { getUserData } from "@/actions/getUserData";
import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const user = await getUserData();
    const { searchParams } = new URL(req.url);

    const tweetId = searchParams.get("id");

    if (!user && !tweetId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const alreadyPinned = await prisma.pinnedTweets.findFirst({
      where: {
        userId: user.id,
        tweetId: tweetId
      }
    });

    console.log(alreadyPinned)

    if (alreadyPinned) {
      await prisma.pinnedTweets.delete({
        where: {
          id: alreadyPinned.id
        }
      });

      return NextResponse.json(
        {
          message: "Tweet unpinned successfully",
          added: false
        },
        {
          status: 200
        }
      );
    }

    const newPin = await prisma.pinnedTweets.create({
      data: {
        userId: user.id,
        tweetId: tweetId
      }
    });

    return NextResponse.json(
      { newPin, added: true },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("internal server error", { status: 500 });
  }
}
