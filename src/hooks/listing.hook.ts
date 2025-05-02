/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addTemporaryListing,
  createListing,
  getAllListing,
  getSingleListing,
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
      console.log("Temporary Listing Added Successfully!");
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
    refetchOnMount: true, // 🚨 refetch every time component mounts
    refetchOnWindowFocus: false, // optional: disable refetching on focus
    staleTime: 0, // optional: mark data as always stale
  });
};

// export const useGetAllListings = () => {
//   return useQuery({
//     queryKey: ["GET_LISTINGS"],
//     queryFn: async () => await getAllListing(),
//   });
// };

export const useGetAllListings = (queryParams: Record<string, string>) => {
  return useQuery({
    queryKey: ["GET_LISTINGS", queryParams],
    queryFn: async () => await getAllListing(queryParams),
  });
};

export const useGetSingleListing = (listingId: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_LISTING", listingId],
    queryFn: () => getSingleListing(listingId),
  });
};
