import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const user_id = await verifyUser()
        const { bio } = await request.json()
        const user = await User.findOne({ _id: user_id }).select("bio")

        if (!user) return NextResponse.json({ message: "user not found!", error: true }, { status: 400 })
        if (bio) user.bio = bio;
        await user.save();
        return NextResponse.json({ message: "Bio Updated Successfull", success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error))
    }
}