import { InternalServerError } from "@/lib/handleError";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { username: string } }) {
    try {
        const { username } = await params;
        const user = await User.findOne({ username })
            .select('-password')
            .populate({ path: 'posts' });
        const response = NextResponse.json({ user }, { status: 200 });

        return response;

    } catch (error) {
        return NextResponse.json(InternalServerError(error));
    }
}