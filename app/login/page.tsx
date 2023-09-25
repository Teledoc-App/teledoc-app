"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from 'next-auth/react';
import Image from "next/image";
import GoogleSignInButton from "@/components/GoogleSigninButton";
import { useRouter } from "next/navigation";

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
  } = useForm<Login>();
  const onSubmit: SubmitHandler<Login> = async (data) => {
   const signInData = await signIn('credentials', {
   data
   }
   );
   if (signInData?.error) {
    console.log(signInData.error);
   } else {
    // Check the user's role and navigate accordingly
    const userRole = data.role; // You should have a way to get the user's role
    if (userRole === 'patient') {
      router.push('/profile/patient');
    } else if (userRole === 'doctor') {
      router.push('/profile/doctor');
    } else {
      console.error('Invalid user role:', userRole);
    }
  }
}
  return (
    // PAGE CONTAINER
    <div className="bg-white w-screen h-screen flex justify-center items-center px-4">
      <div  className="w-full max-w-[400px] flex flex-col items-center gap-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[400px] flex flex-col items-center gap-4"
      >
        <h1 className="text-[#ff5757] text-4xl font-bold">Teledoc</h1>
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
        <a href="" className="text-[#ff5757]">
          Forgot Password?
        </a>
        {/* SUBMIT */}
        <button
          type="submit"
          className="bg-[#ff5757] rounded-lg w-full h-[60px] font-semibold"
        >
          Sign in
        </button>
      </form>
        <GoogleSignInButton>
          <Image width={35} height={35}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1920px-Google_%22G%22_Logo.svg.png"
            alt="google-logo" 
            className="w-[35px] absolute top-3 left-4"
            />
          Sign in with Google
            </GoogleSignInButton>
   </div>
    </div>
  );
};

export default Page;
