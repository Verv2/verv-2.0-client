/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { AxiosError } from "axios";

export const getLandlordById = async (userId: string): Promise<any> => {
  console.log("From Landlord Service get", userId);
  try {
    const { data } = await axiosInstance.get(`/landlord/${userId}`);

    // revalidateTag("users");
    // console.log(data.data);

    return data.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.log(axiosError.response?.data || axiosError.message);

    throw new Error("Failed to create user");
  }
};
