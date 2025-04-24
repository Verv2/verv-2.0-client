import { searchListing } from "@/services/Search";
import { TSearchListing } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useSearchListing = () => {
  return useMutation({
    mutationKey: ["SEARCH_LISTING"],
    mutationFn: async (searchTerm: TSearchListing) =>
      await searchListing(searchTerm),
  });
};
