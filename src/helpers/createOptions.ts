import { TAddresses } from "@/types";

export const getAddressOptions = (
  addresses: TAddresses[] | TAddresses | null | undefined
) => [
  {
    label: "Address",
    options: Array.isArray(addresses)
      ? addresses.map((address) => ({
          label: address.address,
          value: address.address,
        }))
      : addresses
      ? [
          {
            label: addresses.address,
            value: addresses.address,
          },
        ]
      : [],
  },
];
