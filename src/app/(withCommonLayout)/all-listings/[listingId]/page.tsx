// import { useGetSingleListing } from "@/hooks/listing.hook";

import SingleListingPage from "../../components/pages/AllListings/SingleListingPage";

const page = async ({ params }: { params: Promise<{ listingId: string }> }) => {
  const { listingId } = await params;

  console.log("params: ", listingId);

  return (
    <div>
      <h2>The property id: {listingId}</h2>
      <SingleListingPage listingId={listingId} />
    </div>
  );
};

export default page;
