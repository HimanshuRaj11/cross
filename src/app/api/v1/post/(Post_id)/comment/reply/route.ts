import { InternalServerError } from "@/lib/handleError";
import { NextResponse } from "next/server";
import { verifyUser } from "@/lib/verifyuser";
import Comment from "@/models/comment.model";
import Reply from "@/models/reply.model";

export async function POST(request: Request) {
    try {
        const user_id = await verifyUser();
        if (!user_id) return;
        const { comment_id, reply, tagUser } = await request.json();
        if (!user_id || !comment_id) return NextResponse.json({ message: "something went wrong!" });

        const NewReply = await Reply.create({ user: user_id, reply, tagUser })
        const comment = await Comment.findOneAndUpdate(
            { _id: comment_id },
            {
                $push: { replies: (NewReply)._id }
            },
            { returnDocument: "after" }
        );
        return NextResponse.json({ NewReply, comment })

    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error));
    }
}