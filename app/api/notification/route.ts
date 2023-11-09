import { getServerSession } from "next-auth";
import { getErrorResponse } from "@/lib/helpers";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { parseISO } from "date-fns";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return getErrorResponse(
        401,
        "You are not logged in, please provide a token to gain access"
      );
    }

    const userId = session.user.id;

    const notification = await db.notification.findMany({
      where: {
        receiverId: userId,
      },
      orderBy: {
        createdAt: "desc",
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

    let json_response = {
      notification,
    };
    return NextResponse.json(json_response);
  } catch (error) {
    return getErrorResponse(500, "Internal Server Error");
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const appointment = await db.notification.create({
      data: json,
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