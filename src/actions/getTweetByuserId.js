import prisma from "@/lib/prismaDb"

export const getTweetByUserId = async (userId, params)=> {
    try{
        if (!userId) {
            console.log('User id is required')
            return null
        }
        console.log(params)

        const tweets = await prisma.tweet.findMany({take:1})
        console.log(tweets)

    } catch (error) {
        console.log(error)
    }
}