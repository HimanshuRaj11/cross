import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const user_id = await verifyUser()
        const { fllowUserId } = await request.json()
        if (!user_id) return

        const userToFollow = await User.findOne({ _id: fllowUserId })
        if (!userToFollow) return

        // update followings of current User
        await User.findOneAndUpdate({ _id: user_id }, {
            $addToSet: { followings: fllowUserId }
        })

        // Update Followers of next User
        await User.findOneAndUpdate({ _id: fllowUserId }, {
            $addToSet: { followers: user_id }
        })

        return NextResponse.json({ message: `Now! You Follows ${userToFollow.name} `, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json(InternalServerError(error))
    }
}