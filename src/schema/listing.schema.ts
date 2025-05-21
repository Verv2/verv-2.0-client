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
  propertyType: z.enum(["FLAT", "BEDSIT"], {
    required_error: "Please select a type",
  }),
  size: z
    .number({
      required_error: "Please enter the property size",
      invalid_type_error: "Size must be a number",
    })
    .min(1, "Number of bedrooms is required"),
  bedrooms: z
    .number({
      required_error: "Please enter the number of bedrooms",
      invalid_type_error: "Number of bedrooms must be a number",
    })
    .min(1, "Number of bedrooms is required"),
  bathrooms: z
    .number({
      required_error: "Please enter the number of bathrooms",
      invalid_type_error: "Number of bathrooms must be a number",
    })
    .min(1, "Number of bathrooms is required"),
  furnishingOptions: z.enum(["FURNISHED", "UNFURNISHED", "CHOICE"], {
    required_error: "Please select an option",
  }),
  town: z
    .string({ required_error: "Please enter a town" })
    .min(1, "Town is required"),
  district: z
    .string({ required_error: "Please enter your district" })
    .min(1, "District is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .refine((val) => val.replace(/<(.|\n)*?>/g, "").trim() !== "", {
      message: "Description is required",
    }),
  monthlyRent: z
    .number({
      required_error: "Please enter monthly rent",
      invalid_type_error: "Monthly rent must be a number",
    })
    .min(1, "Monthly rent is required"),
  minimumTenancy: z
    .number({
      required_error: "Please enter the number of minimum tenancy",
      invalid_type_error: "Number of tenancy must be a number",
    })
    .min(1, "Number of tenancy is required"),
  weeklyRent: z
    .number({
      required_error: "Please enter the Weekly Rent",
      invalid_type_error: "Weekly Rent must be a number",
    })
    .min(1, "Weekly Rent is required"),
  maximumTenancy: z
    .number({
      required_error: "Please enter the number of maximum tenancy",
      invalid_type_error: "Number of maximum tenancy must be a number",
    })
    .min(1, "Maximum Number is required"),
  depositAmount: z
    .string({ required_error: "Please select a deposit amount" })
    .min(1, "Town is required"),
  billsIncluded: z.boolean().default(false),
  gardenAccess: z.boolean().default(false),
  parking: z.boolean().default(false),
  fireplace: z.boolean().default(false),

  studentAllowed: z.boolean().default(false),
  familiesAllowed: z.boolean().default(false),
  dssIncomeAccepted: z.boolean().default(false),
  petsAllowed: z.boolean().default(false),
  smokersAllowed: z.boolean().default(false),

  remoteVideoViewing: z.boolean().default(false),
  viewingDescription: z.string().optional(),
  youtubeUrl: z.string().optional(),
  termsAgreed: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must agree to the terms",
    }),
});

export type TListingSchema = z.infer<typeof listingSchema>;

export const propertyDetailsSchema = listingSchema.pick({
  postcode: true,
  houseNumber: true,
  address: true,
  address2: true,
  town: true,
  district: true,
  description: true,
  propertyType: true,
  size: true,
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
  parking: true,
  fireplace: true,

  studentAllowed: true,
  familiesAllowed: true,
  dssIncomeAccepted: true,
  petsAllowed: true,
  smokersAllowed: true,

  remoteVideoViewing: true,
  viewingDescription: true,
  youtubeUrl: true,
  termsAgreed: true,
});

export type TPropertyDetails = z.infer<typeof propertyDetailsSchema>;

export const propertyDetailsStoreSchema = z.object({
  propertyOption: z.enum([
    "Whole property",
    "Individual rooms",
    "Either whole property or individual rooms",
  ]),

  propertyDetails: z.object({
    postcode: z.string().min(1, "Postcode is required"),
    houseNumber: z.string().min(1, "House number is required"),
    address: z.string().min(1, "Address is required"),
    address2: z.string().optional(),
    propertyType: z.enum(["Flat", "Bedsit"]),
    bedrooms: z.number().min(1, "Number of bedrooms is required"),
    bathrooms: z.number().min(1, "Number of bathrooms is required"),
    furnishingOptions: z.enum(["Furnished", "Unfurnished", "Choice"]),
    town: z.string().min(1, "Town is required"),
    description: z.string().min(1, "Description is required"),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),

  tenancyDetails: z.object({
    monthlyRent: z.number().min(1, "Monthly Rent is required"),
    minimumTenancy: z.number().min(1, "Minimum Tenancy is required"),
    weeklyRent: z.number().min(1, "Weekly Rent is required"),
    maximumTenancy: z.number().min(1, "Maximum Tenancy is required"),
    depositAmount: z.string().min(1, "Deposit Amount is required"),
  }),

  features: z.object({
    billsIncluded: z.boolean().default(false),
    gardenAccess: z.boolean().default(false),
    parking: z.boolean().default(false),
    fireplace: z.boolean().default(false),
  }),

  tenantPreferences: z.object({
    studentAllowed: z.boolean().default(false),
    familiesAllowed: z.boolean().default(false),
    dssIncomeAccepted: z.boolean().default(false),
    petsAllowed: z.boolean().default(false),
    smokersAllowed: z.boolean().default(false),
  }),

  remoteVideoViewing: z.boolean().default(false),
  viewingDescription: z.string().optional(),
  youtubeUrl: z.string().optional(),
  termsAgreed: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms",
  }),
});

export type TPropertyDetailsStoreSchema = z.infer<
  typeof propertyDetailsStoreSchema
>;
