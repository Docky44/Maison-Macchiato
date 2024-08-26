const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} = require("discord.js");
const colors = require("colors");
const { readdirSync } = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();
require("./deploy-commands");

mongoose.set("strictQuery", false);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.User,
  ],
  restTimeOffset: 0,
  failIfNotExists: false,
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: false,
  },
});
client.config = require("./config.json");

client.color = 0x00ffa5;
client.colorWarn = 0xffa500;
client.colorError = 0xff0000;
client.colorSucces = 0x00ff00;

// chargement des events
const eventFolder = readdirSync(`${__dirname}/events`);
for (const file of eventFolder) {
  const eventfile = readdirSync(`${__dirname}/events/${file}`).filter((files) =>
    files.endsWith(".js")
  );
  for (const files of eventfile) {
    const event = require(`./events/${file}/${files}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
      client.on(event.name, (...args) => event.execute(client, ...args));
    }
  }
}

// chargement des commandes
client.commands = new Collection();
const commandFolders = readdirSync(`${__dirname}/commands`);
for (const folder of commandFolders) {
  const commandFiles = readdirSync(`${__dirname}/commands/${folder}`).filter(
    (file) => file.endsWith(".js")
  );
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

//client.dbGuild = require('./database/guild.js');
//client.dbSanction = require('./database/sanction.js');
//// je me connect a mongoDb
//mongoose.connect(process.env.MONGODB, {
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
//    autoIndex: false,
//}).then(() => {
//    console.log(`[MONGODB] Connecté à la base de données MongoDB réaliser avec succes.`.green);
//}).catch((err) => {
//    console.log(`[MONGODB] Erreur lors de la connexion à la base de données MongoDB: ${err}`.red);
//});

client.login(process.env.TOKEN);
// gestion des erreurs
process.on("unhandledRejection", (error) => {
  console.log(`[ERROR] ${error}`);
});
