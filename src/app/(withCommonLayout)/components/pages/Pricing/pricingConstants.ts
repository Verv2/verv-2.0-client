type TOffer = {
  item: string;
};

export type TPricingPlan = {
  id: number;
  pricingTitle: string;
  planId: string;
  buttonName: string;
  buttonColor: string;
  buttonText: string;
  bgClr: string;
  advertTitle: string;
  offers: TOffer[];
  price?: number; // Optional since it's missing in the first object
};

export type TAdditionalService = {
  id: number;
  title: string;
  price: number;
};

export const pricingData: TPricingPlan[] = [
  {
    id: 1,
    pricingTitle: "Listing Only",
    planId: "listing-only",
    buttonName: "Add Listing Now for Free",
    buttonColor: "bg-[#FFFFFF]",
    buttonText: "text-[#314660]",
    bgClr: "bg-[#EEF1F3]",
    advertTitle: "Active Listing on",
    offers: [
      {
        item: "Listings on multiple platforms",
      },
      {
        item: "Message prospective tenants",
      },
      {
        item: "Arrange viewings",
      },
      {
        item: "Active listings for 3 months",
      },
    ],
  },
  {
    id: 2,
    pricingTitle: "Rent Ready",
    planId: "rent-ready",
    price: 54.99,
    buttonName: "Add Listing Now",
    buttonColor: "bg-[#50B533]",
    buttonText: "text-[#FFFFFF]",
    bgClr: "bg-[#EEF8EB]",
    advertTitle: "3 Months Adverting on",
    offers: [
      {
        item: "Listings on multiple platforms",
      },
      {
        item: "Message prospective tenants",
      },
      {
        item: "Arrange viewings",
      },
      {
        item: "Active listings for 3 months",
      },
    ],
  },
  {
    id: 3,
    pricingTitle: "Premier Listings",
    planId: "premier-listings",
    price: 74.99,
    buttonName: "Add Listing Now",
    buttonColor: "bg-[#314660]",
    buttonText: "text-[#FFFFFF]",
    bgClr: "bg-[#F5F5F5]",
    advertTitle: "3 Months Adverting on",
    offers: [
      {
        item: "Listings on multiple platforms",
      },
      {
        item: "Message prospective tenants",
      },
      {
        item: "Arrange viewings",
      },
      {
        item: "Active listings for 3 months",
      },
    ],
  },
];

export const additionalServicesData: TAdditionalService[] = [
  {
    id: 1,
    title: "Tenant Referencing",
    price: 19.99,
  },
  {
    id: 2,
    title: "Rent Collection",
    price: 39.99,
  },
  {
    id: 3,
    title: "Gas Safety Certificate (CP12)",
    price: 54.99,
  },
  {
    id: 4,
    title: "Energy Performance Certificate (EPC)",
    price: 85.99,
  },
  {
    id: 9,
    title: "Electrical Safety Certificate (EICR)",
    price: 75.99,
  },
  {
    id: 5,
    title: "Inventory & Check-In/Out",
    price: 95.99,
  },
  {
    id: 6,
    title: "Pro Photos",
    price: 25.99,
  },
  {
    id: 7,
    title: "Floor Plans",
    price: 9.99,
  },
  {
    id: 8,
    title: "Accompanied Viewings Service",
    price: 29.99,
  },
];
