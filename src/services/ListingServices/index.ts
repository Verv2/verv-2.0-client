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
  console.log("Temporary Listing Data from ListingServices");
  try {
    const { data } = await axiosInstance.get("listings/get-temporary-listing");

    console.log("Temporary Listing Data from ListingServices", data);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// export const getAllListing = async () => {
//   try {
//     const { data } = await axiosInstance.get("/listings");

//     return data.data;
//   } catch (error) {
//     const axiosError = error as AxiosError;

//     console.log(axiosError.response?.data || axiosError.message);

//     throw new Error("Failed to fetch the data");
//   }
// };

export const getAllListing = async (queryParams: Record<string, string>) => {
  console.log("queryParams", queryParams);
  try {
    const { data } = await axiosInstance.get("/listings", {
      params: queryParams,
    });

    return data.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.log(axiosError.response?.data || axiosError.message);

    throw new Error("Failed to fetch the data");
  }
};

export const getSingleListing = async (listingId: string) => {
  try {
    const { data } = await axiosInstance.get(`/listings/${listingId}`);

    return data.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.log(axiosError.response?.data || axiosError.message);

    throw new Error("Failed to fetch the data");
  }
};
