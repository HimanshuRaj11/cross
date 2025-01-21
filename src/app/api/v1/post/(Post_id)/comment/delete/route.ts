// delete Comment

import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import Comment from "@/models/comment.model";
import Post from "@/models/post.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const user_id = await verifyUser();
        if (!user_id) return
        const { comment_id, Post_id } = await request.json();
        if (!user_id || !comment_id || !Post_id) return NextResponse.json({ message: "somthing went wrong!" })
        const comment = await Comment.findOneAndDelete({ _id: comment_id, user: user_id })
        await Post.findOneAndUpdate({ _id: Post_id }, { $pull: { comments: comment_id } })
        return NextResponse.json({ message: "comment deleted success", comment, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error))
    }
}