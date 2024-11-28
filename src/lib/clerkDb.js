import { createClerkClient } from "@clerk/clerk-sdk-node";

const clerkClient = new createClerkClient({
  apiKey: process.env.CLERK_SECRET_KEY, // Clerk API key
});

export default clerkClient