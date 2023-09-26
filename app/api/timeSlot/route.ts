import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { parseISO } from 'date-fns'; 


export async function GET(request: NextRequest) {
    
    // const page_str = request.nextUrl.searchParams.get("page");
    // const limit_str = request.nextUrl.searchParams.get("limit");
  
    // const page = page_str ? parseInt(page_str, 10) : 1;
    // const limit = limit_str ? parseInt(limit_str, 10) : 10;
    // const skip = (page - 1) * limit;
    
  
    
    const timeSlot = await db.timeSlot.findMany({
    //   skip,
    //   take: limit,
    select: {
      id: true,
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
        //results: timeSlot.length,
        timeSlot,
    };
    return NextResponse.json(json_response);
}

export async function POST(request: Request) {
    try {
      const json = await request.json();
      const { date, time } = json;
        const parsedDateSlot = parseISO(date);
        
  
      const timeSlot = await db.timeSlot.create({
        data: {
            time,
            date: parsedDateSlot
        }
      });
  
      let json_response = {
        status: "success",
        data: {
          timeSlot,
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
          message: "timeSlot with title already exists",
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
  