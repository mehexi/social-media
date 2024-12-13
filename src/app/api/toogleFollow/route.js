import { getUserData } from "@/actions/getUserData";
import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const user = await getUserData();
    const { searchParams } = new URL(req.url);
    const followerId = searchParams.get("id");

    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: followerId,
        followeeId: user.id
      }
    });

    //unfollow
    if (existingFollow) {
      await prisma.follow.delete({
        where: {
          id: existingFollow.id
        }
      });

      return NextResponse.json(
        { message: "user Unfollowed", follow: false },
        { status: 200 }
      );
    }

    const newFollow = await prisma.follow.create({
      data: {
        followerId: followerId,
        followeeId: user.id
      }
    });

    prisma.notification.create({
      data: {
        userId: followerId,
        
      }
    })

    return NextResponse.json(
      { message: "user Added Too Follow List", follow: true, data: newFollow },
      { status: 200 }
    );
  } catch (error) {
    -console.error(error);
    return new NextResponse("internal Server Error", { status: 500 });
  }
}
