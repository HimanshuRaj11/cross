import { InternalServerError } from "@/lib/handleError";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { query } = await request.json();

        const user = await User.find({
            $or: [
                { username: { $regex: query, $options: "i" } },
                { name: { $regex: query, $options: "i" } }
            ]
        })
            .select('_id username name profilePic ')
            .limit(10);

        const response = NextResponse.json({ user, success: true }, { status: 200 });
        return response;
    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error));
    }
}