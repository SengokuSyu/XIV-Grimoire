import type { Icon } from "./Icon.js";

export interface ItemUICategory {
  value: number;
  sheet: string;
  row_id: number;

  fields: {
    Name: string;
    Icon?: Icon;
  };
}
