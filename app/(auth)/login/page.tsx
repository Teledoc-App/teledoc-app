"use client";

import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import GoogleSignInButton from "@/components/GoogleSigninButton";
import GoogleIcon from "../../../assets/google.svg";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (signInData?.error) {
      console.error(signInData.error);
    } else {
      const userId = session?.user?.id;
      const userRole = session?.user?.role;
      let callbackUrl = "/profile/";

      if (userRole === "patient") {
        callbackUrl += `patient/${userId}`;
      } else if (userRole === "doctor") {
        callbackUrl += `doctor/${userId}`;
      } else {
        console.error("Invalid user role:", userRole);
        return;
      }
      router.push(callbackUrl);
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
    <Form {...form}>
      <div className="flex items-center justify-center w-screen h-screen px-4 bg-white">
        <div className="w-full max-w-[400px] flex flex-col items-center gap-4">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-[400px] flex flex-col items-center gap-4 py-4 overflow-y-scroll"
          >
            <h1 className="text-[#ff5757] text-4xl font-bold">Sign In</h1>
            <div className="w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="mail@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="bg-[#ff5757] text-white rounded-lg w-full h-[60px] font-semibold mt-8"
              type="submit"
            >
              Sign in
            </Button>
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
    </Form>
  );
};

export default Page;
