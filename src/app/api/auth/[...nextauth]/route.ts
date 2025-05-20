/* eslint-disable @typescript-eslint/no-explicit-any */

import envConfig from "@/config/envConfig";
import axiosInstance from "@/lib/AxiosInstance";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: envConfig.googleClientId as string,
      clientSecret: envConfig.googleClientSecret as string,
    }),
  ],

  callbacks: {
    async signIn({ profile, account }: any) {
      try {
        if (!profile || !account) {
          return false;
        }

        if (account?.provider === "google") {
          const response = await axiosInstance.post(
            "/auth/login-social-media",
            {
              email: profile.email,
              profilePhoto: profile.picture,
              provider: "google",
            }
          );

          if (
            response.data.data.accessToken ||
            response.data.data.refreshToken
          ) {
            const cookieStore = await cookies();
            cookieStore.set("accessToken", response.data.data.accessToken);
            cookieStore.set("refreshToken", response.data.data.refreshToken);
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },

  pages: {
    signIn: "/login",
  },
  secret: envConfig.nextAuthSecretKey as string,
});

export { handler as GET, handler as POST };

// segment 2 Part 6
