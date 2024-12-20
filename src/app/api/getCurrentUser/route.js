import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prismaDb';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "No authenticated user found." }, { status: 401 });
    }

    const loggedInUser = await prisma.user.findUnique({
      where: {
        clerkUserId: user.id, 
      },
      include: {
        followers: true,
        following: true,
      },
    });

    if (!loggedInUser) {
      return NextResponse.json({ error: "User not found in database." }, { status: 404 });
    }

    return NextResponse.json(loggedInUser, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
