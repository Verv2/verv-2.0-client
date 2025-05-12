/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { TTenantsList } from "@/types";
import { AxiosError } from "axios";

export const createTenantProfile = async (formData: FormData): Promise<any> => {
  console.log("Form Data from TenantService");
  try {
    const { data } = await axiosInstance.post(
      "/tenant/create-tenant-profile",
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

    throw new Error("Failed to create user");
  }
};

export const createRentNowTenantInfo = async (tenantsList: {
  data: TTenantsList[];
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/tenant/rent-now-tenant-info",
      tenantsList
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.log(axiosError.response?.data || axiosError.message);

    throw new Error("Failed to add Tenants");
  }
};
