// Update The Post


import { InternalServerError } from "@/lib/handleError";
import { verifyUser } from "@/lib/verifyuser";
import Post from "@/models/post.model";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const user_Id = await verifyUser();
        if (!user_Id) return NextResponse.json({ message: "User Not found" }, { status: 404 })

        const { PostFiles, PostData, Post_id } = await request.json();

        const { caption, location, tags, tagPeople, music } = PostData

        if (!PostFiles && !PostData) return NextResponse.json({ message: "Invalid Post" })


        // const uploadResponse = await Promise.all(PostFiles?.map((file: string) =>
        //     cloudinary.uploader.upload(file, {
        //         resource_type: "auto", // This allows uploading both images and videos
        //         folder: 'Jiiwal_Posts', // Optional: Specify folder name in Cloudinary
        //     })
        // ));


        const UpdatePost = await Post.findOneAndUpdate({ _id: Post_id, user: user_Id }, {
            // files: uploadResponse,
            caption,
            tags,
            music,
            tagPeople,
            location,
        }, { returnDocument: "after" });


        return NextResponse.json({ message: "Post Created Successful", UpdatePost, success: true }, { status: 201 })
    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error))
    }
}