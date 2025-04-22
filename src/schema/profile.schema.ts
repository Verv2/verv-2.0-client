import { z } from "zod";

export const profileSchema = z.object({
  firstName: z
    .string({ required_error: "Please enter your first name" })
    .min(2, "First Name is required"),

  lastName: z
    .string({ required_error: "Please enter your last name" })
    .min(2, "Last Name is required"),

  phoneNumber: z
    .string({ required_error: "Please enter your phone number" })
    .min(2, "Phone Number is required"),
});

export const tenantProfileSchema = z.object({
  firstName: z
    .string({ required_error: "Please enter your first name" })
    .min(2, "First Name is required"),

  lastName: z
    .string({ required_error: "Please enter your last name" })
    .min(2, "Last Name is required"),

  phoneNumber: z
    .string({ required_error: "Please enter your phone number" })
    .min(2, "Phone Number is required"),

  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    required_error: "Please select an option",
  }),

  description: z
    .string({ required_error: "Please write something about you" })
    .min(2, "Description is required"),

  occupation: z
    .string({ required_error: "Please write your occupation" })
    .min(2, "Occupation is required"),

  age: z
    .number({
      required_error: "Please enter your age",
      invalid_type_error: "Age must be a number",
    })
    .min(1, "Age is required"),

  minBudget: z
    .number({
      required_error: "Please enter your minimum budget",
      invalid_type_error: "Budget must be a number",
    })
    .min(1, "Minimum Budget is required"),

  maxBudget: z
    .number({
      required_error: "Please enter your maximum budget",
      invalid_type_error: "Budget must be a number",
    })
    .min(1, "Maximum Budget is required"),

  minAge: z
    .number({
      required_error: "Please enter the minimum age",
      invalid_type_error: "Minimum age must be a number",
    })
    .min(1, "Minimum age is required"),

  maxAge: z
    .number({
      required_error: "Please enter the maximum age",
      invalid_type_error: "Maximum age must be a number",
    })
    .min(1, "Maximum age is required"),
});
