const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Afficher le ping du bot.",
  categorie: "utils",
  guildOwnerOnly: false,
  botOwnerOnly: false,

  async executeSlash(client, interaction, functionJS) {
    functionJS
      .embed(
        interaction,
        `🏓 **Mon ping est de :** ${client.ws.ping} ms.`,
        false,
        client.color
      )
      .catch(() => {});
  },
  get data() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description);
  },
};
