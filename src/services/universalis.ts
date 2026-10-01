import axios from "axios";

const api = axios.create({
  baseURL: "https://universalis.app/api/v2",
});

export async function getMarketPrice(world: string, itemId: number) {
  const { data } = await api.get(`/${world}/${itemId}`);

  return {
    minPrice: data.minPriceHQ ?? data.minPrice,
    averagePrice: Math.round(data.averagePrice),
  };
}
