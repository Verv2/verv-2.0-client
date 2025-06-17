import {
  checkBoxOptions,
  furnishingOptions,
  propertyTypes,
} from "@/app/constants/quearies";
import { LocationIcon, SelectBedIcon } from "@/assets/icons/icons";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buildQueryString } from "@/helpers/buildQueryString";
import { PoundSterling, Search, SlidersHorizontal } from "lucide-react";
import { ReadonlyURLSearchParams, useRouter } from "next/navigation";
import React from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

const SearchAndQueries = ({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
}) => {
  const router = useRouter();

  //   default value for the form fields based on the searchParams
  const defaultValues = {
    searchTerm: searchParams.get("searchTerm") || "",
    bedrooms: searchParams.get("bedrooms")
      ? Number(searchParams.get("bedrooms"))
      : undefined,
    minMonthlyRent: searchParams.get("minMonthlyRent")
      ? Number(searchParams.get("minMonthlyRent"))
      : undefined,
    maxMonthlyRent: searchParams.get("maxMonthlyRent")
      ? Number(searchParams.get("maxMonthlyRent"))
      : undefined,
    furnishingOptions: searchParams.get("furnishingOptions") || "",
    propertyType: searchParams.get("propertyType") || "",
    billsIncluded: searchParams.get("billsIncluded") === "true" ? true : false,
    gardenAccess: searchParams.get("gardenAccess") === "true" ? true : false,
    parking: searchParams.get("parking") === "true" ? true : false,
    fireplace: searchParams.get("fireplace") === "true" ? true : false,
    studentAllowed:
      searchParams.get("studentAllowed") === "true" ? true : false,
    familiesAllowed:
      searchParams.get("familiesAllowed") === "true" ? true : false,
    dssIncomeAccepted:
      searchParams.get("dssIncomeAccepted") === "true" ? true : false,
    petsAllowed: searchParams.get("petsAllowed") === "true" ? true : false,
    smokersAllowed:
      searchParams.get("smokersAllowed") === "true" ? true : false,
  };

  const { control, register, handleSubmit } = useForm({ defaultValues });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("Search submitted:", data);
    const queryString = buildQueryString(searchParams, data);
    const finalURL = `/all-listings${queryString}`;
    console.log("finalURL", finalURL);
    router.push(finalURL);
  };

  return (
    <>
      <section className="inline-flex h-[160px] p-[52px_352px] justify-center items-center flex-shrink-0 bg-[#EEF1F3]">
        <div className="w-[1216px] h-14 m-auto flex justify-center items-center">
          <form
            className="w-full h-full flex justify-between items-center gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-[972px] h-full pr-2 py-[2px] flex justify-between items-center gap-1 bg-white rounded-[32px] border border-solid border-[#CED3D9]">
              {/* location or area */}
              <div className="relative w-[40%]">
                <div className="absolute left-2 top-1/2 -translate-y-1/2">
                  <LocationIcon width={18} height={20} />
                </div>
                <Input
                  type="text"
                  placeholder="e.g. Oxford or NW3"
                  {...register("searchTerm")}
                  className="h-[52px] pl-8 rounded-l-[32px] border-none"
                />
              </div>

              {/* bedrooms */}
              <div className="relative w-[20%]">
                <div className="absolute left-1 top-1/2 -translate-y-1/2">
                  <SelectBedIcon />
                </div>
                <Input
                  type="number"
                  placeholder="Bedrooms"
                  {...register("bedrooms", { valueAsNumber: true })}
                  className="pl-8 h-[52px] border-none"
                />
              </div>

              {/* min price */}
              <div className="relative w-[20%]">
                <div className="absolute left-1 top-1/2 -translate-y-1/2">
                  <PoundSterling size={20} color="#50B533" />
                </div>
                <Input
                  type="number"
                  placeholder="Min Price"
                  {...register("minMonthlyRent", { valueAsNumber: true })}
                  className="pl-8 h-[52px] border-none"
                />
              </div>

              {/* max price */}
              <div className="relative w-[20%]">
                <div className="absolute left-1 top-1/2 -translate-y-1/2">
                  <PoundSterling size={20} color="#50B533" />
                </div>
                <Input
                  type="number"
                  placeholder="Max Price"
                  {...register("maxMonthlyRent", { valueAsNumber: true })}
                  className="pl-8 h-[52px] border-none"
                />
              </div>

              {/* min price */}

              <Button className="w-[120px] h-[40px] rounded-[32px] bg-colorButton">
                <Search /> Search
              </Button>
            </div>
            {/* advanced filter modal*/}
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    className="w-[220px] h-[56px] px-4 py-2 rounded-[32px] bg-white text-lg font-medium text-colorTextPrimary hover:text-white"
                  >
                    <SlidersHorizontal />
                    Advanced Filter
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[25%] h-[80vh]">
                  <AlertDialogHeader>
                    <DialogTitle>Advanced Filter</DialogTitle>
                    <DialogDescription>
                      Select the filter according to your wishes
                    </DialogDescription>
                  </AlertDialogHeader>
                  <div className="space-y-4">
                    {/* furnishingOptions */}
                    <div>
                      <Controller
                        name="furnishingOptions"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select furnishing option" />
                            </SelectTrigger>
                            <SelectContent>
                              {furnishingOptions.map((item, index) => (
                                <SelectItem key={index} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>

                    {/* propertyType */}
                    <div>
                      <Controller
                        name="propertyType"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                            <SelectContent>
                              {propertyTypes.map((item, index) => (
                                <SelectItem key={index} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>

                    {/* Bills Included Checkbox */}
                    {checkBoxOptions.map((option, index) => (
                      <Controller
                        key={index}
                        name={option.name}
                        control={control}
                        defaultValue={option.defaultValue}
                        render={({ field }) => (
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="w-6 h-6 border-gray-400 data-[state=checked]:bg-colorButton data-[state=checked]:border-colorButton"
                            />
                            <Label htmlFor={option.name}>{option.label}</Label>
                          </div>
                        )}
                      />
                    ))}
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SearchAndQueries;
