import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { db } from "./db";
import { compare } from "bcrypt";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    
    // pages: {
    //     signIn: '/login',
    // },
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "gmail", type: "Email", placeholder: "jhon@gmail.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if(!credentials?.email || !credentials?.password ){
                return null;
            }
      
           const existingUser = await db.user.findUnique({
            where:{email: credentials?.email}
           })
           if (!existingUser){
            return null;
           }
           const passwordMatch = await compare(credentials.password, existingUser.password);
           if (!passwordMatch){
            return null;
          }
          return {
            id: `${existingUser.id}`,
            email: existingUser.email,
            firstName: existingUser.role,
            role: existingUser.role
          }
        }
        }),
        GoogleProvider({
            // profile(profile: GoogleProfile) {
            //     //console.log(profile)
            //     return {
            //         ...profile,
            //         role: profile.role ?? "patient", 
            //         id: profile.id.toString(),
            //         image: profile.avatar_url,
            //     }
            // },
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          
        }),
      ],
      callbacks: {
        // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    role: user.role,
                }
            }
            return token;
        },
        // If you want to use the role in client components
        async session({ session,token }) {
            //console.log(token);
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                }
            }
            return session;
        },
    }
}







