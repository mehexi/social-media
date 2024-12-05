import { getUserData } from "@/actions/getUserData";
import prisma from "@/lib/prismaDb";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        // Get the current user
        const currentUser = await getUserData();

        if (!currentUser || !currentUser.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Parse userId from request query parameters
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "UserId is required" }, { status: 400 });
        }

        // Fetch user data from Clerk
        const user = await clerkClient.users.getUser(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found in Clerk" }, { status: 404 });
        }

        // Fetch user data from the database
        const userFromDB = await prisma.user.findUnique({
            where: { clerkUserId: userId },
            include: {
                followers: {
                    select: { followeeId: true }, // Minimize data fetched
                },
                following: {
                    select: { followerId: true }, // Minimize data fetched
                },
            },
        });

        if (!userFromDB) {
            return NextResponse.json({ error: "User not found in the database" }, { status: 404 });
        }

        // Check if current user is following the specified user
        const isFollowing = userFromDB.followers.some(
            (follower) => follower.followeeId === currentUser.id
        );

        return NextResponse.json(
            { user, userFromDB, isFollowing },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error fetching user data" },
            { status: 500 }
        );
    }
}
