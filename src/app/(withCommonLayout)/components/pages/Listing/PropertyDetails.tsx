/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  propertyDetailsSchema,
  TPropertyDetails,
} from "@/schema/listing.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import InputField from "../../UI/Form/InputField";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "@/assets/icons/icons";
import SelectField from "../../UI/Form/SelectField";
import CheckboxField from "../../UI/Form/CheckboxField";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useRef, useState } from "react";
import { datePicker } from "@/helpers/datePicker";
import {
  depositAmount,
  furnishedOptions,
  propertyTypeOptions,
} from "./constants";
import TextEditor from "../../UI/TextEditor/TextEditor";
import ImageUploader from "../../UI/ImageUploader/ImageUploader";
// import { useFileStore, usePropertyDetailsStore } from "@/store/store";
import generateDescription from "@/services/GenerateDescription";
import { usePropertyDetailsStore } from "@/store/store";
import useFileStore from "@/store/fileStore";
import {
  useAddTemporaryListing,
  useGetTemporaryListing,
} from "@/hooks/listing.hook";
import Loading from "../../UI/Loading/Loading";
import { getAddresses, getSingleAddresses } from "@/services/APIServices";
import { IOptionGroup, TAddresses, TAddressInfo } from "@/types";
import { getAddressOptions } from "@/helpers/createOptions";
import { useQueryClient } from "@tanstack/react-query";

