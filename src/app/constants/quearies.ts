export const furnishingOptions = [
  {
    label: "Furnished",
    value: "FURNISHED",
  },
  {
    label: "Unfurnished",
    value: "UNFURNISHED",
  },
  {
    label: "Choice",
    value: "CHOICE",
  },
];

export const propertyTypes = [
  {
    label: "Flat",
    value: "FLAT",
  },
  {
    label: "Bedsit",
    value: "BEDSIT",
  },
];

export const checkBoxOptions: {
  name:
    | "billsIncluded"
    | "gardenAccess"
    | "parking"
    | "fireplace"
    | "studentAllowed"
    | "familiesAllowed"
    | "dssIncomeAccepted"
    | "petsAllowed"
    | "smokersAllowed";
  label: string;
  defaultValue: boolean;
}[] = [
  {
    name: "billsIncluded",
    label: "Bills Included",
    defaultValue: false,
  },
  {
    name: "gardenAccess",
    label: "Garden Access",
    defaultValue: false,
  },
  {
    name: "parking",
    label: "Parking",
    defaultValue: false,
  },
  {
    name: "fireplace",
    label: "Fireplace",
    defaultValue: false,
  },
  {
    name: "studentAllowed",
    label: "Students Allowed",
    defaultValue: false,
  },
  {
    name: "familiesAllowed",
    label: "Families Allowed",
    defaultValue: false,
  },
  {
    name: "dssIncomeAccepted",
    label: "dss Income Accepted",
    defaultValue: false,
  },
  {
    name: "petsAllowed",
    label: "Pets Allowed",
    defaultValue: false,
  },
  {
    name: "smokersAllowed",
    label: "Smokers Allowed",
    defaultValue: false,
  },
];
