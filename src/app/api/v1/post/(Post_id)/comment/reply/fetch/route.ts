import { InternalServerError } from "@/lib/handleError";
import { NextResponse } from "next/server";
import { verifyUser } from "@/lib/verifyuser";
import Reply from "@/models/reply.model";
import { Schema, Document } from "mongoose";

interface ReplyDocument extends Document {
    _id: Schema.Types.ObjectId;
    user: {
        _id: Schema.Types.ObjectId;
        username: string;
        name: string;
        profilePic: string;
    };
    tagUser: {
        _id: Schema.Types.ObjectId;
        username: string;
        name: string;
        profilePic: string;
    };
    reply: string,
    likes: [Schema.Types.ObjectId],
}

export async function POST(request: Request) {
    try {
        const user_id = await verifyUser();
        if (!user_id) return;
        const { replies } = await request.json();

        const RepliesList: ReplyDocument[] = [];
        await Promise.all(replies.map(async (replyId: Schema.Types.ObjectId) => {

            const reply = await Reply.findById({ _id: replyId })
                .populate({
                    path: "user",
                    select: "_id username name profilePic"
                })
                .populate({
                    path: "tagUser",
                    select: "_id username name profilePic"
                });

            if (reply) {
                RepliesList.push(reply as unknown as ReplyDocument);
            }
        }));

        return NextResponse.json({ RepliesList });
    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error));
    }
}
