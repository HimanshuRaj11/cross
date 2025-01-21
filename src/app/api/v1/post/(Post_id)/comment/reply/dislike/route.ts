//  Update or edit Comment


import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import Reply from "@/models/reply.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const user_id = await verifyUser();
        if (!user_id) return
        const { reply_id } = await request.json();
        if (!user_id || !reply_id) return NextResponse.json({ message: "somthing went wrong!" })
        await Reply.findOneAndUpdate({ _id: reply_id, }, { $pull: { likes: user_id } }, { returnDocument: "after" })

        return NextResponse.json({ message: "reply liked success", success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error))
    }
}