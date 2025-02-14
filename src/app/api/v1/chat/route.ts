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

        return NextResponse.json({ chat, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error))
    }
}