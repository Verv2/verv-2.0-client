import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TGetListing } from "@/types";

const SingleListingCard = ({ listing }: { listing: TGetListing }) => {
  console.log("single listing", listing);
  return (
    <div className="flex w-[384px] h-[549px] flex-col justify-center items-center gap-[32px] rounded-[24px] bg-white shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]">
      <Image
        src={listing.propertyImages[0]}
        alt="property"
        height={200}
        width={384}
        className="w-[384px] h-[200px] flex-shrink-0 rounded-[24px] rounded-b-none"
      />

      <div className="flex w-[336px] flex-col items-start gap-[24px]">
        <div className="flex flex-col items-start gap-[16px] self-stretch">
          <div className="flex flex-col items-start gap-[16px] self-stretch">
            {/* price */}

            <div className="flex items-baseline gap-[2px]">
              <p className="text-[#449A2B] font-inter text-[24px] font-semibold leading-[120%]">
                £{listing.monthlyRent}
              </p>
              <p className="text-[#000929] font-inter text-[16px] font-normal leading-[150%] opacity-50">
                /month
              </p>
            </div>
            <div className="flex flex-col items-start gap-[8px] self-stretch">
              <p className="w-[336px] text-[#314660] font-inter text-[24px] font-semibold leading-[120%]">
                {listing.town}
              </p>
              <p className="self-stretch text-[#56677D] font-inter text-[16px] font-normal leading-[150%]">
                {listing.address}
              </p>
              <div className="flex items-center gap-[4px]">
                <div className="flex w-[20px] h-[20px] p-[1.667px] px-[2.5px] justify-center items-center">
                  <div className="w-[15px] h-[16.667px] flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="18"
                      viewBox="0 0 16 18"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 17.3333C10.8125 17.3333 15.5 12.165 15.5 8.07403C15.5 3.98304 12.1421 0.666626 8 0.666626C3.85786 0.666626 0.5 3.98304 0.5 8.07403C0.5 12.165 5.1875 17.3333 8 17.3333ZM8 10.6667C9.38071 10.6667 10.5 9.54738 10.5 8.16667C10.5 6.78595 9.38071 5.66667 8 5.66667C6.61929 5.66667 5.5 6.78595 5.5 8.16667C5.5 9.54738 6.61929 10.6667 8 10.6667Z"
                        fill="#449A2B"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-baseline gap-[4px]">
                  <button className="text-[#449A2B] font-inter text-[18px] font-semibold leading-normal">
                    0.23
                  </button>
                  <p className="text-[#000929] font-inter text-[16px] font-normal leading-[150%] opacity-50">
                    miles
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* line */}
          <div className="w-[336px] h-[1.5px] bg-[#EEF1F3]"></div>
          {/* facilities */}
          <div className="flex justify-between items-start self-stretch">
            {/* beds */}
            <div className="flex justify-center items-center gap-[8px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M17.4993 9.48317V7.1665C17.4993 5.7915 16.3743 4.6665 14.9993 4.6665H11.666C11.0243 4.6665 10.441 4.9165 9.99935 5.3165C9.55768 4.9165 8.97435 4.6665 8.33268 4.6665H4.99935C3.62435 4.6665 2.49935 5.7915 2.49935 7.1665V9.48317C1.99102 9.9415 1.66602 10.5998 1.66602 11.3332V16.3332H3.33268V14.6665H16.666V16.3332H18.3327V11.3332C18.3327 10.5998 18.0077 9.9415 17.4993 9.48317ZM11.666 6.33317H14.9993C15.4577 6.33317 15.8327 6.70817 15.8327 7.1665V8.83317H10.8327V7.1665C10.8327 6.70817 11.2077 6.33317 11.666 6.33317ZM4.16602 7.1665C4.16602 6.70817 4.54102 6.33317 4.99935 6.33317H8.33268C8.79102 6.33317 9.16602 6.70817 9.16602 7.1665V8.83317H4.16602V7.1665ZM3.33268 12.9998V11.3332C3.33268 10.8748 3.70768 10.4998 4.16602 10.4998H15.8327C16.291 10.4998 16.666 10.8748 16.666 11.3332V12.9998H3.33268Z"
                  fill="#50B533"
                />
              </svg>
              <p className="text-[#56677D] font-inter text-[14px] font-normal leading-[150%]">
                {listing.bedrooms} Beds
              </p>
            </div>
            {/* bathrooms */}
            <div className="flex items-start gap-[8px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M17.4993 8.33333H5.83268V5.83333C5.83268 4.91417 6.58018 4.16667 7.49935 4.16667C8.41852 4.16667 9.16602 4.91417 9.16602 5.83333H10.8327C10.8327 3.995 9.33768 2.5 7.49935 2.5C5.66102 2.5 4.16602 3.995 4.16602 5.83333V8.33333H2.49935C2.27834 8.33333 2.06637 8.42113 1.91009 8.57741C1.75381 8.73369 1.66602 8.94565 1.66602 9.16667V10.8333C1.66602 13.005 3.06102 14.8525 4.99935 15.5417V18.3333H6.66602V15.8333H13.3327V18.3333H14.9993V15.5417C16.9377 14.8525 18.3327 13.005 18.3327 10.8333V9.16667C18.3327 8.94565 18.2449 8.73369 18.0886 8.57741C17.9323 8.42113 17.7204 8.33333 17.4993 8.33333ZM16.666 10.8333C16.666 12.6717 15.171 14.1667 13.3327 14.1667H6.66602C4.82768 14.1667 3.33268 12.6717 3.33268 10.8333V10H16.666V10.8333Z"
                  fill="#50B533"
                />
              </svg>
              <p className="text-[#56677D] font-inter text-[14px] font-normal leading-[150%]">
                {listing.bathrooms} Bathrooms
              </p>
            </div>
            {/* dimension */}
            <div className="flex justify-center items-center gap-[8px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <g clipPath="url(#clip0_1131_976)">
                  <path
                    d="M8.83148 16.0437L3.45631 10.6685C2.8479 10.0601 2.8479 8.93989 3.45631 8.33148L8.83148 2.95631C9.43989 2.3479 10.5601 2.3479 11.1685 2.95631L16.5437 8.33148C17.1521 8.93989 17.1521 10.0601 16.5437 10.6685L11.1685 16.0437C10.5601 16.6521 9.43989 16.6521 8.83148 16.0437V16.0437Z"
                    stroke="#50B533"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 13.6714L6.36371 18.0351"
                    stroke="#50B533"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.6367 18.0351L18.0004 13.6714"
                    stroke="#50B533"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1131_976">
                    <rect
                      width="20"
                      height="20"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <p className="text-[#56677D] font-inter text-[14px] font-normal leading-[150%]">
                5x7 m²
              </p>
            </div>
          </div>
        </div>
        <p className="text-[#56677D] font-inter text-[12px] font-semibold leading-[120%]">
          Last updated 1 week ago
        </p>
      </div>

      <Link href={`/all-listings/${listing.id}`}>
        <Button className="flex w-[384px] h-[56px] p-[8px] px-[16px]  justify-center items-center gap-[8px] flex-shrink-0 rounded-b-[24px] bg-[#50B533]">
          <span className="text-[#FFF] font-inter text-[18px] font-semibold leading-normal">
            View Details
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            <path
              d="M10.5003 6.66663L13.8337 9.99993M13.8337 9.99993L10.5003 13.3333M13.8337 9.99993H2.16699"
              stroke="white"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 15.2045C9.14133 16.1194 10.5901 16.6667 12.1667 16.6667C15.8486 16.6667 18.8333 13.6819 18.8333 10C18.8333 6.31814 15.8486 3.33337 12.1667 3.33337C10.5901 3.33337 9.14133 3.88064 8 4.79556"
              stroke="white"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>
        </Button>
      </Link>
    </div>
  );
};

export default SingleListingCard;
