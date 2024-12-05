import prisma from "@/lib/prismaDb";
import { currentUser } from "@clerk/nextjs/server";

export const getUserData = async () => {
    try {
      
    const user = await currentUser();

    if (!user || !user.id) {
      console.error("No authenticated user found.");
      return null;
    }

    const loggedInUser = await prisma.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
      include: {
        followers: true
      }
    });

    if (!loggedInUser) {
      console.error("User not found in database.");
      return null;
    }

    return loggedInUser;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
