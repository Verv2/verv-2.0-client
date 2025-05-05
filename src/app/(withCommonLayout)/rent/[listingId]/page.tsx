import StartRentalProcess from "../../components/pages/Rent/StartRentalProcess";

const page = async ({ params }: { params: Promise<{ listingId: string }> }) => {
  const { listingId } = await params;

  return <StartRentalProcess listingId={listingId} />;
};

export default page;
