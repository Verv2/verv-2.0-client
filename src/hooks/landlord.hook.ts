import { getLandlordById } from "@/services/LandlordServices";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleLandlord = (userId: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_LANDLORD", userId],
    queryFn: () => getLandlordById(userId),
  });
};
