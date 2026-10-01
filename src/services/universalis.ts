import axios from "axios";

import {
  JAPAN_DATA_CENTERS,
  type JapanDataCenter,
} from "../constants/dataCenters.js";

const api = axios.create({
  baseURL: "https://universalis.app/api/v2",
});

export interface DcMarketPrice {
  minPrice: number;
  averagePrice: number;
}

export async function getDcMarketPrice(
  dc: JapanDataCenter,
  itemId: number,
): Promise<DcMarketPrice> {
  const worlds = JAPAN_DATA_CENTERS[dc];

  const { data } = await api.get(`/${worlds.join(",")}/${itemId}`);

  return {
    minPrice: data.minPriceHQ ?? data.minPrice,
    averagePrice: Math.round(data.averagePrice),
  };
}
