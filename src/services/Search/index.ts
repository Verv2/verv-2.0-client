"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { TSearchListing } from "@/types";

// import axiosInstance from "@/lib/AxiosInstance";

// listings?searchTerm=london&propertyFor=RENT
export const searchListing = async (searchData: TSearchListing) => {
  console.log("from search service");
  const searchTerm = searchData.searchTerm;
  const propertyFor = searchData.propertyFor.toUpperCase();

  console.log("searchTerm", searchTerm);
  console.log("propertyFor", propertyFor);
  try {
    const res = await axiosInstance.get(
      `/listings?searchTerm=${searchTerm}&propertyFor=${propertyFor}`
    );

    return res.data;
  } catch (error) {
    console.log("Error searching items:", error);
    throw new Error("Failed to search items");
  }
};
