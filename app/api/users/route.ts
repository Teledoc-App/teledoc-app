import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,
  ) {
  try {
    // Using findMany to search for users based on the filter
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        gender: true,
        birthDate: true,
        image: true,
        role: true,
        patientAppointments: {
          select: {
          doctor: {
            select: {
              doctor: {
                select: {
                  username: true,
                }
              }
            }
          },
          reason: true,
          description: true,
          timeSlot: {
            select: {
              time: true,
              date: true,
            }
          },
          status: {
            select: {
              name: true
            }
          }
        }},
        doctorAppointments: {
          select: {
          patient: {
            select: {
              name: true,
              birthDate: true,
              gender: true,
            }
          },
          reason: true,
          description: true,
          timeSlot: {
            select: {
              time: true,
              date: true,
            }
          },
          status: {
            select: {
              name: true
            }
          }
        }}
      },
    });

    const json_response = {
      users,
    };

    return NextResponse.json(json_response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({status: "error",
    message:"An error occurred while fetching users."})
  }
}
