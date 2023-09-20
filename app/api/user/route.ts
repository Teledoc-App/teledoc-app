import { db } from "@/lib/db";
import { NextResponse,  } from "next/server";
import { hash } from 'bcrypt';
import { parseISO } from 'date-fns'; 
export async function POST(req: Request, ){
    try {
        const body = await req.json();
        const { email, firstName, lastName, phone, gender, birthDate, password, } = body;
        // email user exists
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists"}, {status: 409})
        }
         // phone user exists
         const existingUserPhone = await db.user.findUnique({
            where: { phone: phone }
        });
        if (existingUserPhone) {
            return NextResponse.json({ user: null, message: "User with this phone already exists"}, {status: 409})
        }
        const hashedPassword = await hash(password, 10);
        // Validate and format birthDate using date-fns
        const parsedBirthDate = parseISO(birthDate);
        const newUser = await db.user.create({
            data: {
                email, 
                password: hashedPassword,
                firstName, 
                lastName, 
                phone, 
                gender, 
                birthDate: parsedBirthDate
            }
        });
        const { password: newUserPassword, ...rest } = newUser
        return NextResponse.json({user: newUser, message: "User create successfully"}, {status: 201});
    } catch(error) {
        console.log(error);
        return NextResponse.json({ message: error, success: false });
    }
}