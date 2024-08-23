const { Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const fs = require("fs");
const config = require("./config.json");
require("dotenv").config();

const guildId = config.guildId;
const clientId = config.userId;

const commandDirs = fs
  .readdirSync(`${__dirname}/commands`, { withFileTypes: true })
  .filter((file) => file[Object.getOwnPropertySymbols(file)[0]] === 2);
const commands = [];

commandDirs.forEach((commandDir) => {
  let commandFiles = fs
    .readdirSync(`${__dirname}/commands/${commandDir.name}`)
    .filter((file) => file.endsWith(".js"));
  commandFiles.forEach((commandFile) => {
    const command = require(`${__dirname}/commands/${commandDir.name}/${commandFile}`);
    if (command.data && !command.botOwnerOnly)
      commands.push(command.data.toJSON());
  });
});

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

rest
  .put(
    // Routes.applicationGuildCommands(clientId, guildId), { body: commands } // Guild commands
    Routes.applicationCommands(clientId),
    { body: commands } // Global commands
  )
  .then((data) =>
    console.log(`Successfully registered ${data.length} application commands.`)
  )
  .catch(console.error);
