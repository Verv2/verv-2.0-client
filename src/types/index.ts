/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { ZodType } from "zod";
import {
  Control,
  DefaultValues,
  FieldErrors,
  FieldValues,
  Path,
  SubmitHandler,
  UseFormRegister,
} from "react-hook-form";

export interface IUser {
  id: string;
  email: string;
  role: string;
}

export interface IUserContext {
  id: string;
  email: string;
  password: string;
  role: "SUPER_ADMIN" | "ADMIN" | "LANDLORD" | "TENANT";
  isProfileUpdated: boolean;
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  passwordChangedAt: string;
  createdAt: string;
  updatedAt: string;
  tenant?: any;
  landlord?: any;
  admin?: any;
  review?: any;
}

export interface ITrustPilot {
  showGrow?: boolean;
  showTrustPilot?: boolean;
}

export interface IProperty {
  id: number;
  title: string;
  address: IAddress;
  pricePerMonth: number;
  currency: string;
  status: "POPULAR" | "AVAILABLE" | "RENTED" | string;
  features: IFeatures;
  image: string;
}

interface IAddress {
  street: string;
  city: string;
  state: string;
}

interface IFeatures {
  beds: number;
  bathrooms: number;
  size: ISize;
}

interface ISize {
  width: number;
  length: number;
  unit: "m²" | "sq ft" | string;
}

export type TVForm<T> = {
  children: ReactNode;
  schema: ZodType<T>;
  onSubmit: (data: T) => void;
  defaultValues?: DefaultValues<T>;
};

export interface IFormConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

export interface IFormProps extends IFormConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
}

export interface InputFieldProps {
  className?: string;
  registerName: string;
  label?: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<any>;
  errors?: FieldErrors<any>;
}

interface IOptionGroup {
  label: string;
  options: { value: string; label: string }[];
}

export interface ISelectFieldProps<T extends FieldValues> {
  className?: string;
  registerName: Path<T>; // Ensures correct key type from the form schema
  label?: string;
  control: Control<T>; // Correctly typed control
  errors?: FieldErrors<T>;
  options: IOptionGroup[];
}

export interface ICheckboxFieldProps<T extends FieldValues> {
  registerName: Path<T>;
  label: string;
  control: Control<T>;
  //   errors?: FieldErrors<T>;
}

export type TPropertyDetails = {
  postcode: string;
  address: string;
  address2?: string;
  houseNumber: string;
  town: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  furnishingOptions: string;
  description: string;
};

export type TTenancyDetails = {
  monthlyRent: number;
  minimumTenancy: number;
  weeklyRent: number;
  maximumTenancy: number;
  depositAmount: string;
  moveInDate?: string;
};

export type TFeatures = {
  billsIncluded: boolean;
  gardenAccess: boolean;
  parking: boolean;
  fireplace: boolean;
};

export type TTenantPreferences = {
  studentAllowed: boolean;
  familiesAllowed: boolean;
  dssIncomeAccepted: boolean;
  petsAllowed: boolean;
  smokersAllowed: boolean;
};

export type TPropertyDetailsState = {
  propertyDetails: TPropertyDetails;
  tenancyDetails: TTenancyDetails;
  features: TFeatures;
  tenantPreferences: TTenantPreferences;
  remoteVideoViewing: boolean;
  viewingDescription: string;
  youtubeUrl: string;
  termsAgreed: boolean;
  setData: (data: Partial<TPropertyDetailsState>) => void;
};

export interface IFileState {
  files: File[];
  setFilesToStore: (files: File[]) => void;
  clearFilesFromStore: () => void;
}

export type TGeneratePropertyDescription = {
  postcode: string;
  address: string;
  address2?: string;
  houseNumber: string;
  town: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  furnishingOptions: string;
  description: string;
};

// Zustand Store
export interface IStoredFile {
  fileName: string;
  fileType: string;
  fileData: ArrayBuffer;
  fileURL?: string;
  file?: File;
}

export interface IFileStoreState {
  files: IStoredFile[];
  setFiles: (files: File[]) => Promise<void>;
  loadFiles: () => Promise<void>;
  clearFiles: () => Promise<void>;
}

export type TListingData = {
  propertyOption: string;
  address: string;
  address2?: string;
  town: string;
  bathrooms: number;
  bedrooms: number;
  description: string;
  furnishingOptions: string;
  houseNumber: string;
  postcode: string;
  propertyType: string;
  propertyImages: string[];
  remoteVideoViewing: boolean;
  youtubeUrl: string;
  termsAgreed: boolean;
  features: TFeatures;
  tenancyDetails: TTenancyDetails;
  tenantPreferences: TTenantPreferences;
};

export type TPaymentUserData = {
  email: string | undefined;
  fullName: string | undefined;
  phoneNumber: string | undefined;
};

export type TPaymentProps = {
  amount: number;
  planId: string | null;
  userData: TPaymentUserData;
};

export type TPaymentSuccess = {
  planId: string;
  transactionId: string;
  propertyFor: "RENT" | "SALE";
};
