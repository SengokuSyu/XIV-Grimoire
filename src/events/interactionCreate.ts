import {
  type Interaction,
  Events,
  StringSelectMenuInteraction,
} from "discord.js";

import { getItemById } from "../services/xivapi.js";
import { createItemEmbed } from "../embeds/itemEmbed.js";
import { searchRecipe } from "../services/recipe.js";

export default {
  name: Events.InteractionCreate,

  async execute(interaction: Interaction) {
    if (interaction.isStringSelectMenu()) {
      const itemId = Number(interaction.values[0]);

      console.log(itemId);

      const item = await getItemById(itemId);

      const canCraft = await searchRecipe(item.row_id);
      const embed = createItemEmbed(item, canCraft);

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