const PropertyDetails = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: handleCreateTemporaryListing, isPending } =
    useAddTemporaryListing();

  const {
    data: temporaryListingData,
    isLoading: temporaryListingLoading,
    // isSuccess: temporaryListingSuccess,
  } = useGetTemporaryListing();

  console.log(
    "Property Details temporaryListingData",
    temporaryListingData?.data?.data
  );

  const router = useRouter();

  // get the date field
  const [date, setDate] = useState<Date | undefined>(new Date());

  // for get address api
  const [addresses, setAddresses] = useState<Array<TAddresses>>([]);
  const [addressOptions, setAddressOptions] = useState<IOptionGroup[]>([]);
  const [singleAddress, setSingleAddress] = useState<TAddressInfo | null>(null);
  const [isAddressLoading, setIsAddressLoading] = useState<boolean>(false);

  // for image uploading
  const [imageFiles, setImageFiles] = useState<File[] | null>(null);
  // const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // for smooth image error
  const imageRef = useRef<HTMLDivElement>(null);

  // console.log("From Details", imageFiles);

  // store the data to local storage
  const setData = usePropertyDetailsStore((state) => state.setData);
  const setFiles = useFileStore((state) => state.setFiles);

  // to check whether the first step is completed or not
  const propertyOption = usePropertyDetailsStore(
    (state) => state.propertyOption
  );
  const hasHydrated = usePropertyDetailsStore((state) => state.hasHydrated);

  const {
    control,
    register,
    reset,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<TPropertyDetails>({
    resolver: zodResolver(propertyDetailsSchema),
    defaultValues: {
      postcode: "SW1A 1AA",
      houseNumber: "4A",
      address: "12 Brushfield Street",
      address2: "",
      propertyType: "FLAT",
      bedrooms: 1,
      bathrooms: 1,
      furnishingOptions: "FURNISHED",
      // town: "London",
      description: "This is a description of the property",
      monthlyRent: 1200,
      minimumTenancy: 4,
      weeklyRent: 300,
      maximumTenancy: 12,
      depositAmount: "2 Weeks Rent",

      billsIncluded: false,
      gardenAccess: false,
      parking: false,
      fireplace: false,
      remoteVideoViewing: false,
      studentAllowed: false,
      familiesAllowed: false,
      dssIncomeAccepted: false,
      petsAllowed: false,
      smokersAllowed: false,
      termsAgreed: false,
    },
  });

  // console.log("Files from Details", files);

  // watch for generating description
  const postcode = watch("postcode");
  const address = watch("address");
  const town = watch("town");
  const district = watch("district");
  const propertyType = watch("propertyType");
  const bedrooms = watch("bedrooms");
  const bathrooms = watch("bathrooms");
  const furnishingOptions = watch("furnishingOptions");
  // const description = watch("description");

  const dataFromGenerate = {
    postcode,
    address,
    town,
    propertyType,
    bedrooms,
    bathrooms,
    furnishingOptions,
    district,
  };

  const handleDescriptionGeneration = async () => {
    // setIsLoading(true);
    try {
      const response = await generateDescription(dataFromGenerate);
      console.log(response);

      setValue("description", response);
      // setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      // setError(error.message);
      // setIsLoading(false);
    }
  };

  const handlePostcode = async (postcode: string) => {
    setIsAddressLoading(true);
    try {
      const response = await getAddresses(postcode);
      const options = getAddressOptions(response?.suggestions);

      setAddresses(response?.suggestions);
      setAddressOptions(options as IOptionGroup[]);
    } catch (error: any) {
      console.error(error);
      // setError(error.message);
    } finally {
      setIsAddressLoading(false);
    }
  };

  const selectedAddress = watch("address");

  console.log("Address data response", addresses);
  console.log("Address data options", addressOptions);
  console.log("Selected Address", selectedAddress);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // today: 55/1/25 start
    setIsSubmitting(true);

    let isValid = true;
    if (!imageFiles || imageFiles.length === 0) {
      isValid = false;
    }

    if (!isValid) return; // Stop form submission
    // today: 55/1/25 end

    if (imageFiles) {
      const propertyDetails = {
        postcode: data.postcode,
        address: data.address,
        address2: data?.address2,
        houseNumber: data.houseNumber,
        town: data.town,
        district: data.district,
        size: data.size,
        propertyType: data.propertyType,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        furnishingOptions: data.furnishingOptions,
        description: data.description,
        latitude: singleAddress?.latitude,
        longitude: singleAddress?.longitude,
      };

      const tenancyDetails = {
        monthlyRent: data.monthlyRent,
        minimumTenancy: data.minimumTenancy,
        weeklyRent: data.weeklyRent,
        maximumTenancy: data.maximumTenancy,
        depositAmount: data.depositAmount,
        moveInDate: datePicker(date),
      };

      const features = {
        billsIncluded: data.billsIncluded,
        gardenAccess: data.gardenAccess,
        parking: data.parking,
        fireplace: data.fireplace,
      };

      const tenantPreferences = {
        studentAllowed: data.studentAllowed,
        familiesAllowed: data.familiesAllowed,
        dssIncomeAccepted: data.dssIncomeAccepted,
        petsAllowed: data.petsAllowed,
        smokersAllowed: data.smokersAllowed,
      };

      const propertyData = {
        propertyOption: temporaryListingData?.data?.data?.data?.propertyOption,
        propertyDetails,
        tenancyDetails,
        features,
        tenantPreferences,
        remoteVideoViewing: data?.remoteVideoViewing,
        viewingDescription: data?.viewingDescription,
        youtubeUrl: data?.youtubeUrl,
        termsAgreed: data.termsAgreed,
      };

      console.log("propertyData", propertyData);

      const temporaryData = {
        step: "Property Details",
        data: propertyData,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(temporaryData));

      // Append each image file individually
      for (const image of imageFiles) {
        console.log("propertyImages", image);
        formData.append("propertyImages", image);
      }

      // handleCreateTemporaryListing(formData);
      try {
        // ✅ Wait for mutation to finish
        await handleCreateTemporaryListing(formData);

        // ✅ Invalidate cache to make sure next page fetches latest data
        queryClient.invalidateQueries({ queryKey: ["GET_TEMPORARY_LISTING"] });

        setData(propertyData);
        await setFiles(imageFiles);

        // ✅ Navigate to preview
        router.push("preview-listing");
      } catch (error) {
        console.error("Error submitting listing:", error);
      }

      // setFilesToStore(files);
    }
    // setIsSubmitting(true);
    // router.push("preview-listing");
  };

  // check if the first step is completed
  useEffect(() => {
    if (!hasHydrated) return; // Wait for hydration before checking state

    console.log("Hydration complete. Checking propertyOption:", propertyOption);

    if (!propertyOption) {
      router.push("/listing/add-property");
    }
  }, [hasHydrated, propertyOption, router]);

  // select single address data to find all the information about latitude and longitude
  useEffect(() => {
    const fetchSingleAddress = async () => {
      if (!selectedAddress) return;

      const selected = Array.isArray(addresses)
        ? addresses.find(
            (item: { address: string }) => item.address === selectedAddress
          )
        : undefined;

      if (!selected) return;

      try {
        const data = await getSingleAddresses(selected.id);
        setSingleAddress(data);
        // setValue("address2", data?.line_2);
      } catch (error) {
        console.error("Error fetching single address:", error);
      }
    };

    fetchSingleAddress();

    if (singleAddress) {
      setValue("address2", singleAddress?.line_1);
      setValue("town", singleAddress?.town_or_city);
      setValue("district", singleAddress?.district);
    }
  }, [selectedAddress, addresses, singleAddress, setValue]);

  console.log("Fetched full address data:", singleAddress);

  useEffect(() => {
    if (isSubmitting && (!imageFiles || imageFiles.length === 0)) {
      imageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isSubmitting, imageFiles]);

  // for file upload
  // useEffect(() => {
  //   if (isSubmitting) {
  //     if (!imageFiles || imageFiles.length === 0) {
  //       setError("Please select an image");
  //     } else {
  //       setError("");
  //       console.log("Form submitted successfully with files:", imageFiles);
  //     }
  //     setIsSubmitting(false);
  //     router.push("/listing/preview-listing"); // better to use absolute path
  //   }
  // }, [isSubmitting, imageFiles, router]);

  if (temporaryListingLoading || isPending) {
    return <Loading />;
  }

  return (
    <section className="w-[1216px] m-auto mt-14">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* room details */}
        <h2 className="text-[24px] font-semibold text-colorTextSecondary mb-5 leading-[32px]">
          Property / Room Details
        </h2>
        <div className="p-7 rounded-xl bg-[#FCFCFC] shadow-[0px_1px_4px_0px_rgba(16,24,40,0.10),0px_1px_4px_0px_rgba(16,24,40,0.06)]">
          <div className="flex gap-10">
            <div className="space-y-8 w-1/2">
              <div className="flex items-end self-stretch gap-1">
                <InputField
                  registerName="postcode"
                  label="Postcode"
                  type="text"
                  placeholder="Enter your postcode"
                  register={register}
                  errors={errors}
                  className="w-full"
                />
                <Button
                  type="button"
                  className="bg-colorButton"
                  onClick={() => {
                    const postcode = getValues("postcode");
                    handlePostcode(postcode);
                  }}
                  disabled={isAddressLoading}
                >
                  <SearchIcon />
                  {isAddressLoading ? "Loading..." : "Find Address"}
                </Button>
              </div>

              {/* address */}
              {addressOptions?.[0]?.options?.length > 0 && (
                <SelectField
                  registerName="address"
                  label="Select your address"
                  control={control}
                  errors={errors}
                  options={addressOptions}
                />
              )}
              {/* end address */}

              {/* <InputField
                registerName="address"
                label="Address"
                type="text"
                placeholder="Enter your address"
                register={register}
                errors={errors}
              /> */}
              <InputField
                registerName="address2"
                label="Address Line 2 (Optional)"
                type="text"
                placeholder="Enter your another address"
                register={register}
                errors={errors}
              />
              <InputField
                registerName="houseNumber"
                label="Flat or House Number (kept private)"
                type="text"
                placeholder="Enter your flat or house number"
                register={register}
                errors={errors}
              />
              <InputField
                registerName="district"
                label="District"
                type="text"
                placeholder="i.e. Westminster"
                register={register}
                errors={errors}
              />
            </div>

            <div className="space-y-8 w-1/2">
              <InputField
                registerName="town"
                label="Town"
                type="text"
                placeholder="Enter your town"
                register={register}
                errors={errors}
              />
              <div className="flex items-center gap-4">
                <SelectField
                  registerName="propertyType"
                  label="Property Type"
                  control={control} // Pass the correctly typed control
                  errors={errors}
                  options={propertyTypeOptions}
                  className="w-1/2"
                />
                <InputField
                  registerName="size"
                  label="Property Size"
                  type="number"
                  placeholder="Size in sq ft"
                  register={register}
                  errors={errors}
                  className="w-1/2"
                />
              </div>

              <div className="flex items-center gap-4">
                <InputField
                  registerName="bedrooms"
                  label="Number of Bedrooms"
                  type="number"
                  placeholder="Bedrooms"
                  register={register}
                  errors={errors}
                  className="w-1/2"
                />

                <InputField
                  registerName="bathrooms"
                  label="Number of Bathrooms"
                  type="number"
                  placeholder="Bathrooms"
                  register={register}
                  errors={errors}
                  className="w-1/2"
                />
              </div>
              <SelectField
                registerName="furnishingOptions"
                label="Furnishing Options"
                control={control} // Pass the correctly typed control
                errors={errors}
                options={furnishedOptions}
              />
            </div>
          </div>

          {/* property details */}
          <div className="mt-12 space-y-5">
            <div className="flex justify-between items-center">
              <div className="w-[700px] space-y-3">
                <h3 className="text-xl text-colorTextSecondary font-semibold leading-[30px]">
                  Property Description{" "}
                </h3>
                <p className="text-colorTextSecondary leading-[24px]">
                  Highlight what makes your property unique! Include details
                  like the number of rooms, special features, nearby amenities,
                  and transport links. Make sure your description is clear,
                  friendly, and inviting to attract the right tenants.
                </p>
              </div>
              <Button
                type="button"
                className="px-4 py-2 text-[#50B533] font-semibold border border-[#B4DFA7] rounded-[10px] bg-[#EEF8EB]"
                onClick={() => handleDescriptionGeneration()}
              >
                Generate Smart Description
              </Button>
            </div>
            <TextEditor
              registerName="description"
              control={control}
              errors={errors}
            />
          </div>
        </div>

        {/* tenancy details */}
        <div className="mt-12">
          <h2 className="text-[24px] font-semibold text-colorTextSecondary mb-5 leading-[32px]">
            Tenancy Details
          </h2>
          <div className="flex gap-10 p-7 rounded-xl bg-[#FCFCFC] shadow-[0px_1px_4px_0px_rgba(16,24,40,0.10),0px_1px_4px_0px_rgba(16,24,40,0.06)]">
            <div className="w-full flex gap-10">
              <div className="w-1/3 space-y-8">
                <InputField
                  registerName="monthlyRent"
                  label="Monthly Rent For Entire Property"
                  type="number"
                  placeholder="33.56"
                  register={register}
                  errors={errors}
                />
                <InputField
                  registerName="weeklyRent"
                  label="Weekly Rent For Entire Property"
                  type="number"
                  placeholder="33.56"
                  register={register}
                  errors={errors}
                />
                <SelectField
                  registerName="depositAmount"
                  label="Deposit Amount"
                  control={control}
                  errors={errors}
                  options={depositAmount}
                />
              </div>
              <div className="w-1/3 space-y-8">
                <InputField
                  registerName="minimumTenancy"
                  label="Minimum Tenancy Length"
                  type="number"
                  placeholder="12"
                  register={register}
                  errors={errors}
                />
                <InputField
                  registerName="maximumTenancy"
                  label="Maximum Number of Tenants"
                  type="number"
                  placeholder="33"
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="">
                <p>Earliest Move In Date</p>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border shadow"
                  classNames={{
                    day: "w-full h-full rounded-full hover:bg-black hover:text-white",
                    day_selected: "bg-colorButton text-white text-bold",
                    day_today: "border border-colorButton",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* features and preferences */}
        <div className="flex gap-8 mt-12">
          {/* features */}
          <div className="w-1/2">
            <div className="mb-5">
              <h2 className="text-[24px] font-semibold text-colorTextSecondary mb-2 leading-[32px]">
                Features
              </h2>
              <p className="text-colorTextSecondary leading-[24px]">
                Please tell us about any particular features of your property /
                tenancy.
              </p>
            </div>
            <div className="p-7 rounded-xl space-y-6 bg-[#FCFCFC] shadow-[0px_1px_4px_0px_rgba(16,24,40,0.10),0px_1px_4px_0px_rgba(16,24,40,0.06)]">
              <CheckboxField
                registerName="billsIncluded"
                label="Bills Included"
                control={control}
              />
              <CheckboxField
                registerName="gardenAccess"
                label="Garden Access"
                control={control}
              />
              <CheckboxField
                registerName="parking"
                label="Parking"
                control={control}
              />
              <CheckboxField
                registerName="fireplace"
                label="Fireplace"
                control={control}
              />
            </div>
          </div>

          {/* preferences */}
          <div className="w-1/2">
            <div className="mb-5">
              <h2 className="text-[24px] font-semibold text-colorTextSecondary mb-2 leading-[32px]">
                Tenant Preferences
              </h2>
              <p className="text-colorTextSecondary leading-[24px]">
                Please tell us about who can apply for your property.
              </p>
            </div>
            <div className="p-7 rounded-xl space-y-6 bg-[#FCFCFC] shadow-[0px_1px_4px_0px_rgba(16,24,40,0.10),0px_1px_4px_0px_rgba(16,24,40,0.06)]">
              <CheckboxField
                registerName="studentAllowed"
                label="Students Allowed"
                control={control}
              />
              <CheckboxField
                registerName="familiesAllowed"
                label="Families Allowed"
                control={control}
              />
              <CheckboxField
                registerName="dssIncomeAccepted"
                label="DSS Income Accepted"
                control={control}
              />
              <CheckboxField
                registerName="petsAllowed"
                label="Pets Allowed"
                control={control}
              />
              <CheckboxField
                registerName="smokersAllowed"
                label="Smokers Allowed"
                control={control}
              />
            </div>
          </div>
        </div>

        {/* available for viewing */}
        <div className="mt-12 space-y-5">
          <div>
            <h2 className="text-[24px] font-semibold text-colorTextSecondary leading-[32px] mb-3">
              Availability for Viewings (optional)
            </h2>
            <p className="text-colorTextSecondary leading-[24px]">
              Let tenants know when they can view the property by sharing your
              availability below.
            </p>
          </div>
          <TextEditor
            registerName="viewingDescription"
            control={control}
            errors={errors}
          />
        </div>
        {/* remote viewing */}
        <div className="mt-5 space-y-5">
          <p className="text-colorTextSecondary leading-[24px]">
            Let tenants know when they can view the property by sharing your
            availability below.
          </p>
          <CheckboxField
            registerName="remoteVideoViewing"
            label="Remote Video Viewings"
            control={control}
          />
        </div>

        {/* photos and videos */}
        <div className="mt-12 space-y-5">
          <h2 className="text-[24px] font-semibold text-colorTextSecondary leading-[32px]">
            Photos & Videos
          </h2>
          <div
            className="p-11 rounded-xl shadow-[0px_1px_4px_0px_rgba(16,24,40,0.10),0px_1px_4px_0px_rgba(16,24,40,0.06)]"
            ref={imageRef}
          >
            <ImageUploader
              files={imageFiles}
              setFiles={setImageFiles}
              maxFiles={5}
              isMultiple={true}
              fileTypes={[".png", ".jpg", ".jpeg", ".webp"]}
              containerClass="bg-[#EEF8EB] rounded-lg px-[326px] py-[38px]"
            >
              <p className="text-colorTextLime font-semibold leading-[24px] text-center">
                Drag a photo here, or click &quot;Add Photos&quot; to select
                your photos
              </p>
            </ImageUploader>
            {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
            {isSubmitting && (!imageFiles || imageFiles.length === 0) && (
              <p className="text-red-500 text-sm">
                Please upload at least one image.
              </p>
            )}
            <div className="mt-6">
              <p className="text-colorTextSecondary font-medium leading-[24px]">
                Optional: Add YouTube share URL{" "}
              </p>
              <InputField
                registerName="youtubeUrl"
                type="text"
                placeholder="https://"
                register={register}
                errors={errors}
                className="w-[344px]"
              />
            </div>
          </div>
        </div>

        {/* terms */}
        <div className="mt-12 space-y-5">
          <h2 className="text-[24px] font-semibold text-colorTextSecondary leading-[32px]">
            Terms
          </h2>
          <div className="p-11 rounded-xl shadow-[0px_1px_4px_0px_rgba(16,24,40,0.10),0px_1px_4px_0px_rgba(16,24,40,0.06)]">
            <CheckboxField
              registerName="termsAgreed"
              label="Tick Here To Agree To The Verv Terms:"
              control={control}
            />
            <p className="text-colorTextSecondary leading-[24px] mt-4">
              I confirm that I do not charge tenants any admin fees, that I am
              the landlord of this property with the legal right to rent it out,
              and that I agree to Verv’s Terms and Conditions and Privacy
              Policy.
            </p>
            {errors.termsAgreed && (
              <p className="text-red-500 text-sm">
                {errors.termsAgreed.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 mt-10">
          <Button
            type="submit"
            className="text-white text-sm font-medium leading-[20px] rounded-[8px] bg-colorButton px-6 py-2"
          >
            Submit & Preview
          </Button>
          <Button
            type="button"
            className="text-colorButton border border-[#B4DFA7] bg-[#EEF8EB] px-7 py-2"
          >
            Save
          </Button>
          <Button
            type="button"
            onClick={() => reset()}
            className="text-colorButton border border-[#B4DFA7] bg-[#EEF8EB] px-7 py-2"
          >
            Reset
          </Button>
        </div>
      </form>
    </section>
  );
};

export default PropertyDetails;
