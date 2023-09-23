
import { db } from "@/lib/db";
import { NextResponse,  } from "next/server";
import { hash } from 'bcrypt';
import { parseISO } from 'date-fns'; 

import * as yup from 'yup'
// Define a schema for input validation
const userSchema = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    phone: yup.string().required(),
    gender: yup.string().oneOf(['M', 'F', 'O']).required(),
    birthDate: yup.date().required(),
    password: yup.string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/).min(8).required(),
    role: yup.string().oneOf(['patient', 'doctor']).required(),
  });


export async function POST(req: Request){
    try {
        const body = await req.json();
        await userSchema.validate(body);
        const { email, name, phone, gender, birthDate, password, role, image } = body;
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
                name,
                phone, 
                gender, 
                image,
                birthDate: parsedBirthDate,
                role
            }
        });
        const { password: newUserPassword, ...rest } = newUser
        return NextResponse.json({user: rest, message: "User create successfully"}, {status: 201});
    } catch(error) {
        console.log(error);
        return NextResponse.json({ message: error, success: false });
    }
}