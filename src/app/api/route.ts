import connectDB from "@/lib/db";
import { InternalServerError } from "@/lib/handleError";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        await connectDB()
        return NextResponse.json({ message: "database connected" })
    } catch (error) {
        return NextResponse.json(InternalServerError(error))
    }
}