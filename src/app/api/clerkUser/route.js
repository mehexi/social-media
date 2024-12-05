import prisma from "@/lib/prismaDb";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const {searchParams} = new URL(req.url)
        const userId = searchParams.get('userId')
        const user = await clerkClient.users.getUser(userId)

        const userFromDB = await prisma.user.findUnique({
            where: { clerkUserId: userId },
            include: {
                followers: true
            }
        })
        return NextResponse.json({user,userFromDB},{status:200})
    } catch (error) {
        console.error(error);
        return new NextResponse("error getting ser from clerk",{status:500})
    }
}