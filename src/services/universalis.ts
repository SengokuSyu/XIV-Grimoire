import axios from "axios";

import type { JapanDataCenter } from "../constants/dataCenters.js";

const api = axios.create({
  baseURL: "https://universalis.app/api/v2",
  timeout: 5000,
});

export interface DcMarketPrice {
  minPrice: number;
  worldName: string;
}

export async function getDcMarketPrice(
  dc: JapanDataCenter,
  itemId: number,
): Promise<DcMarketPrice> {
  try {
    const { data } = await api.get(`/${dc}/${itemId}`);

    const listing = data.listings?.[0];

    return {
      minPrice: listing?.pricePerUnit ?? 0,
      worldName: listing?.worldName ?? "-",
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return {
        minPrice: 0,
        worldName: "-",
      };
    }

    throw error;
  }
}
