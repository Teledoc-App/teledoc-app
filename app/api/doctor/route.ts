import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const doctors = await db.doctor.findMany({
      where: {
        user: {
          role:'doctor',
        },
      },
      select: {
        username: true,
        strNumber: true,
        price: true,
        specialist: true,
        user: {
          select: {
            role: true,
            doctorAppointments: {
              select: {
                timeSlot: {
                  select: {
                    time: true,
                    date: true,
                  },
                },
              },
            },
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
