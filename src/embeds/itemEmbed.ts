import { EmbedBuilder } from "discord.js";
import type { Item } from "../types/xivapi/Item.js";

export function createItemEmbed(item: Item, canCraft: boolean) {
  const itemLevel = item.fields.LevelItem?.value ?? 0;
  const category = item.fields.ItemUICategory?.fields.Name ?? "-";

  const embed = new EmbedBuilder()
    .setColor(0xc2a55f)
    .setTitle(item.fields.Name)
    .setDescription(item.fields.Description || "説明はありません。")
    .addFields(
      {
        name: "🆔 アイテムID",
        value: item.row_id.toString(),
      },
      {
        name: "⭐ アイテムレベル",
        value: itemLevel.toString(),
      },
      {
        name: "📦 カテゴリ",
        value: category,
      },
      {
        name: "📍 NPC販売価格",
        value:
          !item.fields.PriceMid || item.fields.PriceMid >= 99999
            ? "NPC販売なし"
            : `${item.fields.PriceMid}Gil`,
        inline: false,
      },
      {
        name: "🏪 マーケット",
        value: item.fields.IsUntradable ? "取引不可 ❌" : "取引可能 ✅",
        inline: false,
      },
      {
        name: "🛠️ 製作",
        value: canCraft ? "製作可能 ✅" : "製作不可 ❌",
        inline: true,
      },
    )
    .setFooter({
      text: "XIV Grimoire",
    });

  if (item.fields.Icon?.path) {
    embed.setThumbnail(
      `https://v2.xivapi.com/api/asset?path=${encodeURIComponent(
        item.fields.Icon.path,
      )}&format=png`,
    );
  }

  return embed;
}
