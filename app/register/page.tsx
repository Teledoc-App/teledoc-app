"use client";

import Select from "react-select";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageKit from 'imagekit';
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useRouter } from "next/navigation";
import GenderSelect from "@/components/GenderSelect";
import RoleSelect from "@/components/RoleSelect";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"



interface Register {
  name: string;
  email: string;
  phone: number;
  password: string;
  gender: { label: string; value: string };
  birthDate:  Date | null; 
  role: { label: string; value: string }
  image: string
}

//type Date = DatePiece | [DatePiece, DatePiece];
const publicKeyEnv = process.env.NEXT_PUBLIC_KEY as string;
const privateKeyEnv = process.env.NEXT_PUBLIC_PRIVATE_KEY as string;
const urlEndpointEnv = process.env.NEXT_PUBLIC_URL_ENDPOINT as string;

const imageKit = new ImageKit({
  publicKey: publicKeyEnv,
  privateKey: privateKeyEnv,
  urlEndpoint: urlEndpointEnv,
});

interface Gender {
  value: string;
  label: string;
}

interface Role {
  value: string;
  label: string;
}
        
const Page = () => {
  const router = useRouter();
  const [date, setDate] = React.useState<Date>()
  const [selectedGender, setSelectedGender] = useState<Gender>({
    value: "M",
    label: "Male",
  });

  const [selectedRole, setSelectedRole] = useState<Role>({
    value: "patient",
    label: "Patient",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>();
 
  const onSubmit: SubmitHandler<Register> = async (data) => {
    try {
      // Upload gambar ke ImageKit
      const file = data.image[0]; // Ambil gambar dari form input
      const imageKitResponse = await imageKit.upload({
        file: file as any,
        fileName: `${Date.now()}-${file}`,
      });
      const imageUrl = imageKitResponse.url;
      
    const response = await fetch('/api/register', {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify ({
        ...data,
        image: imageUrl, 
        birthDate: date, 
        role:selectedRole?.value,
        gender: selectedGender?.value
      })
    })
    if (response.ok) {
      router.push('/login');
    } else {
      console.error('Registration failed');
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    // PAGE
    <div className="bg-white w-screen h-screen flex justify-center items-center px-4 py-8 overflow-y-scroll">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[400px] flex flex-col items-center gap-4 py-8"
      >
        <h1 className="text-[#ff5757] text-4xl font-bold">Teledoc</h1>
{/*IMAGE*/}
<input
      type="file"
      accept="image/*"
      {...register("image", {
        required: {
          value: true,
          message: "Image is a required field",
        },
      })}
    />
        {/* LAST NAME */}
        <div className="w-full">
          <label className="text-black" htmlFor="lastName">
            Name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            defaultValue=""
            {...register("name", {
              required: {
                value: true,
                message: "Last name is a required field",
              },
            })}
            className={`bg-[#d9d9d9]/30 h-[60px] px-4 rounded-lg border  text-gray-400  w-full outline-none ${
              errors?.name
                ? "border-amber-500 focus:border-amber-500"
                : "focus:border-[#ff5757] border-[#d9d9d9]"
            } `}
          />
          <p className="text-amber-500">{errors?.name?.message}</p>
        </div>

        {/* EMAIL */}
        <div className="w-full">
          <label className="text-black" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            {...register("email")}
            defaultValue=""
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is a required field",
              },
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Entered value does not match email format",
              },
            })}
            className={`bg-[#d9d9d9]/30 h-[60px] px-4 rounded-lg border  text-gray-400  w-full outline-none ${
              errors?.email
                ? "border-amber-500 focus:border-amber-500"
                : "focus:border-[#ff5757] border-[#d9d9d9]"
            } `}
          />
          <p className="text-amber-500">{errors?.email?.message}</p>
        </div>

        {/* PHONE NUMBER */}
        <div className="w-full">
          <label className="text-black" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            id="phone"
            type="number"
            placeholder="(XXX)-XXXX-XXXX"
            defaultValue=""
            {...register("phone", {
              required: {
                value: true,
                message: "Phone number is a required field",
              },
            })}
            className={`bg-[#d9d9d9]/30 h-[60px] px-4 rounded-lg border  text-gray-400  w-full outline-none ${
              errors?.phone
                ? "border-amber-500 focus:border-amber-500"
                : "focus:border-[#ff5757] border-[#d9d9d9]"
            } `}
          />
          <p className="text-amber-500">{errors?.phone?.message}</p>
        </div>

        {/* PASSWORD */}
        <div className="w-full">
          <label className="text-black" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            defaultValue=""
            {...register("password", {
              required: {
                value: true,
                message: "Password is a required field",
              },
            })}
            className={`bg-[#d9d9d9]/30 h-[60px] px-4 rounded-lg border  text-gray-400  w-full outline-none ${
              errors?.password
                ? "border-amber-500 focus:border-amber-500"
                : "focus:border-[#ff5757] border-[#d9d9d9]"
            } `}
          />
          <p className="text-amber-500">{errors?.password?.message}</p>
        </div>
        {/*BIRTHDATE*/}
        <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
        {/*GENDER*/}
        <GenderSelect
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
        />
        <RoleSelect
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        {/* SUBMIT */}
        <button
          type="submit"
          className="bg-[#ff5757] rounded-lg w-full h-[60px] font-semibold"
        >
          Sign up
        </button>
        <span className="text-black">
          Already have an account?{" "}
          <a href="./login" className="text-[#ff5757] hover:underline">
            Sign In
          </a>
        </span>
      </form>
    </div>
  );
};

export default Page;
