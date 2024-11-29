import prisma from "@/lib/prismaDb";
import { currentUser } from "@clerk/nextjs/server";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
      return new Response("Invalid content type", { status: 400 });
    }

    const formData = await req.formData();
    const content = formData.get("content");
    const images = formData.getAll("images");

    console.log(content,images)
    
    if (!content) {
      return new Response("Content is required", { status: 400 });
    }
    
    const user = await currentUser();
    if (!user) {
      return new Response("You must be logged in to create a tweet", {
        status: 401,
      });
    }
    console.log('user',user)
    
    const userExists = await prisma.user.findUnique({
      where: { clerkUserId: user.id },
    });
    
    if (!userExists) {
      return new Response("User not found", { status: 404 });
    }
    
    // Upload images to Cloudinary
    let imageUrls = [];
    for (const image of images) {
      const fileBuffer = await image.arrayBuffer();
      const base64Image = Buffer.from(fileBuffer).toString("base64");
      
      const uploadResult = await cloudinary.v2.uploader.upload(`data:${image.type};base64,${base64Image}`, {
        folder: "tweets",
      });
      
      imageUrls.push(uploadResult.secure_url);
    }

    console.log('image', imageUrls)
    
    // Create a new tweet in the database
    const newTweet = await prisma.tweet.create({
      data: {
        content: content,
        userId: user.id,
        image: imageUrls || [],
        hasImage: imageUrls.length > 0, 
      },
    });
    
    return new Response(JSON.stringify({ newTweet }), { status: 200 });
  } catch (error) {
    console.error("Error while creating tweet:", error);
    return new Response("Server error", { status: 500 });
  }
}
