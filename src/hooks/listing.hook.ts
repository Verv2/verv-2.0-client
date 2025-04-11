/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addTemporaryListing,
  createListing,
  getTemporaryListing,
} from "@/services/ListingServices";
import { TPaymentSuccess } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddTemporaryListing = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["ADD_TEMPORARY_LISTING"],
    mutationFn: async (temporaryData) =>
      await addTemporaryListing(temporaryData),
    onSuccess: () => {
      toast.success("Temporary Listing Added Successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useCreateListing = () => {
  return useMutation<any, Error, TPaymentSuccess>({
    mutationKey: ["CREATE_LISTING"],
    mutationFn: async (listingData) => await createListing(listingData),
    onSuccess: () => {
      toast.success("Listing Created Successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetTemporaryListing = () => {
  return useQuery({
    queryKey: ["GET_TEMPORARY_LISTING"],
    queryFn: async () => await getTemporaryListing(),
  });
};
