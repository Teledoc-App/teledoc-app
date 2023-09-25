import { db } from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    const id = params.id;
    const timeSlot = await db.timeSlot.findUnique({
      where: {
        id,
      },
      select: {
        time: true,
        date: true,
appointment: { 
select: {
reason: true,
description: true,
patient: {
    select: {
        name: true,
        gender: true,
        birthDate: true,
    },
},
status:{
    select:{
        name: true,
    }
},
doctor: {
    select: {
        doctor: { 
            select: {
                username: true,
            },
        }
    },
},
}, 
},

  },
});
  
    if (!timeSlot) {
      let error_response = {
        status: "fail",
        message: "No timeSlot with the Provided ID Found",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    let json_response = {
      status: "success",
      data: {
        timeSlot,
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
  
      const updated_timeSlot = await db.timeSlot.update({
        where: { id },
        data: json,
        select: {
            time: true,
            date: true,
    appointment: { 
    select: {
    reason: true,
    description: true,
    patient: {
        select: {
            name: true,
            gender: true,
            birthDate: true,
        },
    },
    status:{
        select:{
            name: true,
        }
    },
    doctor: {
        select: {
            doctor: { 
                select: {
                    username: true,
                },
            }
        },
    },
}, 
},

      },
    });
  
  
      let json_response = {
        status: "success",
        data: {
          timeSlot: updated_timeSlot,
        },
      };
      return NextResponse.json(json_response);
    } catch (error: any) {
      if (error.code === "P2025") {
        let error_response = {
          status: "fail",
          message: "No timeSlot with the Provided ID Found",
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
      await db.timeSlot.delete({
        where: { id },
      });
  
      return new NextResponse(null, { status: 204 });
    } catch (error: any) {
      if (error.code === "P2025") {
        let error_response = {
          status: "fail",
          message: "No timeSlot with the Provided ID Found",
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