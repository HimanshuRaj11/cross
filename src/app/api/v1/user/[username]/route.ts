import { InternalServerError } from "@/lib/handleError";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ username: string }> }) {
    try {
        const username = (await params).username;
        const user = await User.findOne({ username })
            .select('-password')
            .populate({ path: 'posts', options: { sort: { createdAt: -1 } } });
        const response = NextResponse.json({ user }, { status: 200 });

        return response;

    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error));
    }
}