import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const notification = await db.notification.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      senderId: true,
      receiverId: true,
      createdAt: true,
      receiverNotification: {
        select: {
          name: true,
          image: true,
        },
      },
      senderNotification: {
        select: {
          name: true,
          image: true,
        },
      },
      appointment: {
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

  if (!notification) {
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
      notification,
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

    const updated_notification = await db.notification.update({
      where: { id },
      data: json,
      select: {
        id: true,
        senderId: true,
        receiverId: true,
        createdAt: true,
        receiverNotification: {
          select: {
            name: true,
            image: true,
          },
        },
        senderNotification: {
          select: {
            name: true,
            image: true,
          },
        },
        appointment: {
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

    let json_response = {
      status: "success",
      data: {
        status: updated_notification,
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
    await db.notification.delete({
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
