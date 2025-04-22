import CompleteTenantProfile from "@/app/(withCommonLayout)/components/pages/Profile/CompleteProfile/CompleteTenantProfile";
import Loading from "@/app/(withCommonLayout)/components/UI/Loading/Loading";
import React, { Suspense } from "react";

const page = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <CompleteTenantProfile />
      </Suspense>
    </>
  );
};

export default page;
