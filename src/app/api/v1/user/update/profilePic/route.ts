import cloudinary from "@/lib/cloudinary";
import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const user_id = await verifyUser()
        const { ProfileImage } = await request.json()
        const user = await User.findOne({ _id: user_id }).select("profilePic")
        const public_id = user?.profilePic?.public_id

        // Delete image
        if (public_id) {
            await cloudinary.uploader.destroy(public_id, {
                resource_type: "image",
            });
        }

        // Upload an image
        const uploadResponse = await cloudinary.uploader.upload(ProfileImage, {
            resource_type: "image",
            folder: 'Jiiwal_users_profile',
        });
        if (!user) return NextResponse.json({ message: "user not found!!!", error: true }, { status: 400 })
        if (uploadResponse) {
            user.profilePic = {
                public_id: uploadResponse.public_id,
                file: uploadResponse.secure_url
            }
        }

        await user.save();
        return NextResponse.json({ message: "Profile Picture Updated Successfull", success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json(InternalServerError(error))
    }
}