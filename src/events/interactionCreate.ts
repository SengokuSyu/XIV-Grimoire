import { type Interaction, Events } from "discord.js";

export default {
  name: Events.InteractionCreate,

  async execute(interaction: Interaction) {
    console.log("interactionCreate");
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
          content: "コマンド実行中にエラーが発生しました。",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "コマンド実行中にエラーが発生しました。",
          ephemeral: true,
        });
      }
    }
  },
} as const;
