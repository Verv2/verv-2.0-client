// import { useGetSingleListing } from "@/hooks/listing.hook";

import SingleListingPage from "../../components/pages/AllListings/SingleListingPage";

const page = async ({ params }: { params: Promise<{ listingId: string }> }) => {
  const { listingId } = await params;

  return (
    <div>
      <SingleListingPage listingId={listingId} />
    </div>
  );
};

export default page;
