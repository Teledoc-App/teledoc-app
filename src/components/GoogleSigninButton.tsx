import { FC, ReactNode } from 'react';
import { signIn } from 'next-auth/react';

interface GoogleSignInButtonProps {
    children: ReactNode;
  }

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginWithGoogle = () => signIn('google', {callbackUrl: 'http://localhost:3000/' });

  return(
    <button onClick={loginWithGoogle}  className="bg-[#d9d9d9]/30 border border-[#d9d9d9] text-gray-500 rounded-lg w-full h-[60px] font-semibold relative" >{children}</button>
  );
}
export default GoogleSignInButton;