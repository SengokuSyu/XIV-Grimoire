import axios from "axios";
import type { SearchItem } from "../types/xivapi/SearchItem.js";
import type { Item } from "../types/xivapi/Item.js";

const api = axios.create({
  baseURL: "https://v2.xivapi.com/api",
  timeout: 10000,
});

interface SearchResponse {
  results: SearchItem[];
}

export async function searchItem(
  name: string,
  language: string = "ja",
): Promise<SearchItem[]> {
  const { data } = await api.get<SearchResponse>("/search", {
    params: {
      sheets: "Item",
      query: `Name~"${name}"`,
      fields:
        "Name,Description,Icon,LevelItem,ItemUICategory,PriceMid, IsUntradable",
      language: language,
      limit: 10,
    },
  });

  return data.results;
}

export async function getItemById(itemId: number): Promise<Item> {
  const { data } = await api.get(`/sheet/Item/${itemId}`, {
    params: {
      fields:
        "Name,Description,Icon,LevelItem,ItemUICategory,PriceLow,PriceMid,IsUntradable",
      language: "ja",
    },
  });

  return data;
}
