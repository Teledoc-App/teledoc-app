import React, { FC, ReactNode } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
interface GoogleSignInButtonProps {
  children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const router = useRouter();
  const loginWithGoogle = async () => {
    const signInData = await signIn("google", {
     callbackUrl: "/home/patient" 
    });
    if (signInData?.error) {
      console.error(signInData.error);   
    }
  };

  return (
    <button
      type="button"
      onClick={loginWithGoogle}
      className="bg-[#d9d9d9]/30 border border-[#d9d9d9] text-gray-500 rounded-lg w-full h-[60px] font-semibold relative"
    >
      {children}
    </button>
  );
};

export default GoogleSignInButton;
