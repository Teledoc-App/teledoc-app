import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
// export default NextAuth({
//   adapter: PrismaAdapter(db),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!

//     }),

//   ],
//   callbacks: {
//     session({ session, user }) {
//       session.user = user
//       return session
//     }
//   }
// });
