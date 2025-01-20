import { InternalServerError } from "@/lib/handleError";
import { NextResponse } from "next/server";
import { verifyUser } from "@/lib/verifyuser";
import Reply from "@/models/reply.model";

export async function POST(request: Request) {
    try {
        const user_id = await verifyUser();
        if (!user_id) return
        const { replies } = await request.json();

        const RepliesList: any[] = []
        await Promise.all(replies.map(async (replyId: any) => {

            const reply = await Reply.findById({ _id: replyId })
                .populate({
                    path: "user",
                    select: "_id username name profilePic"
                })
                .populate({
                    path: "tagUser",
                    select: "_id username name profilePic"
                })
            // .populate({
            //     path: "likes",
            //     select: "_id username name profilePic"
            // })
            RepliesList.push(reply)
        }))


        return NextResponse.json({ RepliesList })
    } catch (error) {
        return NextResponse.json(InternalServerError(error))
    }
}

