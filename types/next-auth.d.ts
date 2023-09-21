import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface User {
        id: string
        role: string | null
    }
    interface Session {
        user: User & {
            id: string
            role: string
        }
        token: {
            id: string
            role: string
        }
    }
}