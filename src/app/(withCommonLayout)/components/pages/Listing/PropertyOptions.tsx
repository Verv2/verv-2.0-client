// /* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listingSchema } from "@/schema/listing.schema";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { usePropertyDetailsStore } from "@/store/store";
import {
  useAddTemporaryListing,
  useGetTemporaryListing,
} from "@/hooks/listing.hook";
import Loading from "../../UI/Loading/Loading";

const propertyOptionSchema = listingSchema.pick({
  propertyOption: true,
});

type TPropertyOption = z.infer<typeof propertyOptionSchema>;

const PropertyOptions = () => {
  const { mutate: handleCreateTemporaryListing, isPending } =
    useAddTemporaryListing();

  const {
    data: temporaryListingData,
    isLoading: temporaryListingLoading,
    isSuccess: temporaryListingSuccess,
  } = useGetTemporaryListing();

  const router = useRouter();
  const setData = usePropertyDetailsStore((state) => state.setData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TPropertyOption>({
    resolver: zodResolver(propertyOptionSchema),
    defaultValues: {
      propertyOption: temporaryListingData?.data?.data?.data?.propertyOption,
    },
  });

  useEffect(() => {
    if (
      temporaryListingSuccess &&
      temporaryListingData?.data?.data?.data?.propertyOption
    ) {
      reset({
        propertyOption: temporaryListingData.data.data.data.propertyOption,
      });
    }
  }, [temporaryListingSuccess, temporaryListingData, reset]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const temporaryData = {
      step: "Add Property",
      data: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(temporaryData));

    handleCreateTemporaryListing(formData);

    setData(data);
    router.push("property-details");
  };

  if (temporaryListingLoading || isPending) {
    return <Loading />;
  }

  return (
    <section className="w-[1216px] m-auto mt-14 space-y-5">
      <h4 className="text-[24px] font-semibold text-colorTextSecondary leading-[32px]">
        How do you want to let the property?
      </h4>
      <div className="flex flex-col items-start gap-6 px-6 py-8 rounded-[12px] bg-[#FCFCFC] shadow-[0px_1px_4px_0px_rgba(16,24,40,0.10)]">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <div className="h-[132px] flex items-center gap-6 rounded-2xl border border-[#EEF1F3] pl-8 pr-6 py-6">
            <div className="w-6">
              <input
                type="radio"
                value="Whole property"
                {...register("propertyOption")}
                className="w-6 h-6 accent-green-600"
              />
            </div>
            <div>
              <h5 className="text-lg font-semibold text-colorTextPrimary">
                Whole property
              </h5>
              <p className="text-lg text-colorTextPrimary leading-[150%]">
                Most commonly offered to a group of students on a joint tenancy
                agreement. If the property is for a single dweller, an
                individual tenancy applies.
              </p>
            </div>
          </div>

          <div className="h-[132px] flex items-center gap-6 rounded-2xl border border-[#EEF1F3] pl-8 pr-6 py-6">
            <div className="w-6">
              <input
                type="radio"
                value="Individual rooms"
                {...register("propertyOption")}
                className="w-6 h-6 accent-green-600"
              />
            </div>
            <div>
              <h5 className="text-lg font-semibold text-colorTextPrimary">
                Individual rooms
              </h5>
              <p className="text-lg text-colorTextPrimary leading-[150%]">
                Rooms in this property can be let by individual students on an
                individual tenancy agreement.
              </p>
            </div>
          </div>

          <div className="h-[132px] flex items-center gap-6 rounded-2xl border border-[#EEF1F3] pl-8 pr-6 py-6">
            <div className="w-6">
              <input
                type="radio"
                value="Either whole property or individual rooms"
                {...register("propertyOption")}
                className="w-6 h-6 accent-green-600"
              />
            </div>
            <div>
              <h5 className="text-lg font-semibold text-colorTextPrimary">
                Either whole property or individual rooms
              </h5>
              <p className="text-lg text-colorTextPrimary leading-[150%]">
                Offered to groups and individual students, on a joint or
                individual tenancy agreement.
              </p>
            </div>
          </div>

          {errors.propertyOption && (
            <p className="text-red-500 text-sm">
              {errors.propertyOption.message}
            </p>
          )}

          <Button
            type="submit"
            className="font-semibold bg-colorButton"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save and Continue"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default PropertyOptions;
