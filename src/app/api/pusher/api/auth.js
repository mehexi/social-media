import { pusherServer } from "@/lib/pusher";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { socket_id: socketId, channel_name: channel } = await req.json();

  const data = {
    user_id: userId
  };

  try {
    const authRes = pusherServer.authorizeChannel(socketId, channel, data);
    return NextResponse.json(authRes);
  } catch (error) {
    console.log("error on pusher auth", error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
