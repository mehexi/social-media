import prisma from "@/lib/prismaDb"
import { getUserData } from "./getUserData"

export const getAllPosts = async (size = 5) => {
    const currentUser = await getUserData()

    if (!currentUser)  return null

    try {
        const res = await prisma.tweet.findMany({
            take: size,
            where: {
                userId: {
                    not: currentUser.id
                }
            }
        })

        return res
    } 
    catch (error) {
        console.log(error)
        return null
    }
}