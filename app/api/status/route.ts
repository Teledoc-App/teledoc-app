import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { parseISO } from "date-fns";

export async function GET(request: NextRequest) {
  // const page_str = request.nextUrl.searchParams.get("page");
  // const limit_str = request.nextUrl.searchParams.get("limit");

  // const page = page_str ? parseInt(page_str, 10) : 1;
  // const limit = limit_str ? parseInt(limit_str, 10) : 10;
  // const skip = (page - 1) * limit;

  const status = await db.status.findMany({
    //   skip,
    //   take: limit,
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
  let json_response = {
    //results: status.length,
    status,
  };
  return NextResponse.json(json_response);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const status = await db.status.create({
      data: json,
    });

    let json_response = {
      status: "success",
      data: {
        status,
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
        message: "status with title already exists",
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
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
