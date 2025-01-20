//  get Comment

import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import Comment from "@/models/comment.model";
import { Schema } from "mongoose";
import { NextResponse } from "next/server";

interface IUser {
    _id: Schema.Types.ObjectId,
    username: string,
    name: string,
    profilePic: string
}

interface IComment {
    user: IUser,
    Comment: string,
    likes?: Schema.Types.ObjectId[],
    replies?: Schema.Types.ObjectId[]
}

export async function POST(request: Request) {
    try {
        const user_id = await verifyUser();
        if (!user_id) return
        const { comment_id } = await request.json();

        let commentsList: IComment[] = [];
        await Promise.all(comment_id.map(async (comment_id: Schema.Types.ObjectId) => {
            const comment = await Comment.findById({ _id: comment_id }).populate({
                path: "user",
                select: "_id username name profilePic"
            });
            commentsList.push(comment as unknown as IComment);
        }));
        return NextResponse.json({ message: "comments fetched", commentsList, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error))
    }
}