import prisma from "@/lib/prismaDb";
import { getUserData } from "./getUserData";

export async function getAllUser () {
  const currentUser = await getUserData();

  if (!currentUser?.id) {
    return [];
  }
  
  try {
    const allUser  = await prisma.user.findMany({
      where: {
        id: { not: currentUser.id }
      },
      include: {
        followers: true
      },
      take:5
    });

    return allUser ;
  } catch (error) {
    console.error("Error at get all user:", error);
    return null;
  }
}