import { Suspense } from "react";
import CompleteProfile from "../../../components/pages/Profile/CompleteProfile/CompleteProfile";
import Loading from "../../../components/UI/Loading/Loading";

const page = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <CompleteProfile />
      </Suspense>
    </>
  );
};

export default page;
