import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const queryParams = new URLSearchParams(req.url.split("?")[1]);
    const doctorId = queryParams.get("doctorId");

    if (!doctorId) {
      return NextResponse.json(
        { message: "Doctor ID is missing", success: false },
        { status: 400 }
      );
    }

    const doctor = await db.doctor.findUnique({
      where: { userId: doctorId },
      include: {
        user: {
          include: {
            doctorAppointments: true,
          },
        },
      },
    });

    if (!doctor) {
      return NextResponse.json(
        { message: "Doctor not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ doctor });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 } // Internal Server Error
    );
  }
}
