import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_KEY =
  process.env["JWT_KEY"] ||
  "0e263e99692d725f0a2335f0dd7cfe080b2d4793d2793d6439e4d6a69daa5e5d";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await db.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json(
        { user: null, message: "User not found" },
        { status: 404 }
      );
    }

    if (user.password) {
      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        return NextResponse.json(
          { user: null, message: "Incorrect password" },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { user: null, message: "Password not set" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ email: user.email, userId: user.id }, JWT_KEY, {
      expiresIn: "10h",
    });

    const { password: userPassword, ...rest } = user;
    return NextResponse.json(
      { user: rest, token, message: "Login successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Login failed", success: false },
      { status: 500 }
    );
  }
}
