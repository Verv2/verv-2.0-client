"use client";

import React from "react";
import PricingSection from "./PricingSection";
import { additionalServicesData } from "./pricingConstants";
import Services from "./Services";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user.provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Pricing = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleAddListing = () => {
    if (!user) {
      router.push("/login");
    } else if (!user.isProfileUpdated && user?.role === "LANDLORD") {
      router.push("/profile/complete-profile/landlord");
    } else if (user?.role === "LANDLORD") {
      router.push("/listing/add-property");
    } else {
      toast.error("You need to be a landlord to create your listing.");
    }
  };

  return (
    <>
      <section className="w-full bg-[#30455f] py-[36.5]">
        <div className="w-[1216px] m-auto flex justify-between items-center">
          <div className="w-[616px] flex flex-col items-start gap-8">
            <div className="text-white">
              <h2 className="text-[40px] font-bold leading-[120%]">
                Simplified Pricing
              </h2>
              <p className="text-[24px] font-semibold leading-[140%] opacity-70 mt-4">
                List your property. Access direct tenants. Transparent pricing,
                the rest is history.
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                className="w-[300px] h-[56px] text-lg font-semibold py-2 px-4 bg-colorButton rounded-[32px]"
                onClick={handleAddListing}
              >
                List for Free
              </Button>
              <Button className="w-[300px] h-[56px] text-lg font-semibold text-colorTextPrimary hover:text-white py-2 px-4 bg-white rounded-[32px]">
                More Landlord Services
              </Button>
            </div>
          </div>
          <div className="w-[400px] h-[181px] p-2 flex flex-col justify-center items-center gap-2 flex-shrink-0 rounded-[16px] bg-white/10">
            <h2 className="text-xl font-semibold leading-[120%] text-white">
              Landlords we’ve got you covered.
            </h2>
            <h3 className="leading-[150%] text-white">
              No excess agency fees anymore.
            </h3>
          </div>
        </div>
      </section>

      <PricingSection />

      <h2 className="text-center text-[#30455f] text-[32px] font-semibold leading-[38.40px] my-12">
        Additional Services
      </h2>
      <section className="my-12">
        <div className="grid lg:grid-cols-3 lg:gap-6 gap-y-4  lg:w-[1216px] md:w-3/5 lg-px-0 px-4 mx-auto">
          {additionalServicesData.map((service) => (
            <Services key={service.id} service={service} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Pricing;
