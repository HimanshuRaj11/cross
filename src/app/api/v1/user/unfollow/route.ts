import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const user_id = await verifyUser()
        if (!user_id) return
        const { unfollowUserId } = await request.json()

        const userToUnFollow = await User.findOne({ _id: unfollowUserId })
        if (!userToUnFollow) return

        // update followings of current User
        await User.findOneAndUpdate({ _id: user_id }, {
            $pull: { followings: unfollowUserId }
        })

        // Update Followers of next User
        await User.findOneAndUpdate({ _id: unfollowUserId }, {
            $pull: { followers: user_id }
        })

        return NextResponse.json({ message: `Now! You UnFollows ${userToUnFollow.name} `, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json(InternalServerError(error))
    }
}