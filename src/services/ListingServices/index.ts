/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { TPaymentSuccess } from "@/types";
import { AxiosError } from "axios";

export const addTemporaryListing = async (formData: FormData): Promise<any> => {
  console.log("Form Data from ListingServices");
  try {
    const { data } = await axiosInstance.post(
      "/listings/create-temporary-listing",
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

    throw new Error("Failed to Temporary listing");
  }
};

export const createListing = async (
  listingData: TPaymentSuccess
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/listings/create-listing",
      listingData
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.log(axiosError.response?.data || axiosError.message);

    throw new Error("Failed to create Listing");
  }
};

export const getTemporaryListing = async () => {
  try {
    const { data } = await axiosInstance.get("listings/get-temporary-listing");

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
