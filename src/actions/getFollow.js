import prisma from "@/lib/prismaDb";

export const getFollow = async (userId) => {
  try {
    if (!userId) {
      return null;
    }

    const follow = await prisma.follow.findMany({
      where: userId,
      include: {
          follower: true,
          followee: true
      }
    });

    return follow;
  } catch (error) {
    console.error(error);
    return null;
  }
};
