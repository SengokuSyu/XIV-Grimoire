import axios from "axios";

const api = axios.create({
  baseURL: "https://v2.xivapi.com/api",
});

interface SearchRecipeResponse {
  results: {
    row_id: number;
  }[];
}

export async function searchRecipe(itemId: number) {
  const { data } = await api.get<SearchRecipeResponse>("/search", {
    params: {
      sheets: "Recipe",
      query: `ItemResult=${itemId}`,
      limit: 1,
    },
  });

  return data.results.length > 0;
}
