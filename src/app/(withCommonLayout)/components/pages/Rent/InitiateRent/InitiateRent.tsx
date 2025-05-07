"use client";

import { useGetSingleListing } from "@/hooks/listing.hook";
import InitiateRentTab from "../../../Shared/Tabs/InitiateRentTab";
import Loading from "../../../UI/Loading/Loading";
import SingleImageCarousel from "./SingleImageCarousel";
import PaymentDetails from "./PaymentDetails";

const InitiateRent = ({ listingId }: { listingId: string }) => {
  const {
    data: data,
    isLoading: dataLoading,
    isSuccess: dataSuccess,
  } = useGetSingleListing(listingId);

  console.log(data);

  if (dataLoading) {
    return <Loading />;
  }
  return (
    dataSuccess && (
      <section className="w-[390] lg:w-[1216px] px-5 lg:px-0 m-auto mt-14">
        <InitiateRentTab isInitiate={true} />
        <div className="mt-10 space-y-4">
          <h2 className="text-[28px] lg:text-[32px] text-center lg:text-left font-semibold leading-[120%] text-colorTextPrimary">
            Review and commit to rental agreement
          </h2>
          <p className="text-lg leading-[150%] text-colorTextSecondary">
            Prior to commencing rent now, Verv always recommends viewing the
            property first. If you haven&apos;t viewed the property yet we urge
            you to do so first before continuing. You can{" "}
            <span className="underline text-colorButton">
              request a viewing here.
            </span>
          </p>
        </div>
        {/* property details */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold leading-[120%] text-[#7D8A9B]">
            Property Details
          </h3>
          <div className="flex flex-col justify-center items-start gap-5 lg:gap-6 self-stretch p-[18.5px] lg:p-6 mt-5 rounded-[16px] bg-[#FCFCFC] shadow-[0px_1px_4px_0px_rgba(16,24,40,0.10),0px_1px_4px_0px_rgba(16,24,40,0.06)]">
            <h3 className="text-xl lg:text-2xl font-semibold leading-[120%] text-colorTextPrimary">
              {data.bedrooms} bed, {data.bathrooms} bath house
            </h3>
            <SingleImageCarousel images={data.propertyImages} />
          </div>
        </div>

        {/* payment details */}
        <PaymentDetails />
      </section>
    )
  );
};

export default InitiateRent;
