"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import MultipleSelector, {
  MultipleSelectorRef,
} from "@/components/extension/multiple-selector";
import {
  amenities,
  cities,
  genderOption,
  moveInSelect,
  termsSelect,
} from "./profileConstants";
import { tenantProfileSchema } from "@/schema/profile.schema";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import Loading from "../../../UI/Loading/Loading";
import InputField from "../../../UI/Form/InputField";
import ImageUploader from "../../../UI/ImageUploader/ImageUploader";
import SelectField from "../../../UI/Form/SelectField";
import { Textarea } from "@/components/ui/textarea";
import CheckboxField from "../../../UI/Form/CheckboxField";
import { useCreateTenantProfile } from "@/hooks/tenant.hook";

type TProfile = z.infer<typeof tenantProfileSchema>;

const CompleteTenantProfile = () => {
  const searchParams = useSearchParams();
  // const router = useRouter();
  const redirect = searchParams.get("redirect");

  const areaRef = useRef<MultipleSelectorRef>(null);
  const amenitiesRef = useRef<MultipleSelectorRef>(null);

  const [image, setImage] = useState<File[] | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const {
    mutate: handleCreateTenantProfile,
    isPending,
    isSuccess,
  } = useCreateTenantProfile();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProfile>({
    resolver: zodResolver(tenantProfileSchema),
    defaultValues: {
      isSmoker: false,
      isPetOwner: false,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setFormSubmitted(true); // Mark form as submitted

    const areaSelector = areaRef.current?.selectedValue;
    const amenitiesSelector = amenitiesRef.current?.selectedValue;
    let isValid = true;

    if (!areaSelector || areaSelector.length === 0) {
      isValid = false;
    }

    if (!amenitiesSelector || amenitiesSelector.length === 0) {
      isValid = false;
    }

    if (!image || image.length === 0) {
      isValid = false;
    }

    if (!isValid) return; // Stop form submission

    let areaArray;
    if (areaSelector) {
      areaArray = areaSelector.map((item) => item.value);
    }

    let amenitiesArray;
    if (amenitiesSelector) {
      amenitiesArray = amenitiesSelector.map((item) => item.value);
    }

    const tenantData = {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      phoneNumber: data.phoneNumber,
      description: data.description,
      age: data.age,
      occupation: data.occupation,
      minBudget: data.minBudget,
      maxBudget: data.maxBudget,
      minAge: data.minAge,
      maxAge: data.maxAge,
      lookingIn: areaArray,
      amenitiesRequired: amenitiesArray,
    };

    const householdData = {
      occupation: data.householdOccupation,
      minAge: data.householdMinAge,
      maxAge: data.householdMaxAge,
      gender: data.householdGender,
      isSmoker: data.isSmoker,
      isPetOwner: data.isPetOwner,
    };

    const availabilityData = {
      moveIn: data.moveIn,
      minTerm: data.minTerm,
      maxTerm: data.maxTerm,
    };

    const profileData = {
      ...tenantData,
      householdPreference: householdData,
      availability: availabilityData,
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(profileData));
    if (image) {
      console.log(image);
      formData.append("image", image[0]);
    }

    handleCreateTenantProfile(formData);
    // console.log("Form Data", formData.get("image"));

    console.log("Form Data", profileData);
  };

  // useEffect(() => {
  //   if (!isPending && isSuccess) {
  //     if (redirect) {
  //       console.log("Redirect", redirect);
  //       router.push(redirect);
  //     } else {
  //       router.push("/");
  //     }
  //   }
  // }, [isPending, isSuccess, redirect, router]);

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        console.log("Redirect", redirect);
        window.location.href = redirect;
      } else {
        window.location.href = "/";
      }
    }
  }, [isPending, isSuccess, redirect]);

  return (
    <>
      {isPending && <Loading />}
      <div className="m-auto  my-14 flex lg:w-[700px] w-96 p-[40px] flex-col justify-center items-center flex-shrink-0 rounded-[16px] border border-[#EEF1F3] shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
        <h2 className="text-colorTextPrimary text-center text-[24px] font-semibold leading-[120%] mb-10">
          Complete profile Tenant
        </h2>
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <h2 className="text-colorTextSecondary text-[20px] font-semibold">
            Tenant Information
          </h2>
          <div className="rounded-[16px] border border-[#EEF1F3] shadow-[0px_4px_20px_rgba(0,0,0,0.08)] p-4">
            <div className="flex justify-between gap-3 mb-4">
              <InputField
                registerName="firstName"
                type="text"
                placeholder="First Name"
                register={register}
                errors={errors}
                className="w-full"
              />
              <InputField
                registerName="lastName"
                type="text"
                placeholder="Last Name"
                register={register}
                errors={errors}
                className="w-full"
              />
            </div>
            <div className="flex justify-between gap-3 mb-4">
              <SelectField
                registerName="gender"
                control={control}
                errors={errors}
                options={genderOption}
                className="w-full"
              />
              <InputField
                registerName="age"
                type="number"
                placeholder="Age"
                register={register}
                errors={errors}
                className="w-full"
              />
            </div>
            <div className="w-full mb-4">
              <div className="relative ">
                <p className="text-colorTextSecondary font-normal leading-[150%] absolute left-3 top-1/2 -translate-y-1/2">
                  +44 (UK)
                </p>
                <Input
                  id="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  {...register("phoneNumber")}
                  className="pl-24 flex w-full items-center self-stretch py-1.5 rounded-md border border-gray-400 bg-white"
                />
              </div>
              {errors?.["phoneNumber"] && (
                <p className="text-red-500 mt-1">
                  {(errors["phoneNumber"] as { message?: string })?.message}
                </p>
              )}
            </div>

            {/* description */}
            <div className="w-full mb-4">
              <Textarea
                placeholder="Wite something about you"
                {...register("description")}
                className="flex w-full items-center self-stretch py-1.5 rounded-md border border-gray-400 bg-white"
              />
              {errors?.["description"] && (
                <p className="text-red-500 mt-1">
                  {(errors["description"] as { message?: string })?.message}
                </p>
              )}
            </div>

            {/* budget */}
            <div className="flex justify-between gap-3 mb-4">
              <InputField
                registerName="minBudget"
                //   label="Monthly Rent For Entire Property"
                type="number"
                placeholder="Minimum Budget"
                register={register}
                errors={errors}
                className="w-full"
              />
              <InputField
                registerName="maxBudget"
                //   label="maxBudget Rent For Entire Property"
                type="number"
                placeholder="Maximum Budget"
                register={register}
                errors={errors}
                className="w-full"
              />
            </div>

            {/* min age, max age */}
            <div className="flex justify-between gap-3 mb-4">
              <InputField
                registerName="minAge"
                //   label="Monthly Rent For Entire Property"
                type="number"
                placeholder="Minimum Age"
                register={register}
                errors={errors}
                className="w-full"
              />
              <InputField
                registerName="maxAge"
                //   label="maxBudget Rent For Entire Property"
                type="number"
                placeholder="Maximum Age"
                register={register}
                errors={errors}
                className="w-full"
              />
            </div>

            {/* occupation */}
            <div className="w-full mb-4">
              <InputField
                registerName="occupation"
                type="text"
                placeholder="Your Occupation"
                register={register}
                errors={errors}
                className="w-full"
              />
            </div>

            {/* looking in */}
            <div className="">
              <MultipleSelector
                ref={areaRef}
                className="rounded-md text-[16px] border border-gray-400 bg-white pr-10"
                defaultOptions={cities}
                placeholder="Select the ares you are looking in"
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    no results found.
                  </p>
                }
              />
              {formSubmitted && !areaRef.current?.selectedValue?.length && (
                <p className="text-red-500 text-sm">
                  Please select at least one Area.
                </p>
              )}
            </div>

            {/* amenities */}
            <div className="mt-4">
              <MultipleSelector
                ref={amenitiesRef}
                className="rounded-md text-[16px] border border-gray-400 bg-white pr-10"
                defaultOptions={amenities}
                placeholder="Select the the amenities"
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    no results found.
                  </p>
                }
              />
              {formSubmitted &&
                !amenitiesRef.current?.selectedValue?.length && (
                  <p className="text-red-500 text-sm">
                    Please select at least one Amenity.
                  </p>
                )}
            </div>
          </div>

          {/* household */}
          <div className="mt-7">
            <h2 className="text-colorTextSecondary text-[20px] font-semibold">
              Household Preference
            </h2>
            <div className="rounded-[16px] border border-[#EEF1F3] shadow-[0px_4px_20px_rgba(0,0,0,0.08)] p-4">
              <div className="w-full mb-4">
                <InputField
                  registerName="householdOccupation"
                  type="text"
                  placeholder="Household Occupation"
                  register={register}
                  errors={errors}
                  className="w-full"
                />
              </div>

              {/* languages */}

              {/* min-max ages */}
              <div className="flex justify-between gap-3 mb-4">
                <InputField
                  registerName="householdMinAge"
                  type="number"
                  placeholder="Minimum Age"
                  register={register}
                  errors={errors}
                  className="w-full"
                />
                <InputField
                  registerName="householdMaxAge"
                  type="number"
                  placeholder="Maximum Age"
                  register={register}
                  errors={errors}
                  className="w-full"
                />
                <SelectField
                  registerName="householdGender"
                  control={control}
                  errors={errors}
                  options={genderOption}
                  className="w-full"
                />
              </div>

              {/* check fields */}
              <div className="flex flex-col gap-3 mb-4">
                <CheckboxField
                  registerName="isSmoker"
                  label="Smoker"
                  control={control}
                />
                <CheckboxField
                  registerName="isPetOwner"
                  label="Pet Owner"
                  control={control}
                />
              </div>
            </div>
          </div>

          <div className="mt-7">
            <h2 className="text-colorTextSecondary text-[20px] font-semibold">
              Availability
            </h2>
            <div className="rounded-[16px] border border-[#EEF1F3] shadow-[0px_4px_20px_rgba(0,0,0,0.08)] p-4">
              <div className="flex justify-between gap-3 mb-4">
                <SelectField
                  registerName="moveIn"
                  control={control}
                  errors={errors}
                  options={moveInSelect}
                  className="w-full"
                />
                <SelectField
                  registerName="minTerm"
                  control={control}
                  errors={errors}
                  options={termsSelect}
                  className="w-full"
                />
                <SelectField
                  registerName="maxTerm"
                  control={control}
                  errors={errors}
                  options={termsSelect}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* image */}
          <div>
            <ImageUploader
              files={image}
              setFiles={setImage}
              maxFiles={1}
              isMultiple={false}
              fileTypes={[".png", ".jpg", ".jpeg", ".webp"]}
              containerClass="bg-[#EEF8EB] rounded-lg px-[150px] py-[30px]"
            >
              <p className="text-colorTextLime text-sm font-semibold leading-[150%] text-center">
                Drag a photo here, or click &quot;Add Photos&quot; to select
                your photos
              </p>
            </ImageUploader>
            {formSubmitted && (!image || image.length === 0) && (
              <p className="text-red-500 text-sm">Please upload a file.</p>
            )}
          </div>

          <div>
            <p className="text-center  lg:px-5 px-3 mt-6 mb-4">
              <span className="text-[#314660] text-sm font-normal  leading-tight">
                By selecting{" "}
              </span>
              <span className="text-[#314660] text-sm font-semibold  leading-none">
                Agree & Continue
              </span>
              <span className="text-[#314660] text-sm font-normal  leading-tight">
                , I agree to Verv`&apos;`s{" "}
              </span>
              <span className="text-[#50B533] text-sm font-semibold  underline leading-none">
                Terms & Conditions
              </span>
              <span className="text-[#314660] text-sm font-normal  leading-tight">
                ,{" "}
              </span>
              <span className="text-[#50B533] text-sm font-semibold  underline leading-none">
                Payment Terms
              </span>
              <span className="text-[#314660] text-sm font-normal  leading-tight">
                {" "}
                & acknowledge the{" "}
              </span>
              <span className="text-[#50B533] text-sm font-semibold  underline leading-none">
                Privacy Policy
              </span>
              <span className="text-[#314660] text-sm font-normal  leading-tight">
                .
              </span>
            </p>
          </div>

          <Button
            type="submit"
            className="bg-colorButton w-full mt-6 rounded shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] text-lg font-semibold"
          >
            Agree & Continue
          </Button>
        </form>
      </div>
    </>
  );
};

export default CompleteTenantProfile;
