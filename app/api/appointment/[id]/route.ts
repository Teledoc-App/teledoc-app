import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const appointment = await db.appointment.findUnique({
    where: {
      id,
    },
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

  if (!appointment) {
    let error_response = {
      status: "fail",
      message: "No Appointment with the Provided ID Found",
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  let json_response = {
    status: "success",
    data: {
      appointment,
    },
  };
  return NextResponse.json(json_response);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    let json = await request.json();

    const updated_appointment = await db.appointment.update({
      where: { id },
      data: json,
      select: {
        symptoms: true,
        rejectionReason: true,
        description: true,
        time: true,
        date: true,
        requestExtension: true,
        patient: {
          select: {
            id: true,
            name: true,
            gender: true,
            birthDate: true,
          },
        },
        doctor: {
          select: {
            id: true,
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
    if (!updated_appointment || !updated_appointment.patient) {
      let error_response = {
        status: "fail",
        message: "Updated appointment or patient information is missing",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
 await db.notification.create({
      data: {
        senderNotification: { connect: { id: updated_appointment.doctor.id} },
        receiverNotification: { connect: { id: updated_appointment.patient.id } },
        appointment: { connect: { id: id } },
      },
    });
    let json_response = {
      status: "success",
      data: {
        appointment: updated_appointment,
      },
    };
    return NextResponse.json(json_response);
  } catch (error: any) {
    if (error.code === "P2025") {
      let error_response = {
        status: "fail",
        message: "No Appointment with the Provided ID Found",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    let error_response = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await db.appointment.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    if (error.code === "P2025") {
      let error_response = {
        status: "fail",
        message: "No Appointment with the Provided ID Found",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    let error_response = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
