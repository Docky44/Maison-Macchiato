const { InteractionType } = require("discord.js");
const functionJS = require("../../function/functionJS");

module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
    let owner = await client.users.fetch(interaction.guild.ownerId);
    if (!interaction.guild) return;

    if (interaction.type === InteractionType.ApplicationCommand) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      // check permissions
      if (command.botOwnerOnly) {
        if (!client.config.owner.includes(interaction.user.id))
          return interaction
            .reply({
              content: `:x: **Vous devez être le propriétaire du bot pour exécuter cette commande.**`,
              ephemeral: true,
            })
            .catch(() => {});
      }

      if (command.guildOwnerOnly) {
        if (
          interaction.member.guild.ownerId !== interaction.user.id &&
          !client.config.owner.includes(interaction.user.id)
        )
          return interaction
            .reply({
              content: `:x: **Vous devez être le propriétaire du serveur pour exécuter cette commande.**`,
              ephemeral: true,
            })
            .catch(() => {});
      }

      await command.executeSlash(client, interaction, functionJS);
      console.log(
        `[CMD-S]`.brightBlue +
          ` ${interaction.guild.name} | ${interaction.channel.name} | ${interaction.user.tag} | ${command.name}`
      );
    }
  },
};
