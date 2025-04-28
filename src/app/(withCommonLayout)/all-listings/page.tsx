import AllListings from "../components/pages/AllListings/AllListings";
import AreLandlord from "../components/Shared/AreLandlord";

// interface PageProps {
//   searchParams?: { [key: string]: string | string[] | undefined };
// }

const page = () => {
  // console.log("searchParams", searchParams);
  return (
    <>
      <AllListings />
      <AreLandlord />
    </>
  );
};

export default page;
