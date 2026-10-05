import { ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";

import type { Item } from "../types/xivapi/Item.js";
import type { JapanDataCenter } from "../constants/dataCenters.js";

export function createItemSelectMenu(items: Item[], dc: JapanDataCenter) {
  const menu = new StringSelectMenuBuilder()
    .setCustomId("item-select")
    .setPlaceholder("アイテムを選択してください");

  menu.addOptions(
    items.slice(0, 25).map((item) => ({
      label: item.fields.Name,
      value: `${dc}:${item.row_id}`,
      description: `ID: ${item.row_id}`,
    })),
  );

  return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu);
}
