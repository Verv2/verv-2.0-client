/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { AxiosError } from "axios";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/user/register-user", userData);

    revalidateTag("users");

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    const errorMessage =
      (axiosError.response?.data as { message?: string })?.message ||
      axiosError.message;
    throw new Error(errorMessage);
  }
};

export const createUserProfile = async (formData: FormData): Promise<any> => {
  console.log("Form Data from UserService");
  try {
    const { data } = await axiosInstance.post(
      "/landlord/create-landlord-profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.log(axiosError.response?.data || axiosError.message);

    const errorMessage =
      (axiosError.response?.data as { message?: string })?.message ||
      axiosError.message;

    throw new Error(errorMessage);
  }
};

// export const getUser = async (id: string): Promise<any> => {
//   console.log("From User Service get", id);
//   try {
//     const { data } = await axiosInstance.get(`/user/${id}`);

//     return data.data;
//   } catch (error) {
//     const axiosError = error as AxiosError;

//     console.log(axiosError.response?.data || axiosError.message);

//     throw new Error("Failed to create user");
//   }
// };

export const getUser = async (): Promise<any> => {
  console.log("From User Service get");
  try {
    const { data } = await axiosInstance.get("user/me");

    return data.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.log(axiosError.response?.data || axiosError.message);
    const errorMessage =
      (axiosError.response?.data as { message?: string })?.message ||
      axiosError.message;

    throw new Error(errorMessage);
  }
};
