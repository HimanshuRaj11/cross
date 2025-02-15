import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import Chat from "@/models/chat.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const user_id = await verifyUser();
        if (!user_id) return
        const { OtherUser } = await request.json();
        if (!OtherUser) return NextResponse.json({ message: "Somthing went wrong!", error: true }, { status: 500 })

        const chat = await Chat.findOne({ users: { $all: [user_id, OtherUser] } });

        if (!chat) {
            const chat = await Chat.create({
                users: [user_id, OtherUser]
            }, { returnDocument: "after" })
            return NextResponse.json({ message: "", chat, success: true }, { status: 200 })
        }
        return NextResponse.json({ message: "", chat, success: true }, { status: 200 })

    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error))
    }
}