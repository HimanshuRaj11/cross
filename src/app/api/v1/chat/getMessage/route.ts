import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import Chat from "@/models/chat.model";
import Message from "@/models/message.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const user_id = await verifyUser();
        if (!user_id) return NextResponse.json({ message: "Please Login", error: true }, { status: 500 })
        const { Chat_id } = await request.json();

        const chat = await Chat.findOne({ _id: Chat_id }).populate({
            path: "messages",
            populate: {
                path: "user",
                select: "_id username name profilePic"
            }
        });
        if (!chat) return NextResponse.json({ message: "Somthing went wrong!", error: true }, { status: 500 })


        return NextResponse.json({ chat, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error))
    }
}