// api/auth/logout.ts
import { NextResponse } from "next/server";
import { signOut } from 'next-auth/react';

export async function POST(req: Request) {
  try {
    // Sign out the user and remove the session
    await signOut({ redirect: false });

    // Clear the authentication cookies
    return NextResponse.redirect('/auth/signin', { status: 303 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while logging out", success: false },
      { status: 500 }
    );
  }
}
