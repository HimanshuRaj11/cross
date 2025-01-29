import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server";
import User, { IUser } from "@/models/user.model";
import mongoose from 'mongoose';
import { InternalServerError } from '@/lib/handleError';

interface RegisterData {
    username: string;
    email: string;
    name: string;
    password: string;
}

interface TokenData {
    _id: mongoose.Schema.Types.ObjectId;
}

export async function POST(request: Request) {
    try {
        const { registerData }: { registerData: RegisterData } = await request.json();
        const { username, email, name, password } = registerData;

        // Check if user already exists
        const EmailCheck: IUser | null = await User.findOne({ email });
        const usernameCheck: IUser | null = await User.findOne({ username });
        if (EmailCheck) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }
        if (usernameCheck) {
            return NextResponse.json({ error: "Username already exists" }, { status: 400 });
        }

        // Hash Password
        const saltRounds = 10;
        const hashPassword: string = bcryptjs.hashSync(password, saltRounds);

        // create User
        const newUser: IUser = await User.create({
            username,
            email,
            name,
            password: hashPassword
        });

        const tokenData: TokenData = {
            _id: newUser._id
        };

        // Create token
        const token: string = jwt.sign(tokenData, process.env.TOKEN_SECRET as string);

        const response = NextResponse.json({ message: `Hii! ${name}, Welcome to CROSS` });
        response.cookies.set("cross_auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure cookie in production
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 365
        });
        // Send verification email (commented as per your original code)
        // await sendEmail({ email, emailType: "VERIFY", userId: newUser._id.toString() });

        return response;
    } catch (error) {
        return NextResponse.json(InternalServerError(error as Error))
    }
}
