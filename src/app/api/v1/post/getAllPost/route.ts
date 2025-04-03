import { InternalServerError } from "@/lib/handleError";
import Post from "@/models/post.model";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

export async function GET() {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "_id username name profilePic"
            })
        return NextResponse.json({ message: "Post Fetched", posts })
    } catch (error) {
        console.log(error);
        return NextResponse.json(InternalServerError(error as Error))

    }
}