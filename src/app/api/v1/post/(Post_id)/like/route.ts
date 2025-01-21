// like or dislike the Post

import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import Post from "@/models/post.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const user_id = await verifyUser();
        if (!user_id) return
        const { Post_id } = await request.json();
        if (!user_id || !Post_id) return NextResponse.json({ message: "something went wrong!" }, { status: 400 })

        await Post.findOneAndUpdate({ _id: Post_id }, { $addToSet: { likes: user_id } })

        return NextResponse.json({ message: `like`, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error))
    }
}

