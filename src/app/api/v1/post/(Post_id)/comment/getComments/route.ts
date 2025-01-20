//  get Comment

import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import Comment from "@/models/comment.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const user_id = await verifyUser();
        if (!user_id) return
        const { comment_id } = await request.json();

        let commentsList: any[] = [];
        await Promise.all(comment_id.map(async (comment_id: any) => {
            const comment = await Comment.findById({ _id: comment_id }).populate({
                path: "user",
                select: "_id username name profilePic"
            });
            commentsList.push(comment);
        }));
        return NextResponse.json({ message: "comments fetched", commentsList, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json(InternalServerError(error))
    }
}