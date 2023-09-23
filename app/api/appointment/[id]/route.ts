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
        reason: true,
        description: true,
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
            }
          },
        },
        timeSlot: {
          select: {
           time: true,
           date: true,
          },
        },
        status:{
            select:{
                name: true,
            }
        }
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
          reason: true,
          description: true,
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
              }
            },
          },
          timeSlot: {
            select: {
             time: true,
             date: true,
            },
          },
          status:{
              select:{
                  name: true,
              }
          }
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