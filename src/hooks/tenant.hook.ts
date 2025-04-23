/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTenantProfile } from "@/services/TenantServices";
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
