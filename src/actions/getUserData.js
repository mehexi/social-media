import prisma from "@/lib/prismaDb";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/dist/server/api-utils";

export const getUserData = async (userName) => {
    try {
      const user = await currentUser();
      
      if (!user || !user.id) {
        console.error("No authenticated user found.");
        return null;
      }
     
      if (userName) {
        const searchUserData = await prisma.user.findUnique({
          where: {
            userName: userName
          },
          include: {
            followers: true,
            following: true,
            tweets: true,
            pinnedTweetsID: {
              include: {
                tweet: {
                  include: {
                    user: true,
                    replies: true,
                    pinnedTweet: true
                  }
                }
              }
            },
            
          }
        })

        return searchUserData
      }



    const loggedInUser = await prisma.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
      include: {
        followers: true,
        following: true,
        tweets: true,
        pinnedTweetsID: {
          include: {
            tweet: {
              include: {
                user: true,
                replies: true,
                pinnedTweet: true
              }
            }
          }
        },
        
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
