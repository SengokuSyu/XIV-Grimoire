import type { Icon } from "./Icon.js";
import type { ItemLevel } from "./ItemLevel.js";
import type { ItemUICategory } from "./ItemUICategory.js";

export interface Item {
  row_id: number;

  fields: {
    Name: string;
    Description?: string;

    Icon?: Icon;

    LevelItem?: ItemLevel;

    ItemUICategory?: ItemUICategory;

    PriceMid?: number;

    IsUntradable?: boolean;
  };
}
