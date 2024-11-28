import { clerkClient } from "@clerk/clerk-sdk-node";

export async function getOtherUsers(userId) {
  try {
    const user = await clerkClient.users.getUser(userId);
    console.log(user)
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
