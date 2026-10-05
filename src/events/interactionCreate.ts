import {
  type Interaction,
  Events,
  StringSelectMenuInteraction,
} from "discord.js";

import { getItemById } from "../services/xivapi.js";
import { createItemEmbed } from "../embeds/itemEmbed.js";
import { searchRecipe } from "../services/recipe.js";
import { getDcMarketPrice } from "../services/universalis.js";
import type { JapanDataCenter } from "../constants/dataCenters.js";

export default {
  name: Events.InteractionCreate,

  async execute(interaction: Interaction) {
    if (interaction.isStringSelectMenu()) {
      const value = interaction.values[0];

if (!value) {
  await interaction.reply({
    content: "アイテム情報の取得に失敗しました。",
    ephemeral: true,
  });
  return;
}

const [dc, itemId] = value.split(":");

      console.log(itemId);

      const item = await getItemById(Number(itemId));

      const canCraft = await searchRecipe(item.row_id);
      const market = await getDcMarketPrice(dc as JapanDataCenter, item.row_id);
      const embed = createItemEmbed(item, canCraft, market);

      await interaction.update({
        content: "",
        embeds: [embed],
        components: [],
      });

      console.dir(item, { depth: null });

      return;
    }

    if (!interaction.isChatInputCommand()) {
      return;
    }

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`コマンド "${interaction.commandName}" が見つかりません。`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "コマンド実行中にエラーが発生しました。1",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "コマンド実行中にエラーが発生しました。2",
          ephemeral: true,
        });
      }
    }
  },
} as const;
