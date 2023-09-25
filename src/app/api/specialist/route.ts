import { db } from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { parseISO } from 'date-fns'; 


export async function GET(request: NextRequest) {
    
    // const page_str = request.nextUrl.searchParams.get("page");
    // const limit_str = request.nextUrl.searchParams.get("limit");
  
    // const page = page_str ? parseInt(page_str, 10) : 1;
    // const limit = limit_str ? parseInt(limit_str, 10) : 10;
    // const skip = (page - 1) * limit;
    
  
    
    const specialist = await db.specialist.findMany({
    //   skip,
    //   take: limit,
    select: {
           title: true,
           doctors:{
            select:{
                username: true
            }}
        }
    });
    let json_response = {
        status: "success",
        //results: specialist.length,
        specialist,
    };
    return NextResponse.json(json_response);
}

export async function POST(request: Request) {
    try {
      const json = await request.json();
      const { title, image } = json;

        
  
      const specialist = await db.specialist.create({
        data: {
            title,
            image,
        }
      });
  
      let json_response = {
        status: "success",
        data: {
          specialist,
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
          message: "specialist with title already exists",
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
  