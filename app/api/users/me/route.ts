import { getServerSession } from "next-auth";
import { getErrorResponse } from "@/lib/helpers";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return getErrorResponse(
        401,
        "You are not logged in, please provide a token to gain access"
      );
    }

    const userId = session.user.id;

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        gender: true,
        birthDate: true,
        role: true,
        patientAppointments: {
          select: {
            doctor: {
              select: {
                doctor: {
                  select: {
                    username: true,
                  }
                }
              }
            },
            reason: true,
            description: true,
            TimeSlot: {
              select: {
                time: true,
                date: true,
              }
            },
            status: {
              select: {
                name: true
              }
            }
          }
        },
        doctorAppointments: {
          select: {
            patient: {
              select: {
                name: true,
                birthDate: true,
                gender: true,
              }
            },
            reason: true,
            description: true,
            TimeSlot: {
              select: {
                time: true,
                date: true,
              }
            },
            status: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json({
      status: "success",
      data: { user: { ...user } },
    });
  } catch (error) {
    // Handle any errors here and return an appropriate response
    console.error(error);
    return getErrorResponse(500, "An error occurred while processing your request.");
  }
}

export default async function PATCH(request: Request,
  { params }: { params: { userId: string } }) {
    try {

      const session = await getServerSession(authOptions);


      if (session && session.user) {
        const userId = session.user.id; 
        let updatedUserData = await request.json();
    
       
        const updatedUser = await db.user.update({
          where: { id: userId },
          data: updatedUserData,
          select: {
            name: true,
            email: true,
            phone: true,
            gender: true,
            birthDate: true,
            role: true,
            patientAppointments: {
              select: {
                doctor: {
                  select: {
                    doctor: {
                      select: {
                        username: true,
                      }
                    }
                  }
                },
                reason: true,
                description: true,
                TimeSlot: {
                  select: {
                    time: true,
                    date: true,
                  }
                },
                status: {
                  select: {
                    name: true
                  }
                }
              }
            },
            doctorAppointments: {
              select: {
                patient: {
                  select: {
                    name: true,
                    birthDate: true,
                    gender: true,
                  }
                },
                reason: true,
                description: true,
                TimeSlot: {
                  select: {
                    time: true,
                    date: true,
                  }
                },
                status: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        });

        return NextResponse.json({
          status: "success",
          data: updatedUser,
        });
      } else {
        return NextResponse.json({
          status: "error",
          message: "You must be logged in to perform an update.",
        });
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        status: "error",
        message: "Failed to update the user.",
      });
    }
  } 
 