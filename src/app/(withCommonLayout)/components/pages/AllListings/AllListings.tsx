"use client";

import { useGetAllListings } from "@/hooks/listing.hook";
import SingleListingCard from "./SingleListingCard";
import Loading from "../../UI/Loading/Loading";
import { TGetListing } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { searchParamsToObject } from "@/helpers/searchParamsToObject";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GoogleMaps from "../../UI/Map/GoogleMaps";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LocationIcon,
  SelectBedIcon,
  SelectPriceIcon,
} from "@/assets/icons/icons";
import { toTitleCase } from "@/helpers/toTitleCase";
import { buildQueryString } from "@/helpers/buildQueryString";

const AllListings = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsObject = searchParamsToObject(searchParams);
  const [open, setOpen] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("Search submitted:", data);
    const queryString = buildQueryString(searchParams, data);
    const finalURL = `/all-listings${queryString}`;
    console.log("finalURL", finalURL);
    router.push(finalURL);
  };

  const searchTerm = toTitleCase(searchParams.get("searchTerm"));
  const propertyFor = toTitleCase(searchParams.get("propertyFor"));

  const {
    data: listingData,
    isLoading: listingDataLoading,
    isSuccess: listingDataSuccess,
  } = useGetAllListings(paramsObject);

  // console.log("listingData", listingData?.meta);

  if (listingDataLoading) {
    return <Loading />;
  }

  return (
    listingDataSuccess && (
      <div className="flex flex-col">
        {/* filter */}
        <div className="inline-flex h-[160px] p-[52px_352px] justify-center items-center flex-shrink-0 bg-[#EEF1F3]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full h-[56px] flex justify-between items-center gap-2 rounded-[32px] px-2 border border-solid border-[#CED3D9] bg-white"
          >
            <div className="relative">
              <div className="absolute left-1 top-1/2 -translate-y-1/2">
                <LocationIcon width={18} height={20} />
              </div>
              <Input
                type="text"
                placeholder="e.g. Oxford or NW3"
                {...register("searchTerm")}
                className="pl-8 h-[54px] rounded-l-[32px] border-none"
              />
            </div>
            {/* <div className="relative">
              <div className="absolute left-1 top-1/2 -translate-y-1/2">
                <AreaIcon />
              </div>
              <Input
                type="text"
                placeholder="Select Area"
                {...register("area")}
                className="pl-8 h-[54px] border-none"
              />
            </div> */}
            <div className="relative">
              <div className="absolute left-1 top-1/2 -translate-y-1/2">
                <SelectBedIcon />
              </div>
              <Input
                type="number"
                placeholder="Select Bedrooms"
                {...register("bedrooms", { valueAsNumber: true })}
                className="pl-8 h-[54px] border-none"
              />
            </div>
            <div className="relative">
              <div className="absolute left-1 top-1/2 -translate-y-1/2">
                <SelectPriceIcon />
              </div>
              <Input
                type="number"
                placeholder="Select Price"
                {...register("monthlyRent", { valueAsNumber: true })}
                className="pl-8 h-[54px] border-none"
              />
            </div>
            <Button className="w-[120px] h-[40px] rounded-[32px] bg-colorButton">
              <Search /> Search
            </Button>
          </form>
        </div>
        {/* view properties on map & email alert*/}
        <div className="inline-flex h-[160px] p-[52px_352px] justify-center items-center flex-shrink-0">
          <div className="flex w-[1216px] justify-between items-center">
            {/* view properties on map */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <button className="flex w-[270px] h-[48px] p-[8px] px-[16px] justify-center items-center gap-[8px] flex-shrink-0 rounded-[32px] border-2 border-[#50B533] bg-white">
                  <span className="flex w-[24px] h-[24px] p-[4px] px-[2px] justify-center items-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="18"
                      viewBox="0 0 22 18"
                      fill="none"
                    >
                      <path
                        d="M7 1.02478C5.13272 1.23379 2.85997 2.78189 1.72215 3.64222C1.25538 3.99516 1 4.55187 1 5.13706V14.8065C1 15.6599 2.0279 16.1548 2.73627 15.6788C3.94575 14.866 5.58869 13.9431 7 13.7851M7 1.02478C10.3183 0.653351 11.6817 4.5863 15 4.21487M7 1.02478V13.7851M15 4.21487C16.4113 4.0569 18.0542 3.13397 19.2637 2.32119C19.9721 1.84517 21 2.34007 21 3.19353V12.8629C21 13.4481 20.7446 14.0048 20.2778 14.3578C19.14 15.2181 16.8673 16.7662 15 16.9752M15 4.21487V16.9752M7 13.7851C10.3183 13.4137 11.6817 17.3466 15 16.9752"
                        stroke="#50B533"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </span>
                  <span className="text-[#314660] font-inter text-[14px] font-semibold leading-normal">
                    View Properties on Map
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-[1400px] h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Properties on map</DialogTitle>
                  <DialogDescription>
                    {open && (
                      <GoogleMaps
                        locationMarkers={listingData.data}
                        mapClassName="max-w-[1400px] h-[70vh]"
                        mapZoom={2}
                      />
                    )}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            {/* email alert */}
            <button className="flex w-[220px] h-[48px] p-[8px] px-[16px] justify-center items-center gap-[8px] flex-shrink-0 rounded-[32px] border-2 border-[#50B533] bg-[#F6FFF4]">
              <span className="flex w-[24px] h-[24px] p-[4px] px-[2px] justify-center items-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="18"
                  viewBox="0 0 23 18"
                  fill="none"
                >
                  <path
                    d="M7.5 1.02478C5.63272 1.23379 3.35997 2.78189 2.22215 3.64222C1.75538 3.99516 1.5 4.55187 1.5 5.13706V14.8065C1.5 15.6599 2.5279 16.1548 3.23627 15.6788C4.44575 14.866 6.08869 13.9431 7.5 13.7851M7.5 1.02478C10.8183 0.653351 12.1817 4.5863 15.5 4.21487M7.5 1.02478V13.7851M15.5 4.21487C16.9113 4.0569 18.5542 3.13397 19.7637 2.32119C20.4721 1.84517 21.5 2.34007 21.5 3.19353V12.8629C21.5 13.4481 21.2446 14.0048 20.7778 14.3578C19.64 15.2181 17.3673 16.7662 15.5 16.9752M15.5 4.21487V16.9752M7.5 13.7851C10.8183 13.4137 12.1817 17.3466 15.5 16.9752"
                    stroke="#50B533"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
              <span className="text-[#314660] font-inter text-14px font-semibold leading-normal">
                Create Email Alert
              </span>
            </button>
          </div>
        </div>
        {/* card properties */}
        <div className="inline-flex p-[52px_352px] justify-center items-center flex-shrink-0">
          <div className="flex flex-wrap w-[1216px] flex-col items-center gap-[32px]">
            <div className="flex flex-col items-start gap-[16px]">
              <p className="text-[#314660] font-inter text-[32px] font-semibold leading-[120%]">
                {searchTerm.length > 0 && propertyFor.length > 0
                  ? `Properties To ${propertyFor} In ${searchTerm}`
                  : "All Properties"}
              </p>
              <div className="flex w-[1216px] justify-between items-center">
                <div className="flex items-center gap-[2px]">
                  <p className="text-[#314660] font-inter text-[18px] font-medium leading-normal">
                    {listingData?.meta.total} properties found
                  </p>
                  {/* <div className="flex w-[24px] h-[24px] p-[8px] justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="9"
                      viewBox="0 0 8 9"
                      fill="none"
                    >
                      <path
                        d="M8 4.5C8 6.70914 6.20914 8.5 4 8.5C1.79086 8.5 0 6.70914 0 4.5C0 2.29086 1.79086 0.5 4 0.5C6.20914 0.5 8 2.29086 8 4.5Z"
                        fill="#56677D"
                      />
                    </svg>
                  </div> */}
                  {/* <p className="text-[#314660] font-inter text-[18px] font-normal leading-[150%]">
                    There are 74 new properties since your last visit 3 days
                    ago.
                  </p> */}
                </div>
                <div className="flex items-center gap-0">
                  <button className="flex items-center gap-0">
                    <p className="text-[#314660] font-inter text-[18px] font-medium leading-normal">
                      Sort by
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                    >
                      <path
                        d="M7 10.5L12 14.5L17 10.5"
                        stroke="#314660"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* card */}
            <div className="flex flex-wrap items-start gap-[32px] self-stretch">
              {/* single card */}
              {listingData.data.map((listing: TGetListing) => (
                <div key={listing.id}>
                  <SingleListingCard listing={listing} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AllListings;
