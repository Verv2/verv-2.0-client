"use client";

import { useGetAllListings } from "@/hooks/listing.hook";
import SingleListingCard from "./SingleListingCard";
import Loading from "../../UI/Loading/Loading";
import { TGetListing } from "@/types";

const AllListings = () => {
  const {
    data: listingData,
    isLoading: listingDataLoading,
    isSuccess: listingDataSuccess,
  } = useGetAllListings();

  // console.log("listing data", listingData);

  if (listingDataLoading) {
    return <Loading />;
  }

  return (
    listingDataSuccess && (
      <div className="flex flex-col">
        {/* filter */}
        <div className="inline-flex h-[160px] p-[52px_352px] justify-center items-center flex-shrink-0 bg-[#EEF1F3]">
          <div className="flex items-center gap-6">
            <div className="flex w-[972px] h-[56px] px-[8px] pl-[16px] justify-between items-center rounded-[32px] border border-[#CED3D9] bg-[#FFF]">
              <div className="flex justify-between items-center gap-[5px]">
                <div className="flex items-center">
                  <div className="flex w-[24px] h-[24px] px-[3px] py-[2px] justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9 20C12.375 20 18 13.7981 18 8.88889C18 3.97969 13.9706 0 9 0C4.02944 0 0 3.97969 0 8.88889C0 13.7981 5.625 20 9 20ZM9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6C7.34315 6 6 7.34315 6 9C6 10.6569 7.34315 12 9 12Z"
                        fill="#50B533"
                      />
                    </svg>
                  </div>
                  <input
                    className="flex text-[#7D8A9B] font-inter text-[18px] font-normal leading-[27px] w-[178px]"
                    placeholder="e.g. Oxford or NW3"
                  />
                </div>
                <div className="w-[1.206px] h-[24px] opacity-30 bg-[#314660]"></div>
                <div className="flex items-center px-[5px]">
                  <div className="flex w-[24px] h-[24px] px-[3px] py-[2px] justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.4998 0H9.49985C8.94757 0 8.49985 0.447716 8.49985 1V1.5H11.4998V1C11.4998 0.447715 11.0521 0 10.4998 0ZM9.49985 20H10.4998C11.0521 20 11.4998 19.5523 11.4998 19V18.5H8.49985V19C8.49985 19.5523 8.94757 20 9.49985 20ZM11.4998 9.5V10.5H8.49985V9.5H11.4998ZM14.9998 8.5H3.41406C3.14885 8.5 2.89449 8.39464 2.70696 8.20711L0.706955 6.20711C0.316431 5.81658 0.316432 5.18342 0.706956 4.79289L2.70696 2.79289C2.89449 2.60536 3.14885 2.5 3.41406 2.5H14.9998C15.5521 2.5 15.9998 2.94772 15.9998 3.5V7.5C15.9998 8.05228 15.5521 8.5 14.9998 8.5ZM4.99985 11.5H16.5856C16.8509 11.5 17.1052 11.6054 17.2927 11.7929L19.2927 13.7929C19.6833 14.1834 19.6833 14.8166 19.2927 15.2071L17.2927 17.2071C17.1052 17.3946 16.8509 17.5 16.5856 17.5H4.99985C4.44757 17.5 3.99985 17.0523 3.99985 16.5V12.5C3.99985 11.9477 4.44756 11.5 4.99985 11.5Z"
                        fill="#50B533"
                      />
                    </svg>
                  </div>
                  <input
                    className="flex text-[#7D8A9B] font-inter text-[18px] font-normal leading-[27px] w-[110.8px]"
                    placeholder="Select Area"
                  />
                </div>
                <div className="w-[1.206px] h-[24px] opacity-30 bg-[#314660]"></div>
                <div className="flex items-center px-[5px]">
                  <div className="flex w-[24px] h-[24px] px-[3px] py-[2px] justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="15"
                      viewBox="0 0 21 15"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.75 0C1.16421 0 1.5 0.335786 1.5 0.75V5.75H3.75V3.75C3.75 3.19772 4.19772 2.75 4.75 2.75H7.75C8.30228 2.75 8.75 3.19772 8.75 3.75V5.75H18.75C19.8546 5.75 20.75 6.64543 20.75 7.75V9.75V13.75C20.75 14.1642 20.4142 14.5 20 14.5C19.5858 14.5 19.25 14.1642 19.25 13.75V10.5H1.5V13.75C1.5 14.1642 1.16421 14.5 0.75 14.5C0.335786 14.5 0 14.1642 0 13.75V0.75C0 0.335786 0.335786 0 0.75 0Z"
                        fill="#50B533"
                      />
                    </svg>
                  </div>
                  <input
                    className="flex text-[#7D8A9B] font-inter text-[18px] font-normal leading-[27px] w-[156.2px]"
                    placeholder="Select Bedrooms"
                  />
                </div>
                <div className="w-[1.206px] h-[24px] opacity-30 bg-[#314660]"></div>
                <div className="flex items-center px-[5px]">
                  <div className="flex w-[24px] h-[24px] px-[3px] py-[2px] justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM6.25 10C6.25 9.58579 6.58579 9.25 7 9.25H8.32342C8.42722 8.82913 8.48077 8.39442 8.48077 7.95476V7.38462C8.48077 6.2057 9.43647 5.25 10.6154 5.25C11.7943 5.25 12.75 6.2057 12.75 7.38461V7.88235C12.75 8.29657 12.4142 8.63235 12 8.63235C11.5858 8.63235 11.25 8.29657 11.25 7.88235V7.38461C11.25 7.03413 10.9659 6.75 10.6154 6.75C10.2649 6.75 9.98077 7.03413 9.98077 7.38462V7.95476C9.98077 8.39213 9.93928 8.82567 9.85829 9.25H11C11.4142 9.25 11.75 9.58579 11.75 10C11.75 10.4142 11.4142 10.75 11 10.75H9.3901C9.11892 11.363 8.75797 11.9379 8.31474 12.4544C8.04656 12.7669 8.2686 13.25 8.68041 13.25H12C12.4142 13.25 12.75 13.5858 12.75 14C12.75 14.4142 12.4142 14.75 12 14.75H8.68041C6.98665 14.75 6.0734 12.7628 7.17644 11.4775C7.3728 11.2487 7.54854 11.0052 7.70258 10.75H7C6.58579 10.75 6.25 10.4142 6.25 10Z"
                        fill="#50B533"
                      />
                    </svg>
                  </div>
                  <input
                    className="flex text-[#7D8A9B] font-inter text-[18px] font-normal leading-[27px] w-[114px]"
                    placeholder="Select Price"
                  />
                </div>
              </div>
              <div className="flex w-[120px] h-[40px] p-[8px] px-[16px] justify-center items-center gap-[8px] flex-shrink-0 rounded-[32px] bg-[#50B533]">
                <button className="flex justify-center items-center gap-[3px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M18.3337 18.3333L16.667 16.6666M1.66699 9.58329C1.66699 5.21104 5.2114 1.66663 9.58366 1.66663C13.9559 1.66663 17.5003 5.21104 17.5003 9.58329C17.5003 13.9555 13.9559 17.5 9.58366 17.5C5.2114 17.5 1.66699 13.9555 1.66699 9.58329Z"
                      stroke="white"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-white font-inter text-[14px] font-semibold leading-none">
                    Search
                  </p>
                </button>
              </div>
            </div>

            <div className="flex w-[220px] h-[56px] px-[16px] py-[8px] justify-center items-center gap-[8px] rounded-[32px] bg-[#FFF]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 5H10M10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5M3 12H12M19 12H21M19 12C19 13.1046 18.1046 14 17 14C15.8954 14 15 13.1046 15 12C15 10.8954 15.8954 10 17 10C18.1046 10 19 10.8954 19 12ZM14 5H21M12 19H21M3 19H5M5 19C5 20.1046 5.89543 21 7 21C8.10457 21 9 20.1046 9 19C9 17.8954 8.10457 17 7 17C5.89543 17 5 17.8954 5 19Z"
                  stroke="#314660"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <p className="text-[#314660] font-inter text-[18px] font-medium leading-normal">
                Advanced Filter
              </p>
            </div>
          </div>
        </div>
        {/* view properties on map & email alert*/}
        <div className="inline-flex h-[160px] p-[52px_352px] justify-center items-center flex-shrink-0">
          <div className="flex w-[1216px] justify-between items-center">
            {/* view properties on map */}
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
                Properties To Rent In Birmingham, West Midlands
              </p>
              <div className="flex w-[1216px] justify-between items-center">
                <div className="flex items-center gap-[2px]">
                  <p className="text-[#314660] font-inter text-[18px] font-medium leading-normal">
                    907 properties found
                  </p>
                  <div className="flex w-[24px] h-[24px] p-[8px] justify-center items-center">
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
                  </div>
                  <p className="text-[#314660] font-inter text-[18px] font-normal leading-[150%]">
                    There are 74 new properties since your last visit 3 days
                    ago.
                  </p>
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
              {listingData.map((listing: TGetListing) => (
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
