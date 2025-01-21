import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import Post from "@/models/post.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user_id = await verifyUser()
        if (!user_id) return
        const Posts = await Post.find()
        const response = NextResponse.json({ Posts }, { status: 200 })
        return response;

    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error))
    }
}