/* eslint-disable @typescript-eslint/no-explicit-any */
export const buildQueryString = (
  existingParams: URLSearchParams,
  newParams: Record<string, any>
) => {
  const query = new URLSearchParams(existingParams.toString());

  Object.entries(newParams).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      !(typeof value === "number" && isNaN(value))
    ) {
      query.set(key, String(value));
    }
  });

  return `?${query.toString()}`;
};
