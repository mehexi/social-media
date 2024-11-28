import prisma from "@/lib/prismaDb";

export const getTweetById =async (tweetId) => {
    try {
        if (!tweetId) {
            console.log('tweet Id required')
            return null;
        }

        const tweet = await prisma.tweet.findUnique({
            where: {
                id: tweetId
            },
            include: {
                user: true,
            }
        })

        if (!tweet) {
            console.log('Tweet not found')
            return null;
        }

        return tweet
    } catch {
        return null
    }
}