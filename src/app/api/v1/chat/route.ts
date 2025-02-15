import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import Chat from "@/models/chat.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const user_id = await verifyUser();
        if (!user_id) return
        const { chat_id } = await request.json();


        const chat = await Chat.findOne({ _id: chat_id }).populate('users', '_id username name profilePic');


        if (!chat) {
            const OtherUser = chat_id
            const chat = await Chat.create({
                users: [user_id, OtherUser]
            }, { returnDocument: "after" })

            return NextResponse.json({ message: "", chat, success: true }, { status: 200 })
        }

        return NextResponse.json({ chat, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error))
    }
}