/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { BathIcon, BedIcon, SquareIcon } from "@/assets/icons/icons";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const SingleListCard = ({ property }: { property: any }) => {
  const router = useRouter();

  return (
    <div
      className="w-[384px] rounded-[24px] bg-white shadow-md mb-1 cursor-pointer"
      onClick={() => router.push(`/all-listings/${property.id}`)}
    >
      <div className="w-[384px] rounded-t-[24px] rounded-b-none relative">
        <Image
          src={property.propertyImages[0]}
          alt="property card image"
          width={384}
          height={200}
          className="rounded-t-[24px] rounded-b-none"
        />
        {/* <div className="w-32 h-8 text-white text-xs font-inter font-semibold absolute -bottom-4 -left-2 rounded-lg bg-colorButton flex items-center justify-center gap-1">
          <GroupStar width={16} height={16} />
          <p className="">POPULAR</p>
        </div> */}
      </div>

      <div className="mt-8 px-6 pb-8">
        <div className="flex justify-between items-center">
          <p>
            <span className="text-2xl font-semibold text-colorTextLime leading-[150%]">
              &#163;{property.monthlyRent}
            </span>
            <span className="opacity-50">/month</span>
          </p>
          <div className="p-[10px] rounded-full border border-colorButton">
            <HeartIcon width={20} height={20} stroke={"#449A2B"} />
          </div>
        </div>
        <h2 className="mt-5 text-2xl font-semibold text-colorTextPrimary leading-[150%]">
          {property.town}
        </h2>
        <p className="text-base font-normal text-colorTextSecondary leading-[150%] mt-1">
          {property.address}
        </p>
        <div className="w-[336px] border border-[#EAEDEF] my-2"></div>

        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <BedIcon width={20} height={21} stroke={"#50B533"} />
            <span className="text-sm font-normal text-colorTextSecondary leading-[120%]">
              {property.bedrooms} Beds
            </span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <BathIcon width={20} height={20} fill={"#50B533"} />
            <span className="text-sm font-normal text-colorTextSecondary leading-[120%]">
              {property.bathrooms} Bathrooms
            </span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <SquareIcon width={20} height={21} stroke={"#50B533"} />
            <span className="text-sm font-normal text-colorTextSecondary leading-[120%]">
              {/* {property.features.size.width} x {property.features.size.length} m
              <sup>2</sup> */}
              5 x 7 m<sup>2</sup>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleListCard;
