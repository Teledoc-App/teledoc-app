import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // const page_str = request.nextUrl.searchParams.get("page");
  // const limit_str = request.nextUrl.searchParams.get("limit");

  // const page = page_str ? parseInt(page_str, 10) : 1;
  // const limit = limit_str ? parseInt(limit_str, 10) : 10;
  // const skip = (page - 1) * limit;

  const appointment = await db.appointment.findMany({
    //   skip,
    //   take: limit,

    select: {
      id: true,
      symptoms: true,
      rejectionReason: true,
      description: true,
      time: true,
      date: true,
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
    //results: appointment.length,
    appointment,
  };
  return NextResponse.json(json_response);
}

// export async function POST(request: Request) {
// 	try {
// 		const json = await request.json();

// 		const appointment = await db.appointment.create({
// 			data: {
// 				...json,
// 				status: {
// 					connect: {
// 						name: "Pending",
// 					},
// 				},
// 			},
// 		});

// 		let json_response = {
// 			status: "success",
// 			data: {
// 				appointment,
// 			},
// 		};
// 		return new NextResponse(JSON.stringify(json_response), {
// 			status: 201,
// 			headers: { "Content-Type": "application/json" },
// 		});
// 	} catch (error: any) {
// 		if (error.code === "P2002") {
// 			let error_response = {
// 				status: "fail",
// 				message: "appointment with title already exists",
// 			};
// 			return new NextResponse(JSON.stringify(error_response), {
// 				status: 409,
// 				headers: { "Content-Type": "application/json" },
// 			});
// 		}

// 		let error_response = {
// 			status: "error",
// 			message: error.message,
// 		};
// 		return new NextResponse(JSON.stringify(error_response), {
// 			status: 500,
// 			headers: { "Content-Type": "application/json" },
// 		});
// 	}
// }

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const appointment = await db.appointment.create({
      data: json,
    });
    const notification = await db.notification.create({
      data: json,
    });

    let json_response = {
      status: "success",
      data: {
        appointment,
        notification,
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
