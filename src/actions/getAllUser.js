import prisma from "@/lib/prismaDb";
import { getUserData } from "./getUserData";

export const getAllUser = async (size = 5) => {
    const currentUser = await getUserData();

    if (!currentUser || !currentUser.id) {
        throw new Error("Current user data is invalid or missing.");
    }

    try {
        const res = await prisma.user.findMany({
            take: size,
            where: {
                id: {
                    not: currentUser.id
                },
                followers: {
                    none: {
                        followerId: currentUser.id
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return res;
    } catch (error) {
        console.error(error);
        return null;
    }
};
