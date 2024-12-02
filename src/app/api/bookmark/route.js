import { getUserData } from "@/actions/getUserData";
import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const user = await getUserData();
    const { searchParams } = new URL(req.url);
    const tweetId = searchParams.get("id");

    if (!user || !tweetId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const alreadyBM = await prisma.bookmark.findFirst({
      where: {
        userId: user.id,
        tweetId: tweetId,
      },
    });

    if (alreadyBM) {
      await prisma.bookmark.delete({
        where: {
          id: alreadyBM.id,
        },
      });
      return NextResponse.json(
        { success: true, added: false, message: "Bookmark removed successfully" },
        { status: 200 }
      );
    }

    await prisma.bookmark.create({
      data: {
        tweetId: tweetId,
        userId: user.id,
      },
    });
    return NextResponse.json(
      { success: true, added: true, message: "Added To Bookmarks" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
