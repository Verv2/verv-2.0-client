/* eslint-disable @typescript-eslint/no-explicit-any */
export const buildQueryString = (
  existingParams: URLSearchParams,
  newParams: Record<string, any>
) => {
  const query = new URLSearchParams(existingParams.toString());

  Object.entries(newParams).forEach(([key, value]) => {
    const isInvalid =
      value === undefined ||
      value === null ||
      value === "" ||
      (typeof value === "number" && isNaN(value)) ||
      (typeof value === "boolean" && value === false);

    if (isInvalid) {
      query.delete(key);
    } else {
      query.set(key, String(value));
    }
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
};
