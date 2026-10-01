import "dotenv/config";
import readyEvent from "./events/ready.js";
import interactionCreateEvent from "./events/interactionCreate.js";
import pingCommand from "./commands/ping.js";

import { Client, Collection, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

client.commands.set(pingCommand.data.name, pingCommand);

if (readyEvent.once) {
  client.once("ready", (...args) => readyEvent.execute(args[0] as Client));
}

client.on(
  interactionCreateEvent.name,
  interactionCreateEvent.execute
);

client.login(process.env.DISCORD_TOKEN);
