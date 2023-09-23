"use client";

import { SubmitHandler, useForm } from "react-hook-form";

interface Login {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  password: string;
  gender: "male" | "female";
  birthdate: Date;
  role: "patient" | "doctor";
}

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();
  const onSubmit: SubmitHandler<Login> = (data) => console.log(data);

  return (
    // PAGE
    <div className="bg-white w-screen h-screen flex justify-center items-center px-4 py-8 overflow-y-scroll">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[400px] flex flex-col items-center gap-4 py-8"
      >
        <h1 className="text-[#ff5757] text-4xl font-bold">Teledoc</h1>

        {/* FIRST NAME */}
        <div className="w-full">
          <label className="text-black" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            defaultValue=""
            {...register("firstName", {
              required: {
                value: true,
                message: "First name is a required field",
              },
            })}
            className={`bg-[#d9d9d9]/30 h-[60px] px-4 rounded-lg border  text-gray-400  w-full outline-none ${
              errors?.firstName
                ? "border-amber-500 focus:border-amber-500"
                : "focus:border-[#ff5757] border-[#d9d9d9]"
            } `}
          />
          <p className="text-amber-500">{errors?.firstName?.message}</p>
        </div>

        {/* LAST NAME */}
        <div className="w-full">
          <label className="text-black" htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            defaultValue=""
            {...register("lastName", {
              required: {
                value: true,
                message: "Last name is a required field",
              },
            })}
            className={`bg-[#d9d9d9]/30 h-[60px] px-4 rounded-lg border  text-gray-400  w-full outline-none ${
              errors?.lastName
                ? "border-amber-500 focus:border-amber-500"
                : "focus:border-[#ff5757] border-[#d9d9d9]"
            } `}
          />
          <p className="text-amber-500">{errors?.lastName?.message}</p>
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
            id="phoneNumber"
            type="number"
            placeholder="(XXX)-XXXX-XXXX"
            defaultValue=""
            {...register("phoneNumber", {
              required: {
                value: true,
                message: "Phone number is a required field",
              },
            })}
            className={`bg-[#d9d9d9]/30 h-[60px] px-4 rounded-lg border  text-gray-400  w-full outline-none ${
              errors?.phoneNumber
                ? "border-amber-500 focus:border-amber-500"
                : "focus:border-[#ff5757] border-[#d9d9d9]"
            } `}
          />
          <p className="text-amber-500">{errors?.phoneNumber?.message}</p>
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

        {/* SUBMIT */}
        <button
          type="submit"
          className="bg-[#ff5757] rounded-lg w-full h-[60px] font-semibold"
        >
          Sign in
        </button>
        <span className="text-black">
          Already have an account?
          <a href="" className="text-[#ff5757]">
            {" "}
            Sign In
          </a>
        </span>
      </form>
    </div>
  );
};

export default Page;
