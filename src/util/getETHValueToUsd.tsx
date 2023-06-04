export const getETHValueTo1USD = async (currency: string) => {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${currency}&tsyms=ETH`
    );
    return response.json();
  };