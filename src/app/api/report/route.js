import { getUserData } from "@/actions/getUserData";
import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const currentUser = await getUserData();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {title, issue } = body;

    console.log(issue,title );

    if (!issue) {
      return new Response("No issue provided", { status: 400 });
    }

    const data = await prisma.report.create({
      data: {
        userId: currentUser.id,
        title: title,
        issue: issue,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 500 });
  }
}
