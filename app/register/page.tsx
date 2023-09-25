"use client";

import Select from "react-select";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import GenderSelect from "@/components/GenderSelect";
import RoleSelect from "@/components/RoleSelect";

interface Login {
  name: string;
  email: string;
  phone: number;
  password: string;
  gender: { label: string; value: string };
  birthdate: Date;
  role: { label: string; value: string };
}

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
  } = useForm<Login>();
  const onSubmit: SubmitHandler<Login> = async (data) => {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    });
    if (response.ok) {
      router.push("/sign-in");
    } else {
      console.error("Registration failed");
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
        {/*GENDER*/}
        <GenderSelect
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
        />
        <RoleSelect
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        {/* <RoleSelect/> */}
        {/* <div className="w-full relative">
          <label htmlFor="" className="text-black">
            Gender
          </label>
          <button
            type="button"
            className="flex items-center px-4 w-full border border-[#d9d9d9] bg-[#d9d9d9]/30 text-black h-[60px] rounded-lg"
          >
            Male
          </button>
          <ul className="absolute bg-red-500 py-2 shadow-lg rounded-lg w-full mt-2">
            <li className="text-black px-4 py-1 hover:cursor-pointer hover:bg-[#d9d9d9]/30">
              Male
            </li>
            <li className="text-black px-4 py-1 hover:cursor-pointer hover:bg-[#d9d9d9]/30">
              Female
            </li>
          </ul>
        </div> */}
        {/* <Select
        defaultValue={selectedGender}
        onChange={setSelectedGender}
        options={genderOptions}
      />
       <Select
        defaultValue={selectedRole}
        onChange={setSelectedRole}
        options={roleOptions}
      /> */}
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
