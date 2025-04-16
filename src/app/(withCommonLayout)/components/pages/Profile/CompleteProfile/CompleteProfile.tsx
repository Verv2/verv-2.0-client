"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
// import InputField from "../../UI/Form/InputField";
import { Button } from "@/components/ui/button";
import MultipleSelector, {
  MultipleSelectorRef,
} from "@/components/extension/multiple-selector";
import { languages } from "./profileConstants";
import { profileSchema } from "@/schema/profile.schema";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
// import ImageUploader from "../../UI/ImageUploader/ImageUploader";
import { Input } from "@/components/ui/input";
import { useCreateUserProfile } from "@/hooks/user.hooks";
// import Loading from "../../UI/Loading/Loading";
import { useSearchParams } from "next/navigation";
import Loading from "../../../UI/Loading/Loading";
import InputField from "../../../UI/Form/InputField";
import ImageUploader from "../../../UI/ImageUploader/ImageUploader";

type TProfile = z.infer<typeof profileSchema>;

const CompleteProfile = () => {
  const searchParams = useSearchParams();
  // const router = useRouter();
  const redirect = searchParams.get("redirect");

  const ref = useRef<MultipleSelectorRef>(null);
  const [image, setImage] = useState<File[] | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const {
    mutate: handleCreateUserProfile,
    isPending,
    isSuccess,
  } = useCreateUserProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProfile>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setFormSubmitted(true); // Mark form as submitted

    const languageSelector = ref.current?.selectedValue;
    let isValid = true;

    if (!languageSelector || languageSelector.length === 0) {
      isValid = false;
    }

    if (!image || image.length === 0) {
      isValid = false;
    }

    if (!isValid) return; // Stop form submission

    let languageArray;
    if (languageSelector) {
      languageArray = languageSelector.map((item) => item.value);
    }

    const profileData = {
      ...data,
      languages: languageArray,
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(profileData));
    if (image) {
      console.log(image);
      formData.append("image", image[0]);
    }

    handleCreateUserProfile(formData);
    console.log("Form Data", formData.get("image"));
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
        window.location.href = redirect; // 🔁 Full reload + redirect
      } else {
        window.location.href = "/"; // 🔁 Full reload to home
      }
    }
  }, [isPending, isSuccess, redirect]);

  return (
    <>
      {isPending && <Loading />}
      <div className="m-auto  my-14 flex lg:w-[600px] w-96 p-[40px] flex-col justify-center items-center flex-shrink-0 rounded-[16px] border border-[#EEF1F3] shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
        <h2 className="text-colorTextPrimary text-center text-[24px] font-semibold leading-[120%] mb-10">
          Complete profile
        </h2>
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-2">
          <div className="space-y-2 mb-4">
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

            <p className="text-colorTextSecondary text-[12px] font-normal leading-[140%]">
              Make sure this matches the name on your government ID. If you go
              by another name, you can add a preferred first name.
            </p>
          </div>

          <div className="w-full">
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

          <div className="mb-4">
            <MultipleSelector
              ref={ref}
              className=" rounded-md text-[16px] border border-gray-400 bg-white pr-10"
              defaultOptions={languages}
              placeholder="Select Languages"
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  no results found.
                </p>
              }
            />
            {formSubmitted && !ref.current?.selectedValue?.length && (
              <p className="text-red-500 text-sm">
                Please select at least one language.
              </p>
            )}
          </div>

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

export default CompleteProfile;
