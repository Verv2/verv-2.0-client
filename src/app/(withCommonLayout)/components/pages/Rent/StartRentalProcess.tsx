"use client";
import { useGetSingleListing } from "@/hooks/listing.hook";
import Loading from "../../UI/Loading/Loading";
import { ClipArrowDown, ClipArrowUp } from "@/assets/icons/icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const StartRentalProcess = ({ listingId }: { listingId: string }) => {
  const router = useRouter();
  const {
    data: data,
    isLoading: dataLoading,
    isSuccess: dataSuccess,
  } = useGetSingleListing(listingId);

  const { bedrooms, bathrooms } = data || {};

  if (dataLoading) {
    return <Loading />;
  }

  console.log("Single Listing", data);
  return (
    dataSuccess && (
      <>
        <section className="m-auto py-11 flex items-center justify-center bg-colorTextPrimary">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-center w-[250px] h-[48px] rounded-[32px] p-2 bg-white/10">
              <h3 className="text-white text-lg font-semibold">
                {bedrooms} bed, {bathrooms} bath house
              </h3>
            </div>
            <h2 className="text-white text-[40px] font-bold leading-[120%] text-center">
              Start Rental Process
            </h2>
          </div>
        </section>

        <section className="m-auto w-full lg:w-[1094px] mt-14">
          <div>
            <div className="flex flex-col items-start lg:flex-row gap-10 lg:gap-[70px] lg:relative">
              {/* 1 */}
              <div className="m-auto flex flex-col items-center gap-6 w-[318px] my-0">
                <div className="w-16 h-16 bg-colorTextPrimary text-white flex items-center justify-center text-[30.72px] font-bold leading-[120%] rounded-[16px] rounded-bl-none">
                  1
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-colorTextPrimary leading-[120%]">
                    Tenant Referencing
                  </h3>
                  <p className="text-lg text-colorTextSecondary leading-[150%]">
                    We’ll begin by verifying key details like your income,
                    current status, and other necessary information. As part of
                    this, a credit check might be carried out to ensure
                    everything aligns. It’s a quick step toward securing your
                    new home.
                  </p>
                </div>
              </div>
              <div className="absolute -top-[21px] left-[229px] hidden lg:block">
                <ClipArrowUp />
              </div>
              {/* 2 */}
              <div className="m-auto flex flex-col items-center gap-6 w-[318px] my-0">
                <div className="w-16 h-16 bg-colorTextPrimary text-white flex items-center justify-center text-[30.72px] font-bold leading-[120%] rounded-[16px] rounded-bl-none">
                  2
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-colorTextPrimary leading-[120%]">
                    Electronic Agreement Signing
                  </h3>
                  <p className="text-lg text-colorTextSecondary leading-[150%]">
                    Once we&apos;ve sorted everything out, you&apos;ll be able
                    to read and sign the tenancy agreement on your phone or
                    laptop.
                  </p>
                </div>
              </div>
              <div className="absolute top-[51.33px] left-[620px] hidden lg:block">
                <ClipArrowDown />
              </div>
              {/* 3 */}
              <div className="m-auto flex flex-col items-center gap-6 w-[318px] my-0">
                <div className="w-16 h-16 bg-colorTextPrimary text-white flex items-center justify-center text-[30.72px] font-bold leading-[120%] rounded-[16px] rounded-bl-none">
                  3
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-colorTextPrimary leading-[120%]">
                    Move-in Payments
                  </h3>
                  <p className="text-lg text-colorTextSecondary leading-[150%]">
                    It’s time to get ready for a hassle-free by completing the
                    initial rent and deposit payment. Don&apos;t forget your
                    holding deposit will be deducted from this total.
                  </p>
                </div>
              </div>
            </div>
            {/* divider */}
            <div className="w-[345px] lg:w-[800px] h-[1.5px] bg-colorTextPrimary opacity-10 my-10"></div>

            {/* rental guide  */}
            <div className="w-[345px] lg:w-[750px] m-auto flex flex-col items-center gap-8 text-center">
              <h2 className="text-[32px] font-semibold leading-[120%] text-colorTextPrimary">
                Our Rental Guide
              </h2>
              <p className="text-lg leading-[150%] text-colorTextPrimary">
                Secure your chosen property by making a holding deposit. This
                step ensures the home is reserved for you while we complete your
                reference checks. Plus, it simplifies the move-in process, as
                the deposit is applied towards your first month&apos;s rent.
              </p>
              <p className="text-lg font-medium leading-[150%] text-colorTextPrimary w-[350px]">
                For more information on our holding deposit policy, click{" "}
                <Link
                  href=""
                  className="font-semibold text-colorButton underline"
                >
                  here
                </Link>
              </p>
              <Button
                className="w-[180px] h-[56px] px-2 py-4 rounded-[32px] bg-colorButton text-lg font-semibold"
                onClick={() => router.push(`/rent/initiate/${listingId}`)}
              >
                Continue
              </Button>
            </div>
          </div>
        </section>
      </>
    )
  );
};

export default StartRentalProcess;
