import { getUserData } from "@/actions/getUserData";
import { NextResponse } from "next/server";

export async function Post(req) {
    try {
        
        const user = await getUserData()
        const {searchParams} = new URL(req.url) 

        const tweetId = searchParams.get('id')
        
        if (!user && !tweetId) {
            return new Response('Unauthorized', { status: 401 })
        }



    } catch (error) {
        console.error(error);
        return new NextResponse('internal server error',{status:500})
    }
}