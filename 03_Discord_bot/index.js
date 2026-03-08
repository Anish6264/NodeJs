require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { askGPT } = require("./services/gptservices");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  try {
    await message.channel.sendTyping(); // shows typing indicator

    const reply = await askGPT(message.content);

    await message.reply(reply);
  } catch (error) {
    console.error(error);
    message.reply("Something went wrong.");
  }
});

client.login(process.env.token);
