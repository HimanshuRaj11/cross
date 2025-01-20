import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { InternalServerError } from "./handleError";

interface DecodedToken {
    _id: string;
    key: any;
}

export const verifyUser = async (): Promise<string | NextResponse> => {
    try {
        const cookiesObj = await cookies();
        const token = cookiesObj.get("Jiiwal_auth_token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Token not found!" }, { status: 401 });
        }
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET as string) as DecodedToken;

        if (!decodedToken) {
            return NextResponse.json({ message: "User Not verified!!!" }, { status: 401 });
        }
        return decodedToken._id;
    } catch (error: any) {
        return NextResponse.json(InternalServerError(error))
    }
};
