//  Update or edit Comment


import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import Comment from "@/models/comment.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const user_id = await verifyUser();
        if (!user_id) return
        const { comment_id } = await request.json();
        if (!user_id || !comment_id) return NextResponse.json({ message: "somthing went wrong!" })
        await Comment.findOneAndUpdate({ _id: comment_id }, { $pull: { likes: user_id } }, { returnDocument: "after" })

        return NextResponse.json({ message: "comment liked success", success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error))
    }
}