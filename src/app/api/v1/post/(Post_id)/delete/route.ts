// Post Comment 

import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import Post from "@/models/post.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const user_Id = await verifyUser();
        if (!user_Id) return NextResponse.json({ message: "User Not found" }, { status: 404 })
        const { Post_id } = await request.json();
        if (!Post_id) return NextResponse.json({ message: "Post Not found" }, { status: 404 })

        const post = await Post.findOneAndDelete({ _id: Post_id, user: user_Id })

        if (!post) return NextResponse.json({ message: "Something went wrong!", error: true }, { status: 401 })
        await User.findOneAndUpdate({ _id: user_Id }, { $pull: { posts: Post_id } })

        const Response = NextResponse.json({ message: "Post Delete Successful", success: true }, { status: 200 })
        return Response
    } catch (error) {
        return NextResponse.json(InternalServerError(error))
    }
}