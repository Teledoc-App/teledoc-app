import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const doctors = await db.doctor.findMany({
      include: {
        user: {
          include: {
            doctorAppointments: true,
          },
        },
      },
    });

    return NextResponse.json({ doctors });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 } // Internal Server Error
    );
  }
}
