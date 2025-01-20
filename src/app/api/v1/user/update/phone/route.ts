import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const user_id = await verifyUser()
        const { phone } = await request.json()
        const CheckPhone = await User.findOne({ phone }).select("username")
        if (CheckPhone) {
            return NextResponse.json({ message: "Phone Number already exist..." })
        }
        const user = await User.findOne({ _id: user_id }).select("phone")
        if (!user) return NextResponse.json({ message: "user not found!!!", error: true }, { status: 400 })
        if (phone) user.phone = phone;
        await user.save();
        return NextResponse.json({ message: "phone number Updated Successfull", success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json(InternalServerError(error))
    }
}