import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { createItemSelectMenu } from "../components/itemSelectMenu.js";

import type { Command } from "../types/Command.js";
import { searchItem } from "../services/xivapi.js";
import { createItemEmbed } from "../embeds/itemEmbed.js";
import { searchRecipe } from "../services/recipe.js";
import { getDcMarketPrice } from "../services/universalis.js";
import type { JapanDataCenter } from "../constants/dataCenters.js";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("item")
    .setDescription("FF14のアイテムを検索します")
    .addStringOption((option) =>
      option.setName("name").setDescription("アイテム名").setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("dc")
        .setDescription("マーケットを表示するデータセンター")
        .addChoices(
          { name: "Mana", value: "Mana" },
          { name: "Meteor", value: "Meteor" },
          { name: "Gaia", value: "Gaia" },
          { name: "Elemental", value: "Elemental" },
        )
        .setRequired(false),
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const name = interaction.options.getString("name", true);
    const dc = interaction.options.getString("dc") ?? "Mana";
    console.log("dc =", dc);

    const items = await searchItem(name);

    if (items.length === 0) {
      await interaction.reply({
        content: "アイテムが見つかりませんでした。",
        ephemeral: true,
      });

      return;
    }

    if (items.length > 1) {
      const row = createItemSelectMenu(items, dc as JapanDataCenter);

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
    const market = await getDcMarketPrice(dc as JapanDataCenter, item.row_id);
    const embed = createItemEmbed(item, canCraft, market);

    await interaction.reply({
      embeds: [embed],
    });
  },
};

export default command;
