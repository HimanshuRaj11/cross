import connectDB from "@/lib/db";
import User from "@/models/user.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcryptjs from 'bcryptjs';
import { InternalServerError } from "@/lib/handleError";

interface IloginData {
    username: string;
    password: string;
}
interface ITokenData {
    _id?: mongoose.Schema.Types.ObjectId;
}

export async function POST(request: Request) {
    try {
        await connectDB()
        const { LoginData }: { LoginData: IloginData } = await request.json();
        const { username, password } = LoginData;
        const UserSearchQuery = {
            $or: [
                { username: new RegExp(username, 'i') },
                { email: new RegExp(username, 'i') },
                { phone: new RegExp(username, 'i') }
            ]
        }

        const user = await User.findOne(UserSearchQuery).select("_id name password")
        const tokenData: ITokenData = {
            _id: user?._id
        };
        const validPassword = bcryptjs.compareSync(password, user?.password as string)
        if (!validPassword) {
            return NextResponse.json({ message: "Invalid Cridentials!", error: true }, { status: 400 })
        }

        const token: string = jwt.sign(tokenData, process.env.TOKEN_SECRET as string);
        const response = NextResponse.json({ message: `Nice to see You again! ${user?.name} ` }, { status: 200 })
        response.cookies.set("cross_auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 365
        })
        return response
    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error))
    }
}