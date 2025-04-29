import LandlordProfile from "@/app/(withCommonLayout)/components/pages/Profile/UserProfile/Landlord/LandlordProfile";

const page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;
  return (
    <div>
      <LandlordProfile userId={userId} />
    </div>
  );
};

export default page;
