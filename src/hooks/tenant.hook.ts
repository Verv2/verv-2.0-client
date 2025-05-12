/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createRentNowTenantInfo,
  createTenantProfile,
} from "@/services/TenantServices";
import { TTenantsList } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTenantProfile = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_PROFILE"],
    mutationFn: async (userData) => await createTenantProfile(userData),
    onSuccess: () => {
      toast.success("Tenant profile is created successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useCreateRentNowTenantInfo = () => {
  return useMutation<any, Error, { data: TTenantsList[] }>({
    mutationKey: ["TENANTS_INFO"],
    mutationFn: async (tenantsList) =>
      await createRentNowTenantInfo(tenantsList),
    onSuccess: () => {
      toast.success("Referred Tenants added Successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
