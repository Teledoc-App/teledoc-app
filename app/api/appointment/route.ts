import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const appointment = await db.appointment.findMany({
    select: {
      id: true,
      symptoms: true,
      rejectionReason: true,
      description: true,
      time: true,
      date: true,
      requestExtension: true,
      patient: {
        select: {
          name: true,
          gender: true,
          birthDate: true,
        },
      },
      doctor: {
        select: {
          doctor: {
            select: {
              username: true,
            },
          },
        },
      },
      status: {
        select: {
          name: true,
        },
      },
    },
  });

  let json_response = {
    status: "success",
    appointment,
  };
  return NextResponse.json(json_response);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const notificationMessage = `${json.patient.name} has an appointment with Dr. ${json.doctor.doctor.username} at ${json.date}`;

    const appointment = await db.appointment.create({
      data: json,
    });

    const notification = await db.notification.create({
      data: {
        senderNotification: { connect: { id: json.patientId } },
        receiverNotification: { connect: { id: json.doctorId } },
        appointment: { connect: { id: appointment.id } },
      },
    });

    let json_response = {
      status: "success",
      data: {
        appointment,
      },
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      let error_response = {
        status: "fail",
        message: "appointment with title already exists",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    let error_response = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 507,
      headers: { "Content-Type": "application/json" },
    });
  }
}
