import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { createItemSelectMenu } from "../components/itemSelectMenu.js";

import type { Command } from "../types/Command.js";
import { searchItem } from "../services/xivapi.js";
import { createItemEmbed } from "../embeds/itemEmbed.js";
import { searchRecipe } from "../services/recipe.js";
import { getDcMarketPrice } from "../services/universalis.js";

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

    if (items.length > 1) {
      const row = createItemSelectMenu(items);

      await interaction.reply({
        content: `「${name}」の検索結果です。表示するアイテムを選択してください。`,
        components: [row],
      });

      return;
    }

    const item = items[0]!;

    console.dir(items[0], { depth: null });
    console.dir(item.fields.LevelItem, { depth: null });

    const canCraft = await searchRecipe(item.row_id);
    // Meteor固定にしている。後に修正。
    const market = await getDcMarketPrice("Meteor", item.row_id);
    const embed = createItemEmbed(item, canCraft);

    await interaction.reply({
      embeds: [embed],
    });
  },
};

export default command;
