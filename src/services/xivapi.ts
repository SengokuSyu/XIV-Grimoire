import axios from "axios";

const api = axios.create({
  baseURL: "https://v2.xivapi.com/api",
  timeout: 10000,
});

export interface SearchItemResult {
  score: number;
  sheet: string;
  row_id: number;
  fields: {
    Name: string;
    Icon?: {
      id: number;
      path: string;
      path_hr1?: string;
    };
  };
}

interface SearchResponse {
  results: SearchItemResult[];
}

export async function searchItem(
  name: string,
  language: string = "ja",
): Promise<SearchItemResult[]> {
  const { data } = await api.get<SearchResponse>("/search", {
    params: {
      sheets: "Item",
      query: `Name~"${name}"`,
      fields: "Name,Icon",
      language: language,
      limit: 10,
    },
  });

  return data.results;
}
