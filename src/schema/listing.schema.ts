import { z } from "zod";

export const listingSchema = z.object({
  propertyOption: z.enum(
    [
      "Whole property",
      "Individual rooms",
      "Either whole property or individual rooms",
    ],
    { required_error: "Please select an option" }
  ),

  postcode: z
    .string({ required_error: "Please enter a postcode" })
    .min(1, "Postcode is required"),
  houseNumber: z
    .string({
      required_error: "Please enter flat or house number",
    })
    .min(1, "Postcode is required"),
  address: z
    .string({ required_error: "Please enter the address" })
    .min(1, "Address is required"),
  address2: z.string().optional(),
  propertyType: z.enum(["Flat", "Bedsit"], {
    required_error: "Please select a type",
  }),
  bedrooms: z
    .string({
      required_error: "Please enter the number of bedrooms",
    })
    .min(1, "Number of bedrooms is required"),
  bathrooms: z
    .string({
      required_error: "Please enter the number of bathrooms",
    })
    .min(1, "Number of bathrooms is required"),
  furnishingOptions: z.enum(["Furnished", "Unfurnished", "Choice"], {
    required_error: "Please select an option",
  }),
  town: z
    .string({ required_error: "Please enter a town" })
    .min(1, "Town is required"),
  propertyDescription: z.string({
    required_error: "Please add a description",
  }),
  monthlyRent: z
    .string({ required_error: "Please add a monthly rent" })
    .min(1, "Monthly Rent is required"),
  minimumTenancy: z
    .string({
      required_error: "Please enter the minimum number of tenancy",
    })
    .min(1, "Minimum Number is required"),
  weeklyRent: z
    .string({
      required_error: "Please add a weekly rent",
    })
    .min(1, "Weekly Rent is required"),
  maximumTenancy: z
    .string({
      required_error: "Please enter the maximum number of tenancy",
    })
    .min(1, "Maximum Number is required"),
  depositAmount: z
    .string({
      required_error: "Please enter an deposit amount",
    })
    .min(1, "Deposit Amount is required"),
  billsIncluded: z.boolean().default(false),
  gardenAccess: z.boolean().default(false),
});

export type TListingSchema = z.infer<typeof listingSchema>;

export const propertyDetailsSchema = listingSchema.pick({
  postcode: true,
  houseNumber: true,
  address: true,
  address2: true,
  town: true,
  propertyType: true,
  bedrooms: true,
  bathrooms: true,
  furnishingOptions: true,
  monthlyRent: true,
  minimumTenancy: true,
  weeklyRent: true,
  maximumTenancy: true,
  depositAmount: true,
  billsIncluded: true,
  gardenAccess: true,
});

export type TPropertyDetails = z.infer<typeof propertyDetailsSchema>;
