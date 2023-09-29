"use client";

import User from "@/components/User";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("./login");
  }, []);

  return (
    <div>
      {/* <h1>Home</h1>
    <Link href='/admin'>Open My Admin</Link>
    <h2>CLient Session</h2>
    <User />
    <h2>Server Session</h2>
    {JSON.stringify(session)} */}
    </div>
  );
}
