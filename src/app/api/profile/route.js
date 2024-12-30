import { getUserData } from "@/actions/getUserData";
import prisma from "@/lib/prismaDb";
import cloudinary from "cloudinary";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(req) {
  try {
    const currentUser = await getUserData();
    const formData = await req.formData();

    const name = formData.get("name");
    const bio = formData.get("bio");
    const coverPicture = formData.get("coverPicture");
    const profileImage = formData.get("profileImage");

    const [firstName, lastName = ""] = name.split(" ");

    await clerkClient.users.updateUser(currentUser.clerkUserId, {
      firstName,
      lastName,
    });

    let coverImgUrl = null;

    if (coverPicture && coverPicture instanceof File) {
      const coverImageBuffer = Buffer.from(await coverPicture.arrayBuffer());
      const uploadResult = await cloudinary.v2.uploader.upload(
        `data:${coverPicture.type};base64,${coverImageBuffer.toString(
          "base64"
        )}`,
        {
          folder: "user_cover_image",
        }
      );
      coverImgUrl = uploadResult.secure_url;
    }

    const updateData = {
      firstName,
      lastName,
      profilePicture: profileImage,
      bio,
    };

    if (coverImgUrl) {
      updateData.coverPicture = coverImgUrl;
    }

    await prisma.user.update({
      where: { id: currentUser.id },
      data: updateData,
    });

    return NextResponse.json(
      { message: "User data updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user data:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
