/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DatePicker from "../../../UI/Calendar/DatePicker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  tenantNamesFormSchema,
  TTenantNamesFormValues,
} from "@/schema/initiateRent.schema";
import { Plus, X } from "lucide-react";
import TextEditor from "../../../UI/TextEditor/TextEditor";
import { CircleFull } from "@/assets/icons/icons";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { useCreateRentNowTenantInfo } from "@/hooks/tenant.hook";
import Loading from "../../../UI/Loading/Loading";

const TenantNamesForm = ({ listingId }: { listingId: string }) => {
  const [date, setDate] = useState<Date | undefined>();
  const [dateError, setDateError] = useState(false);

  const { mutateAsync: handleCreateRentNowTenantInfo, isPending } =
    useCreateRentNowTenantInfo();

  const dateRef = useRef<HTMLDivElement>(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TTenantNamesFormValues>({
    resolver: zodResolver(tenantNamesFormSchema),
    defaultValues: {
      description: "",
      tenants: [{ fullName: "", email: "", phoneNumber: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tenants",
  });

  const onSubmit = async (data: TTenantNamesFormValues) => {
    if (!date) {
      setDateError(true);
      dateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setDateError(false);
    const { tenants } = data;
    const { description } = data;
    const moveInDate = date?.toString();

    const updatedTenants = tenants.map((tenant: any) => ({
      ...tenant,
      description,
      moveInDate,
      propertyId: listingId,
    }));

    try {
      // ✅ Wait for mutation to finish
      await handleCreateRentNowTenantInfo({ data: updatedTenants });
    } catch (error) {
      console.error("Error submitting tenants:", error);
    }

    console.log("Submitted Data:", { data: updatedTenants });
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <h3 className="text-2xl font-semibold leading-[120%] text-[#7D8A9B] mt-10 mb-5">
          Move-in Date
        </h3>
        <div
          className="p-6 rounded-[16px] bg-[#FCFCFC] shadow-[0px_1px_4px_0px_rgba(16,24,40,0.10),_0px_1px_4px_0px_rgba(16,24,40,0.06)]"
          ref={dateRef}
        >
          <DatePicker date={date} setDate={setDate} />
          {dateError && (
            <p className="text-sm text-red-500 mt-2">
              Please select a move-in date.
            </p>
          )}
        </div>
        <h3 className="text-2xl font-semibold leading-[120%] text-[#7D8A9B] mt-10 mb-5">
          Name of the Tenants
        </h3>
        <div className="p-6 rounded-[16px] bg-[#FCFCFC] shadow-[0px_1px_4px_0px_rgba(16,24,40,0.10),_0px_1px_4px_0px_rgba(16,24,40,0.06)]">
          <p className="text-lg leading-[150%] text-colorTextPrimary mb-4">
            Name all additional tenants who are over 18 and will be sharing this
            property with you. The following people will be placed on the
            tenancy agreement:
          </p>

          <div className="w-full rounded-2xl border border-[#CED3D9] overflow-hidden">
            <Table className="w-full">
              <TableHeader className="bg-[#CED3D9]">
                <TableRow>
                  <TableHead className="text-xl font-semibold leading-[120%] text-colorTextPrimary">
                    Full name
                  </TableHead>
                  <TableHead className="text-xl font-semibold leading-[120%] text-colorTextPrimary">
                    Email address
                  </TableHead>
                  <TableHead className="text-xl font-semibold leading-[120%] text-colorTextPrimary">
                    Phone number
                  </TableHead>
                  <TableHead className="text-xl font-semibold leading-[120%] text-colorTextPrimary text-center">
                    Remove
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => (
                  <TableRow
                    className="text-lg leading-[150%] text-colorTextPrimary"
                    key={field.id}
                  >
                    <TableCell>
                      <Input
                        placeholder="Enter Full Name"
                        {...register(`tenants.${index}.fullName`)}
                      />
                      {errors.tenants?.[index]?.fullName && (
                        <p className="text-red-500 text-sm">
                          {errors.tenants[index].fullName?.message}
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="font-semibold">
                      <Input
                        placeholder="Email"
                        {...register(`tenants.${index}.email`)}
                      />
                      {errors.tenants?.[index]?.email && (
                        <p className="text-red-500 text-sm">
                          {errors.tenants[index].email?.message}
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="font-semibold">
                      <Input
                        placeholder="Enter Phone Number"
                        {...register(`tenants.${index}.phoneNumber`)}
                      />
                      {errors.tenants?.[index]?.phoneNumber && (
                        <p className="text-red-500 text-sm">
                          {errors.tenants[index].phoneNumber?.message}
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="font-semibold text-center">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-600 hover:underline"
                      >
                        <X />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <button
              type="button"
              onClick={() =>
                append({ fullName: "", email: "", phoneNumber: "" })
              }
              className="flex items-center gap-2 text-lg font-medium text-colorTextPrimary hover:text-colorTextSecondary ml-4 mb-[28px]"
            >
              <Plus width={20} height={20} />
              Add additional tenant
            </button>
          </div>
        </div>

        {/* message to landlord */}
        <h3 className="text-2xl font-semibold leading-[120%] text-[#7D8A9B] mt-10 mb-5">
          Message to Landlord
        </h3>
        <div className="p-6 rounded-[16px] bg-[#FCFCFC] shadow-[0px_1px_4px_0px_rgba(16,24,40,0.10),_0px_1px_4px_0px_rgba(16,24,40,0.06)]">
          <div className="text-lg leading-[150%] text-colorTextPrimary space-y-4">
            <p>
              It&apos;s likely other tenants will also be interested in renting
              this property, so this is an opportunity to make sure the landlord
              picks you.
            </p>
            <div>
              <p>
                Tell the landlord a little about yourself, and why this is the
                ideal property for you. Landlords are often interested to hear
                about:
              </p>
              <ul className="list-disc list-inside">
                <li>Your link to the area</li>
                <li>What attracted you to the property</li>
                <li>What makes you the best possible tenant for them</li>
              </ul>
            </div>
            <p>
              Also be polite and upfront about your situation to avoid any
              surprises in referencing which could jeopardise your application.
            </p>
          </div>
          <div className="mt-6">
            <TextEditor
              registerName="description"
              control={control}
              //   errors={errors}
            />
          </div>
        </div>

        {/* place holding deposit */}
        <div className="flex flex-col justify-center items-center gap-6 p-6 rounded-[16px] bg-[#FCFCFC] shadow-[0px_1px_4px_0px_rgba(16,24,40,0.10),_0px_1px_4px_0px_rgba(16,24,40,0.06)] mt-10">
          <h2 className="text-center text-[32px] font-semibold leading-[120%] text-colorButton">
            Place Holding Deposit
          </h2>
          <p className="text-lg text-colorTextPrimary leading-[150%]">
            Please note:{" "}
            <span className="font-semibold">You must be a tenant</span> to place
            a holding deposit. Guarantors can be added later when required.
          </p>
          <div className="p-6 space-y-2 rounded-[16px] bg-[#EEF1F3]">
            <div className="flex items-start gap-2 self-stretch">
              <CircleFull width={28} height={28} fill="#50B533" />
              <p className="text-lg text-colorTextPrimary leading-[150%]">
                I understand this payment is a request to put down a holding
                deposit. The landlord must agree to your application before
                there is any agreement in place.
              </p>
            </div>
            <div className="flex items-start gap-2 self-stretch">
              <CircleFull width={28} height={28} fill="#50B533" />
              <p className="text-lg text-colorTextPrimary leading-[150%]">
                I agree to the Verv{" "}
                <span className="font-semibold text-colorButton">
                  Terms and Conditions
                </span>
                , and I have read the section relating to holding deposits.
              </p>
            </div>
          </div>

          {/* payable amount */}
          <div className="text-center mt-8">
            <h2 className="text-2xl font-semibold text-colorTextPrimary leading-[120%]">
              Amount payable now:£115.00
            </h2>
            <p className="text-lg text-colorTextSecondary leading-[150%] mt-2">
              This amount will be put towards the first month&apos;s rent if
              your application is successful.
            </p>
            <Button
              type="submit"
              className="w-[320px] text-lg font-semibold text-white py-6 rounded-[32px] bg-colorButton mt-6"
            >
              Pay with UK Debit Card
            </Button>
          </div>
        </div>

        {/* submit button */}
      </form>
    </>
  );
};

export default TenantNamesForm;
