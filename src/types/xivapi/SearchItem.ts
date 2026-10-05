import type { Item } from "./Item.js";

export interface SearchItem extends Item {
  score: number;
  sheet: string;
}
