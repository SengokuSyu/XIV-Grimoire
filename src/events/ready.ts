import { Client, Events } from "discord.js";
import { searchItem } from "../services/xivapi.js";

export default {
  name: Events.ClientReady,
  once: true,

  async execute(client: Client) {
    console.log(`${client.user?.tag} が起動しました！`);
  },
};
