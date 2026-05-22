export function extractCityZip(address: string) {
  const splittedAddress = address.split(", ");
  const cityZip =
    !splittedAddress[1] || !splittedAddress[2]
      ? ""
      : `${splittedAddress[1]}, ${splittedAddress[2]}`;
  return cityZip;
}
