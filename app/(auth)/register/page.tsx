"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import IconRolling from "../../../assets/rolling.svg";

import Select from "react-select";
import React, { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageKit from "imagekit";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import GenderSelect from "@/components/GenderSelect";
import RoleSelect from "@/components/RoleSelect";
import Image from "next/image";

interface Register {
  name: string;
  email: string;
  phone: number;
  password: string;
  gender: { label: string; value: string };
  birthDate: Date | null;
  role: { label: string; value: string };
  image: string;
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

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [birthDate, setBirthDate] = React.useState<Date | null>(null);

  const [imageInput, setImageInput] = useState<FileList | null>(null);
  const [imageUrl, setImageUrl] = useState("");

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
    getValues,
    formState: { errors },
  } = useForm<Register>();

  const [imageUploadKey, setImageUploadKey] = useState(Date.now());

  const updateImage = async () => {
    setIsUploading(true);
    try {
      const file = imageInput ? imageInput[0] : undefined;
      console.log(file);

      const imageKitResponse = await imageKit.upload({
        file: file as any,
        fileName: `${Date.now()}-${file}`,
      });

      setImageUrl(`${imageKitResponse.url}?${imageUploadKey}`);
    } catch (error) {
      console.log(error);
    }
    setIsUploading(false);
  };

  useEffect(() => {
    updateImage();
  }, [imageInput]);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageInput(e.target.files);
  };

  const onSubmit: SubmitHandler<Register> = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          image: imageUrl,
          birthDate: birthDate,
          role: selectedRole?.value,
          gender: selectedGender?.value,
        }),
      });
      if (response.ok) {
        console.log("Registration successful");
        router.replace("/login");
      } else {
        console.error("Registration failed");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    // PAGE
    <div className="flex items-center justify-center w-screen px-4 py-4 overflow-y-scroll bg-white h-fit">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[400px] flex flex-col items-center gap-4 py-4 overflow-y-scroll"
      >
        <nav className="relative flex items-center justify-center w-full">
          <a href="./login" className="absolute left-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <h1 className="text-[#ff5757] text-2xl font-bold">
            Create New Account
          </h1>
        </nav>

        {/*IMAGE*/}
        <div className="flex flex-col items-center gap-4">
          <div className="w-[150px] h-[150px] rounded-full overflow-hidden relative">
            {imageUrl ? (
              <img width={150} height={150} src={imageUrl} alt="" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full text-[#d9d9d9]"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {/* LOADING */}
            {isUploading && (
              <div className="w-full h-full left-0 top-0 bg-white/80 z-50 absolute flex justify-center items-center">
                <Image width={40} height={40} src={IconRolling} alt="" />
              </div>
            )}
          </div>
          <button
            className={`relative border ${
              errors.image ? "border-amber-500" : "border-[#ff5757]"
            }  rounded-full overflow-hidden hover:cursor-pointer px-3 py-1 ${
              isUploading && "animate-pulse"
            }`}
          >
            <p
              className={`hover:cursor-pointer ${
                errors.image ? "text-amber-500" : "text-[#ff5757]"
              }`}
            >
              {isUploading
                ? "Uploading..."
                : !isUploading && !errors.image && imageInput == null
                ? "Upload an image"
                : !isUploading && !errors.image && imageInput !== null
                ? "Change image"
                : errors.image?.message}
            </p>
            <input
              type="file"
              className="absolute top-0 left-0 z-20 w-full h-full bg-blue-300 opacity-0 hover:cursor-pointer"
              accept="image/*"
              onChange={handleFileInputChange}
            />
          </button>
        </div>
        {/* LAST NAME */}
        <div className="w-full">
          <label className="text-black" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your last name"
            defaultValue=""
            {...register("name", {
              required: {
                value: true,
                message: "Last name is a required field",
              },
            })}
            className={`bg-[#d9d9d9]/30 h-[60px] px-4 rounded-lg border  text-black  w-full outline-none ${
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
            className={`bg-[#d9d9d9]/30 h-[60px] px-4 rounded-lg border  text-black  w-full outline-none ${
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
            className={`bg-[#d9d9d9]/30 h-[60px] px-4 rounded-lg border  black w-full outline-none ${
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
              minLength: {
                value: 8,
                message: "Password needs to be at least 8 characters",
              },
              required: {
                value: true,
                message: "Password is a required field",
              },
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/,
                message:
                  "Password needs uppercase, lowercase, number, special character",
              },
            })}
            className={`bg-[#d9d9d9]/30 h-[60px] px-4 rounded-lg border  text-black w-full outline-none ${
              errors?.password
                ? "border-amber-500 focus:border-amber-500"
                : "focus:border-[#ff5757] border-[#d9d9d9]"
            } `}
          />
          <p className="text-amber-500">{errors?.password?.message}</p>
        </div>
        {/*BIRTHDATE*/}
        <p className="w-full -mb-4 text-left text-black">Birth Date</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={birthDate}
            onChange={(date) => setBirthDate(date)}
            format="YYYY - MM - DD"
            sx={{
              width: "100%",
              backgroundColor: "rgba(217, 217, 217, 0.3)",
              // borderColor: "#ff5757",
              // outline: "#ff5757",
              borderRadius: "8px",
            }}
          />
        </LocalizationProvider>

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
          className="bg-[#ff5757] disabled:bg-[#d9d9d9] rounded-lg w-full h-[60px] font-semibold text-white mt-8 flex justify-center items-center"
          disabled={isLoading ? true : false}
        >
          {isLoading ? (
            <Image width={40} height={40} src={IconRolling} alt="" />
          ) : (
            "Sign up"
          )}
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
