import LandlordProfile from "../../../components/pages/Profile/UserProfile/LandlordProfile";

const page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;
  return (
    <div>
      <h2>This is profile page {userId}</h2>
      <LandlordProfile userId={userId} />
    </div>
  );
};

export default page;
