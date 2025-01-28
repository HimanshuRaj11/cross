import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import Chat from "@/models/chat.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user_id = await verifyUser();
        if (!user_id) return

        const chatList = await Chat.find({ users: { $all: [user_id] } }).select("-messages")
            .populate('users', '_id username name profilePic');
        return NextResponse.json({ chatList, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error))
    }
}