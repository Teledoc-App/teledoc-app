import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const doctor = await db.user.findUnique({
    where: { id },
    select: {
      doctor: {
        select: {
          userId: true,
          username: true,
          strNumber: true,
          price: true,
        },
      },
      // doctorAppointments: {
      //   select: {
      //     time: true,
      //     date: true,
      //     status: true,
      //     reason: true,
      //     description: true,
      //     patient: {
      //       select: {
      //         name: true,
      //         gender: true,
      //         birthDate: true,
      //         image: true,
      //         phone: true,
      //       },
      //     },
      //   },
      // },
    },
  });

  if (!doctor) {
    let error_response = {
      status: "fail",
      message: "No doctor with the Provided ID Found",
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  let json_response = {
    status: "success",
    data: {
      doctor,
    },
  };
  return NextResponse.json(json_response);
}

export async function PATCH(
  request: Request,
  { params }: { params: { doctorId: string } }
) {
  try {
    const userId = params.doctorId;
    let json = await request.json();

    const updated_doctor = await db.doctor.update({
      where: { userId },
      data: json,
      select: {
        username: true,
        strNumber: true,
        price: true,
        specialist: {
          select: {
            title: true,
            image: true,
          },
        },
      },
    });

    let json_response = {
      status: "success",
      data: {
        status: updated_doctor,
      },
    };
    return NextResponse.json(json_response);
  } catch (error: any) {
    if (error.code === "P2025") {
      let error_response = {
        status: "fail",
        message: "No status with the Provided ID Found",
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
