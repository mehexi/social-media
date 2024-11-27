import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { clerkUserId, username } = body;
    console.log(clerkUserId, username);

    if (!clerkUserId || !username) {
      return NextResponse.json(
        { error: "Missing required fields: clerkUserId or userName" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        clerkUserId: clerkUserId,
        userName: username,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
