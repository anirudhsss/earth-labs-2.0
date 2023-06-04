import { getETHValueTo1USD } from "./getETHValueToUsd";

export async function convertUsdToEth(
  price: number,
  currency: string = "USD",
  toFixedValue = 4
) {
  const ethToUsdValue: any = await getETHValueTo1USD(currency);
  const value = price * ethToUsdValue?.ETH ?? 1;
  const ethValue = parseFloat(value.toFixed(toFixedValue));
  return ethValue ?? 0;
}
