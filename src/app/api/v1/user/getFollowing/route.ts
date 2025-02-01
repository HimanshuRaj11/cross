import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { user_id } = await request.json()

        if (!user_id) return
        const followings = await User.findById({ _id: user_id })
            .select("followings")
            .populate({
                path: "followings",
                select: "_id username name profilePic"
            })
        return NextResponse.json({ message: ``, followings, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error))
    }
}