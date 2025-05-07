import InitiateRent from "@/app/(withCommonLayout)/components/pages/Rent/InitiateRent/InitiateRent";

const page = async ({ params }: { params: Promise<{ listingId: string }> }) => {
  const { listingId } = await params;

  return <InitiateRent listingId={listingId} />;
};

export default page;
