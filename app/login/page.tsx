"use client";

import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { ReactNode } from "react";
import GoogleSignInButton from "@/components/GoogleSigninButton";
import GoogleIcon from "../../assets/google.svg";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Login {
  role: string;
  email: string;
  password: string;
}

const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Login>();

  const onSubmit: SubmitHandler<Login> = async (data, e) => {
    e?.preventDefault();
    // const { data: session, status } = useSession();
    // const signInData = await signIn("credentials", {
    //   data,
    // });
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  // if (signInData?.error) {
  //   console.log(signInData.error);
  // } else {
  //   const userRole = data.role;
  //   if (userRole === "patient") {
  //     router.replace("/profile/patient");
  //   } else if (userRole === "doctor") {
  //     router.replace("/profile/doctor");
  //   } else {
  //     console.error("Invalid user role:", userRole);
  //   }
  // }
  // console.log(signInData);

  return (
    // PAGE CONTAINER
    <div className="bg-white w-screen h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-[400px] flex flex-col items-center gap-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[400px] flex flex-col items-center gap-4"
        >
          <h1 className="text-[#ff5757] text-4xl font-bold">Sign In</h1>
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
              className={`bg-[#d9d9d9]/30 h-[60px] px-4 rounded-lg border  text-black  w-full outline-none ${
                errors?.email
                  ? "border-amber-500 focus:border-amber-500"
                  : "focus:border-[#ff5757] border-[#d9d9d9]"
              } `}
            />
            <p className="text-amber-500">{errors?.email?.message}</p>
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
              className={`bg-[#d9d9d9]/30 h-[60px] px-4 rounded-lg border text-black  w-full outline-none ${
                errors?.password
                  ? "border-amber-500 focus:border-amber-500"
                  : "focus:border-[#ff5757] border-[#d9d9d9]"
              } `}
            />
            <p className="text-amber-500">{errors?.password?.message}</p>
          </div>
          <a href="" className="text-[#ff5757]">
            Forgot Password?
          </a>
          {/* SUBMIT */}
          <button
            type="submit"
            className="bg-[#ff5757] text-white rounded-lg w-full h-[60px] font-semibold mt-8"
          >
            Sign in
          </button>
        </form>
        <GoogleSignInButton>
          <Image
            width={35}
            height={35}
            src={GoogleIcon}
            alt="google-logo"
            className="w-[35px] absolute top-3 left-4"
          />
          Sign in with Google
        </GoogleSignInButton>
        <span className="text-black">
          Dont have an account?{" "}
          <a href="./register" className="text-[#ff5757] hover:underline">
            Sign Up
          </a>
        </span>
      </div>
    </div>
  );
};

export default Page;
