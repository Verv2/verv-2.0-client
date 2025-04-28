import { Suspense } from "react";
import AllListings from "../components/pages/AllListings/AllListings";
import AreLandlord from "../components/Shared/AreLandlord";
import Loading from "../components/UI/Loading/Loading";

// interface PageProps {
//   searchParams?: { [key: string]: string | string[] | undefined };
// }

const page = () => {
  // console.log("searchParams", searchParams);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <AllListings />
      </Suspense>
      <AreLandlord />
    </>
  );
};

export default page;
