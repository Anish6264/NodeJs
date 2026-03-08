require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "create",
    description: "create a new short URL",
  },
];

const rest = new REST({ version: "10" }).setToken(
  process.env.token
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.clientId), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
