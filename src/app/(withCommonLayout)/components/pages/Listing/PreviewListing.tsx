"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  TFeatures,
  TListingData,
  TTenancyDetails,
  TTenantPreferences,
} from "@/types";
import { useGetTemporaryListing } from "@/hooks/listing.hook";
import ListingTab from "../../Shared/Tabs/ListingTab";
import SingleListing from "../SingleListing/SingleListing";
import Loading from "../../UI/Loading/Loading";

const PreviewListing = () => {
  const router = useRouter();
  const [listingData, setListingData] = useState<TListingData>();

  const {
    data: temporaryListingData,
    isLoading: temporaryListingLoading,
    isSuccess: temporaryListingSuccess,
  } = useGetTemporaryListing();

  //   console.log("temporaryListingLoading", temporaryListingLoading);
  //   console.log("temporaryListingSuccess", temporaryListingSuccess);

  //   console.log("Temporary Listing Data from PreviewListing", listingData);

  useEffect(() => {
    if (
      temporaryListingSuccess &&
      temporaryListingData?.data &&
      temporaryListingData.data.data.data
    ) {
      const temp = temporaryListingData?.data.data.data;

      const listing: TListingData = {
        propertyOption: temp.propertyOption ?? "",
        address: temp.propertyDetails.address ?? "",
        address2: temp.propertyDetails?.address2 ?? "",
        town: temp.propertyDetails?.town ?? "",
        bathrooms: temp.propertyDetails?.bathrooms ?? 0,
        bedrooms: temp.propertyDetails?.bedrooms ?? 0,
        description: temp.propertyDetails?.description ?? "",
        furnishingOptions: temp.propertyDetails?.furnishingOptions ?? "",
        houseNumber: temp.propertyDetails?.houseNumber ?? "",
        postcode: temp.propertyDetails?.postcode ?? "",
        latitude: temp.propertyDetails?.latitude ?? 0,
        longitude: temp.propertyDetails?.longitude ?? 0,
        propertyType: temp.propertyDetails?.propertyType ?? "",
        propertyImages: temporaryListingData?.data.data.propertyImages ?? [],
        remoteVideoViewing: temp.remoteVideoViewing ?? false,
        youtubeUrl: temp.youtubeUrl ?? "",
        termsAgreed: temp.termsAgreed ?? false,
        features: temp.features ?? ({} as TFeatures),
        tenancyDetails: temp.tenancyDetails ?? ({} as TTenancyDetails),
        tenantPreferences: temp.tenantPreferences ?? ({} as TTenantPreferences),
      };

      setListingData(listing);
    }
  }, [temporaryListingSuccess, temporaryListingData]);

  if (temporaryListingLoading) {
    return <Loading />;
  }

  const handleClick = () => {
    router.push("publish-listing");
  };

  if (temporaryListingLoading) {
    return <Loading />;
  }

  return (
    <section>
      <ListingTab isPreview={true} />
      <div className="w-[1216px] m-auto flex items-center justify-center py-10 mt-14 mb-10 shadow-custom">
        <div className="flex flex-col items-center gap-6 shrink-0">
          <h2 className="text-2xl text-colorTextSecondary font-semibold leading-[120%]">
            Publish Listing
          </h2>
          <p className="text-lg text-colorTextPrimary font-semibold">
            To publish this property onto Verv, click the button below:
          </p>
          <Button
            className="bg-colorButton px-8 py-5 font-semibold"
            onClick={handleClick}
          >
            Save & Continue
          </Button>
          <p className="text-lg text-colorTextSecondary font-medium italic">
            You can still make changes after publishing
          </p>
        </div>
      </div>

      {listingData && <SingleListing listingData={listingData} />}
    </section>
  );
};

export default PreviewListing;
