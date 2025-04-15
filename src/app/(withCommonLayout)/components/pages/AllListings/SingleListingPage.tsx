"use client";

import { useGetSingleListing } from "@/hooks/listing.hook";

const SingleListingPage = ({ listingId }: { listingId: string }) => {
  const {
    data: data,
    isLoading: dataLoading,
    isSuccess: dataSuccess,
  } = useGetSingleListing(listingId);

  console.log("Single Listing", data);
  return (
    <div>
      <h2>Single Listing Component: {listingId}</h2>
    </div>
  );
};

export default SingleListingPage;
