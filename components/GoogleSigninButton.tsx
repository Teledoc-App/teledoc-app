import { FC, ReactNode } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
interface GoogleSignInButtonProps {
  children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const loginWithGoogle = async () => {
    const signInData = await signIn('google', {
      callbackUrl: process.env.NEXTAUTH_CALLBACK_URL, 
    });

    if (signInData?.error) {
      console.error(signInData.error);
    } else {
      const userRole = session?.user?.role;
      if (userRole === 'patient') {
        router.push('/profile/patient');
      } else if (userRole === 'doctor') {
        router.push('/profile/doctor');
      } else {
        console.error('Invalid user role:', userRole);
      }
    }
  };


  return(
    <button onClick={loginWithGoogle}  className="bg-[#d9d9d9]/30 border border-[#d9d9d9] text-gray-500 rounded-lg w-full h-[60px] font-semibold relative" >{children}</button>
  );
}
export default GoogleSignInButton;