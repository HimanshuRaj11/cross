import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { user_id } = await request.json()

        if (!user_id) return
        const followers = await User.findById({ _id: user_id })
            .select("followers")
            .populate({
                path: "followers",
                select: "_id username name profilePic"
            })
        return NextResponse.json({ message: ``, followers, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error))
    }
}