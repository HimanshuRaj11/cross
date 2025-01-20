// create comment for the Post

import { InternalServerError } from "@/lib/handleError";
import { NextResponse } from "next/server";
import Comment from "@/models/comment.model";
import Post from "@/models/post.model";
import { verifyUser } from "@/lib/verifyuser";
export async function POST(request: Request) {
    try {
        const user_id = await verifyUser()
        if (!user_id) return
        const { Post_id, Comments } = await request.json()
        if (!Post_id || !Comments || !user_id) return NextResponse.json({ message: "Somthing went wrong!" })

        const comment = await Comment.create({
            user: user_id,
            Comment: Comments,
        })

        const post = await Post.findOneAndUpdate({ _id: Post_id }, { $push: { comments: comment._id } }, { returnDocument: "after" })
        return NextResponse.json({ message: "Comment Done", post, success: true }, { status: 201 })
    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error))
    }
}