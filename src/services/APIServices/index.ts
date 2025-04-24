import envConfig from "@/config/envConfig";

export const getAddresses = async (postcode: string) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
  };

  const url = `https://api.getAddress.io/autocomplete/${postcode}?api-key=${envConfig.getAddressAPIKey}`;

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
