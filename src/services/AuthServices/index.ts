"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { getUser } from "../UserServices";

export const loginUser = async (userData: FieldValues) => {
  console.log("Base API from AuthService:", process.env.NEXT_PUBLIC_BASE_API);
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", data?.data?.accessToken);
      cookieStore.set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.log(axiosError.response?.data || axiosError.message);

    throw new Error("Failed to login user");
  }
};

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    // const userData = getUser(decodedToken.userId);
    const userData = getUser();

    return userData;

    // {
    //   id: decodedToken.userId,
    //   email: decodedToken.email,
    //   role: decodedToken.role,
    // };
  }

  return decodedToken;
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};
