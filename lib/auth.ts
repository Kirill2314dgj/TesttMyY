import { PrismaAdapter } from "@auth/prisma-adapter"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/db" // Updated import

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id

        // Get username from database
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { username: true },
        })

        session.user.username = dbUser?.username
      }
      return session
    },
  },
  pages: {
    signIn: "/signin",
  },
}

