import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const users = await db.user.findMany();
    return NextResponse.json({ users });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message, success: false });
  }
}
