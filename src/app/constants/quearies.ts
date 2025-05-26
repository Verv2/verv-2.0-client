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
  name: "billsIncluded" | "gardenAccess" | "studentAllowed";
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
    name: "studentAllowed",
    label: "Students Allowed",
    defaultValue: false,
  },
];
