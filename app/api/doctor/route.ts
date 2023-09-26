import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const doctors = await db.doctor.findMany({
      where: {
        user: {
          role: 'doctor',
        },
      },
      select: {
        userId: true,
        username: true,
        strNumber: true,
        price: true,
        specialist: true,
        user: {
          select: {
            image: true,
            role: true,
            doctorAppointments: {
              select: {
                status: true,
                reason: true,
                description: true,
                timeSlot: {
                  select: {
                    time: true,
                    date: true,
                  },
                },
                patient: {
                  select: {
                    name :true,
                    gender: true,
                    birthDate: true,
                    image: true,
                    phone: true,
                  }
                }
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
