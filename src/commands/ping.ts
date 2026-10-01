import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import type { Command } from "../types/Command.js";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Botの応答を確認します"),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply("🏓 Pong!");
  },
};

export default command;
