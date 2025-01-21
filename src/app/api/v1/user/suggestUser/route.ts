import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user_id = await verifyUser()
        if (!user_id) return
        const user = await User.find().select('-password')
        const response = NextResponse.json({ user }, { status: 200 })
        return response;

    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error))
    }
}