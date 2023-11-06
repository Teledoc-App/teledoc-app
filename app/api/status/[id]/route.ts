import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { io } from "@/app/socketServer";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const status = await db.status.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      appointments: {
        select: {
          doctor: {
            select: {
              doctor: {
                select: {
                  username: true,
                },
              },
            },
          },
          patient: {
            select: {
              name: true,
            },
          },
          symptoms: true,
          rejectionReason: true,
          description: true,
          time: true,
          date: true,
          status: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!status) {
    let error_response = {
      status: "fail",
      message: "No status with the Provided ID Found",
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  let json_response = {
    status: "success",
    data: {
      status,
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

    const updated_status = await db.status.update({
      where: { id },
      data: json,
      select: {
        name: true,
        appointments: {
          select: {
            doctor: {
              select: {
                doctor: {
                  select: {
                    username: true,
                  },
                },
              },
            },
            patient: {
              select: {
                name: true,
              },
            },
            symptoms: true,
            rejectionReason: true,
            description: true,
            time: true,
            date: true,
            status: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    io.emit("status-change", {
      eventType: "status-change",
      data: updated_status,
    });

    let json_response = {
      status: "success",
      data: {
        status: updated_status,
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await db.status.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
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
