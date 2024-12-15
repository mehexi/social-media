import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return new NextResponse("No query provided", { status: 404 });
  }

  try {
    const results = await prisma.$transaction([
      prisma.user.findMany({
        where: {
          userName: {
            contains: query,
            mode: "insensitive",
          },
        },
        take: 3,
      }),
      prisma.tweet.findMany({
        where: {
          content: {
            contains: query,
            mode: "insensitive",
          },
        },
        take: 2,
      }),
    ]);

    if (results[0].length === 0 && results[1].length === 0) {
      return NextResponse.json({ message: "No results found" });
    }

    return NextResponse.json({
      users: results[0],
      tweets: results[1],
    });
  } catch (error) {
    console.error("Error fetching search results:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
