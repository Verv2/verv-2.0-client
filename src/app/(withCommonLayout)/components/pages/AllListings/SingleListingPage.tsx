"use client";

import {
  BathIcon,
  BedIcon,
  CalendarIcon,
  CheckCircle,
  FacebookShare,
  HomeFill,
  InstagramShare,
  LinkedinShare,
  LocationIcon,
  ReportIcon,
  SquareIcon,
  StarFill,
  TweeterShare,
  WhatsappShare,
  YouTubeShare,
} from "@/assets/icons/icons";
import { useGetSingleListing } from "@/hooks/listing.hook";
import VerticalCarousel from "../SingleListing/VerticalCarousel";
import Loading from "../../UI/Loading/Loading";
import { Button } from "@/components/ui/button";
import ItemChecked from "../../UI/ItemChecked/ItemChecked";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GoogleMaps from "../../UI/Map/GoogleMaps";
import { useRouter } from "next/navigation";

const SingleListingPage = ({ listingId }: { listingId: string }) => {
  const router = useRouter();

  const {
    data: data,
    isLoading: dataLoading,
    isSuccess: dataSuccess,
  } = useGetSingleListing(listingId);

  if (dataLoading) {
    return <Loading />;
  }

  console.log("Single Listing", data);

  return (
    dataSuccess && (
      <div>
        <section className="h-[973px] bg-[#EEF1F3] py-14">
          <div className="w-[1216px] h-[786px] m-auto">
            {/* basic property information */}
            <div className="mb-6">
              <p className="text-colorTextSecondary text-lg font-medium mb-6">
                Home / {data.town} / Houses / {data.address}
              </p>
              <div className="flex items-center gap-4">
                <h1 className="text-colorTextPrimary text-[32px] font-semibold leading-[120%]">
                  {data.bedrooms} Bed, {data.bathrooms} Bath house{" "}
                </h1>
                <p className="text-colorTextPrimary text-sm font-semibold leading-[120%] w-[160px] px-[20.5px] py-[7.5px] rounded-[32px] bg-[#B4DFA7]">
                  {data.bedrooms} rooms available
                </p>
              </div>
              {/*  */}
              <div className="flex flex-col gap-2 mt-6">
                <div className="flex gap-8 h-[27px]">
                  <div className="flex items-center gap-2">
                    <LocationIcon width={18} height={20} />
                    <p className="text-lg leading-[150%] text-colorTextSecondary">
                      {data.address}, {data.town}, {data.postcode}{" "}
                      <span className="font-semibold text-colorButton">
                        Show on map
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarIcon width={18} height={20} fill="#50B533" />
                    <p className="text-lg leading-[150%] text-colorTextSecondary">
                      Property Reference:{" "}
                      <span className="font-semibold">{data.id}</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-8 h-[27px]">
                  <div className="flex items-center gap-2">
                    <CalendarIcon width={18} height={20} fill="#50B533" />
                    <p className="text-lg leading-[150%] text-colorTextSecondary">
                      Available from:{" "}
                      <span className="font-semibold ">{data.moveInDate}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <HomeFill width={24} height={24} fill="#50B533" />
                    <p className="text-lg leading-[150%] text-colorTextSecondary">
                      Letting agent
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* carousel */}
            <VerticalCarousel imageUrls={data.propertyImages} />

            {/* share property */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-6">
                <p>Share Property</p>
                <div className="flex items-center gap-4">
                  <FacebookShare width={40} height={40} fill="#1877F2" />
                  <TweeterShare width={40} height={40} fill="#1DA1F2" />
                  <LinkedinShare width={40} height={40} fill="#2867B2" />
                  <YouTubeShare width={40} height={40} fill="#FF0000" />
                  <InstagramShare width={40} height={40} fill="#F00073" />
                  <WhatsappShare width={40} height={40} fill="#25D366" />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <ReportIcon width={16} height={14} fill="#56677D" />
                <p className="text-colorTextSecondary leading-[150%]">
                  Report Listing
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* payment cards */}
        <section className="w-[1216px] h-[182px] m-auto py-6 px-[35px] bg-white rounded-[24px] shadow-[0px_4px_20px_rgba(0,0,0,0.10)] -mt-[91px]">
          <div className="flex justify-center items-center gap-10">
            {/* amount */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-6">
                {/* per month */}
                <div className="flex flex-col items-center -gap-1">
                  <h2 className="text-colorButton text-5xl font-bold leading-[120%]">
                    &#163;{data.monthlyRent}
                  </h2>
                  <p className="text-lg text-colorTextSecondary leading-[150%]">
                    per month
                  </p>
                </div>
                <p className="text-lg text-colorTextSecondary leading-[150%]">
                  or
                </p>
                {/* week month */}
                <div className="flex flex-col items-center -gap-1">
                  <h2 className="text-[24px] text-colorTextSecondary font-semibold leading-[120%]">
                    &#163;{data.weeklyRent}
                  </h2>
                  <p className="text-lg text-colorTextSecondary leading-[150%]">
                    per week
                  </p>
                </div>
              </div>

              {/* about fees */}
              <div className="flex items-center gap-4">
                {/* extra fees */}
                <div className="flex items-center gap-1 p-2 rounded-[32px] bg-[#EEF8EB]">
                  <CheckCircle width={20} height={21} fill="#50B533" />
                  <p className="text-sm text-colorTextPrimary leading-[150%]">
                    No extra fees
                  </p>
                </div>

                {/* transparent pricing */}
                <div className="flex items-center gap-1 p-2 rounded-[32px] bg-[#EEF8EB]">
                  <CheckCircle width={20} height={21} fill="#50B533" />
                  <p className="text-sm text-colorTextPrimary leading-[150%]">
                    Transparent pricing
                  </p>
                </div>
              </div>
            </div>
            {/* separator */}
            <div className="w-[1.5px] h-[120px] bg-colorTextPrimary opacity-10"></div>

            {/* rent */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-lg text-colorTextSecondary font-semibold">
                Proceed to Rent
              </h3>
              <Button
                className="py-[17px] px-[126px] rounded-[32px] bg-colorButton"
                onClick={() => router.push(`/rent/${listingId}`)}
              >
                Rent Now
              </Button>
            </div>
            {/* separator */}
            <div className="w-[1.5px] h-[120px] bg-colorTextPrimary opacity-10"></div>

            {/* viewing */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-lg text-colorTextSecondary font-semibold">
                Want to arrange a viewing?
              </h3>
              <Button className="py-[17px] px-[92.5px] rounded-[32px] bg-colorTextPrimary">
                Contact Landlord
              </Button>
            </div>
          </div>
        </section>

        {/* property information */}
        <section className="w-[1216px] gap-8 m-auto mt-14 relative">
          <div className="w-[800px]">
            {/* offers */}
            <div className="flex flex-col justify-center gap-8 px-6 py-8 rounded-3xl bg-[#EEF1F3]">
              {/* cashback offer */}
              <div className="flex gap-4">
                <StarFill width={24} height={24} fill="#50B533" />
                <div className="space-y-1">
                  <h3 className="text-[20px] text-colorTextPrimary font-semibold leading-[120%]">
                    £300 Cashback Offer
                  </h3>
                  <p className="text-lg text-colorTextPrimary leading-[150%]">
                    Earn up to £300 cashback when you book 6 bed, 3 bath house
                    for 2025/26.
                  </p>
                </div>
              </div>

              {/* refer offer */}
              <div className="flex gap-4">
                <StarFill width={24} height={24} fill="#50B533" />
                <div className="space-y-1">
                  <h3 className="text-[20px] text-colorTextPrimary font-semibold leading-[120%]">
                    Refer a friend offer
                  </h3>
                  <p className="text-lg text-colorTextPrimary leading-[150%]">
                    Intro your mates to this landlord and share £400 with the
                    code SHARE400.
                  </p>
                </div>
              </div>

              {/* book */}
              <div className="flex gap-4">
                <StarFill width={24} height={24} fill="#50B533" />
                <div className="space-y-1">
                  <h3 className="text-[20px] text-colorTextPrimary font-semibold leading-[120%]">
                    Book with confidence
                  </h3>
                  <p className="text-lg text-colorTextPrimary leading-[150%]">
                    Need to change your booking or not received your visa?
                  </p>
                  <p className="text-lg text-colorTextPrimary leading-[150%] pt-4">
                    Terms & Conditions apply. See Verv’s website for details.
                  </p>
                </div>
              </div>
            </div>

            {/* summary */}
            <div className="mt-10">
              <h2 className="text-2xl text-colorTextPrimary font-semibold leading-[120%]">
                Summary
              </h2>
              <div className="flex gap-[126px] px-8 py-[25px]">
                {/* left summary */}
                <div className="w-1/2 space-y-4">
                  {/* bed */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BedIcon width={24} height={24} stroke="#50B533" />
                      <p className="text-lg text-colorTextPrimary leading-[150%]">
                        Bed
                      </p>
                    </div>
                    <p className="text-lg text-colorTextPrimary font-semibold leading-[150%]">
                      {data.bedrooms}
                    </p>
                  </div>

                  {/* bath */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BathIcon width={24} height={24} fill="#50B533" />
                      <p className="text-lg text-colorTextPrimary leading-[150%]">
                        Bathroom
                      </p>
                    </div>
                    <p className="text-lg text-colorTextPrimary font-semibold leading-[150%]">
                      {data.bathrooms}
                    </p>
                  </div>

                  {/* area */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <SquareIcon width={24} height={24} stroke="#50B533" />
                      <p className="text-lg text-colorTextPrimary leading-[150%]">
                        Area
                      </p>
                    </div>
                    <p className="text-lg text-colorTextPrimary font-semibold leading-[150%]">
                      6
                    </p>
                  </div>
                </div>

                {/* right summary */}
                <div className="w-1/2 space-y-4">
                  {/* bed */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BedIcon width={24} height={24} stroke="#50B533" />
                      <p className="text-lg text-colorTextPrimary leading-[150%]">
                        Bed
                      </p>
                    </div>
                    <p className="text-lg text-colorTextPrimary font-semibold leading-[150%]">
                      6
                    </p>
                  </div>

                  {/* bath */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BathIcon width={24} height={24} fill="#50B533" />
                      <p className="text-lg text-colorTextPrimary leading-[150%]">
                        Bathroom
                      </p>
                    </div>
                    <p className="text-lg text-colorTextPrimary font-semibold leading-[150%]">
                      6
                    </p>
                  </div>

                  {/* area */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <SquareIcon width={24} height={24} stroke="#50B533" />
                      <p className="text-lg text-colorTextPrimary leading-[150%]">
                        Area
                      </p>
                    </div>
                    <p className="text-lg text-colorTextPrimary font-semibold leading-[150%]">
                      6
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* description */}
            <div className="mt-10">
              <h2 className="text-2xl text-colorTextPrimary font-semibold leading-[120%]">
                Property Description
              </h2>
              <div className="text-lg text-colorTextSecondary leading-[150%] mt-6 space-y-4">
                {/* {listingData.description} */}
                <div
                  className="property-description"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              </div>
            </div>

            {/* utilities */}
            <div className="flex gap-[123px] mt-10">
              {/* amenities and bills */}
              <div className="space-y-10">
                {/* Features */}
                <div>
                  <h3 className="text-2xl text-colorTextPrimary font-semibold leading-[120%] mb-6">
                    Features
                  </h3>
                  <div className="flex flex-col gap-4">
                    <ItemChecked
                      isChecked={data.billsIncluded}
                      item="Bills included"
                    />
                    <ItemChecked isChecked={data.fireplace} item="Fireplace" />
                    <ItemChecked
                      isChecked={data.gardenAccess}
                      item="Garden Access"
                    />
                    <ItemChecked isChecked={data.parking} item="Parking" />
                  </div>
                </div>

                {/* Bills */}
                {/* <div>
                <h3 className="text-2xl text-colorTextPrimary font-semibold leading-[120%] mb-6">
                  Bills
                </h3>
                <div className="flex flex-col gap-4">
                  <ItemChecked
                    isChecked={false}
                    item="Water close to the pub"
                  />
                  <ItemChecked isChecked={false} item="Electricity" />
                  <ItemChecked isChecked={false} item="Internet" />
                  <ItemChecked isChecked={false} item="Gas" />
                </div>
              </div> */}
              </div>

              {/* highlights and Preferences */}
              <div className="space-y-10">
                {/* Preferences */}
                <div>
                  <h3 className="text-2xl text-colorTextPrimary font-semibold leading-[120%] mb-6">
                    Preferences
                  </h3>
                  <div className="flex flex-col gap-4">
                    <ItemChecked
                      isChecked={data.dssIncomeAccepted}
                      item="DSS income accepted"
                    />
                    <ItemChecked
                      isChecked={data.familiesAllowed}
                      item="Families allowed"
                    />
                    <ItemChecked
                      isChecked={data.petsAllowed}
                      item="Pets allowed"
                    />
                    <ItemChecked
                      isChecked={data.smokersAllowed}
                      item="Smokers allowed"
                    />
                    <ItemChecked
                      isChecked={data.studentAllowed}
                      item="Student allowed"
                    />
                  </div>
                </div>
                {/* Preferences */}
                {/* <div>
                <h3 className="text-2xl text-colorTextPrimary font-semibold leading-[120%] mb-6">
                  Preferences
                </h3>
                <div className="flex flex-col gap-4">
                  <ItemChecked isChecked={true} item="Student Friendly" />
                  <ItemChecked isChecked={true} item="Families Allowed" />
                  <ItemChecked isChecked={false} item="Smokers Allowed" />
                  <ItemChecked isChecked={false} item="Pets Allowed" />
                  <ItemChecked isChecked={false} item="DSS/LHA Covers Rent" />
                </div>
              </div> */}
              </div>
            </div>

            {/* location */}
            <div className="mt-10">
              <div>
                <h3 className="text-2xl text-colorTextPrimary font-semibold leading-[120%] mb-6">
                  Location
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <LocationIcon width={18} height={20} />
                  <h3 className="text-colorTextSecondary text-lg font-semibold">
                    {data.address}
                  </h3>
                </div>
              </div>
              <GoogleMaps
                locationMarker={{
                  lat: data?.latitude as number,
                  lng: data?.longitude as number,
                }}
              />
            </div>
          </div>

          {/* profile */}
          <div className="w-[384px] px-[76px] py-[40px] inline-flex flex-col items-center justify-center rounded-[24px] border border-[#EEF1F3] absolute right-0 top-0">
            <div className="flex flex-col items-center gap-6">
              <h4 className="text-xl font-semibold leading-[120%] text-colorTextSecondary">
                Landlord Profile
              </h4>
              {/* photo */}
              <div>
                <Avatar className="w-[120px] h-[120px]">
                  <AvatarImage
                    src={data.landlord?.profilePhoto}
                    alt="landlord-photo"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>

              {/* ratings */}
              <div className="flex flex-col items-center gap-2">
                <h3 className="text-[22px] text-colorTextPrimary font-semibold leading-[120%]">
                  Verv Rooms Limited
                </h3>
                <div className="flex items-center">
                  <StarFill width={20} height={18} fill="#50B533" />
                  <p className="text-lg font-[500] text-colorTextPrimary">
                    5 Star Rated by Tenants
                  </p>
                </div>
              </div>

              {/* reply */}
              <div className="text-center space-y-2">
                <p className="text-lg text-colorTextSecondary leading-[150%]">
                  Reply Rating: <span className="font-semibold">98%</span>
                </p>
                <p className="text-lg text-colorTextSecondary leading-[150%]">
                  Reply time: <span className="font-semibold">2 Days</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  );
};

export default SingleListingPage;
