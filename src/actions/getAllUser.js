import prisma from "@/lib/prismaDb";
import { getUserData } from "./getUserData";

export async function getAllUser() {
  try {
    const currentUser = await getUserData();

    const allUser = await prisma.user.findMany({
      where: {
        id: { not: currentUser.id }
      },
      include: {
        followers: true
      }
    });

    return allUser;
  } catch (error) {
    console.error("Error at get all user:", error);
    return null; 
  }
}