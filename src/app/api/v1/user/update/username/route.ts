import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const user_id = await verifyUser()
        const { username } = await request.json()
        const CheckUsername = await User.findOne({ username }).select("username")
        if (CheckUsername) {
            return NextResponse.json({ message: "Username already exist..." })
        }

        const user = await User.findOne({ _id: user_id }).select("username")
        if (!user) return NextResponse.json({ message: "user not found!!!", error: true }, { status: 400 })
        if (username) user.username = username;
        await user.save();
        return NextResponse.json({ message: "username Updated Successfull", success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error))
    }
}