import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import type { Command } from "../types/Command.js";
import { searchItem } from "../services/xivapi.js";
import { EmbedBuilder } from "discord.js";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("item")
    .setDescription("FF14のアイテムを検索します")
    .addStringOption((option) =>
      option.setName("name").setDescription("アイテム名").setRequired(true),
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const name = interaction.options.getString("name", true);

    const items = await searchItem(name);

    if (items.length === 0) {
      await interaction.reply({
        content: "アイテムが見つかりませんでした。",
        ephemeral: true,
      });

      return;
    }

    const item = items[0];

    if (!item) {
      await interaction.reply({
        content: "アイテムが見つかりませんでした。",
        ephemeral: true,
      });

      return;
    }

    console.dir(items[0], { depth: null });
    console.dir(item.fields.LevelItem, { depth: null });

    const itemLevel = item.fields.LevelItem?.value ?? 0;
    const category = item.fields.ItemUICategory?.fields.Name ?? "-";
    const price = item.fields.PriceMid
      ? `${item.fields.PriceMid} Gil`
      : "販売なし";

    const embed = new EmbedBuilder()
      .setColor(0xc2a55f) // FF14風のゴールド
      .setTitle(item.fields.Name)
      .setDescription(item.fields.Description ?? "説明はありません。")
      .addFields(
        {
          name: "🆔 アイテムID",
          value: item.row_id.toString(),
        },
        {
          name: "⭐ アイテムレベル",
          value: "Lv. " + itemLevel.toString(),
        },
        {
          name: "📦 カテゴリ",
          value: category,
        },
        {
          name: "📍 NPC販売価格",
          value: price.toString(),
        },
        {
          name: "🏪 マーケット",
          value: item.fields.IsUntradable ? "取引不可 ❌" : "取引可能 ✅",
        },
      )
      .setFooter({
        text: "XIV Grimoire",
      })
      .setTimestamp();

    if (item.fields.Icon?.path) {
      embed.setThumbnail(
        `https://v2.xivapi.com/api/asset?path=${encodeURIComponent(item.fields.Icon.path)}&format=png`,
      );
    }

    await interaction.reply({
      embeds: [embed],
    });
  },
};

export default command;
