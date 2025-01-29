import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import Chat from "@/models/chat.model";
import Message from "@/models/message.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const user_id = await verifyUser();
        if (!user_id) return
        const { Chat_id, message } = await request.json();



        if (!message || !Chat_id) return NextResponse.json({ message: "Somthing went wrong!", error: true }, { status: 500 })

        const CreateNewMessage = await Message.create({
            user: user_id,
            message
        })
        const NewMessage = await Message.findById({ _id: CreateNewMessage._id }).populate("user", "_id username name profilePic")

        const chat = await Chat.findOneAndUpdate({ _id: Chat_id }, {
            $push: {
                messages: CreateNewMessage._id
            }
        }, { returnDocument: "after" })


        return NextResponse.json({ NewMessage, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error))
    }
}