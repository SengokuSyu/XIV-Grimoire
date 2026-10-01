import { ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";

import type { Item } from "../types/xivapi/Item.js";

export function createItemSelectMenu(items: Item[]) {
  const menu = new StringSelectMenuBuilder()
    .setCustomId("item-select")
    .setPlaceholder("アイテムを選択してください");

  menu.addOptions(
    items.slice(0, 25).map((item) => ({
      label: item.fields.Name,
      value: item.row_id.toString(),
      description: `ID: ${item.row_id}`,
    })),
  );

  return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu);
}
