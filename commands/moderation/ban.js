const {
  SlashCommandBuilder,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: "ban",
  description: "Permet de ban un membre du serveur",
  categorie: "mod",
  guildOwnerOnly: false,
  botOwnerOnly: false,

  async executeSlash(client, interaction, functionJS) {
    const user = interaction.options.getUser("nom");
    const reason = interaction.options.getString("reason");

    if (interaction.user.id === user.id) {
      await interaction.reply({
        content: `Tu peux pas te bannir toi même !`,
        ephemeral: true,
      });
      return;
    }
    if (user.permissions.has(PermissionsBitField.Flags.Administrator)) {
      await interaction.reply({
        content: `Tu peux pas bannir une personne plus importante que toi !`,
        ephemeral: true,
      });
      return;
    }
    const embedBan = new EmbedBuilder()
      .setColor(0xbe40ff) //Permet de modifier la couleur du bandeau sur le côté de l'embed
      .setTitle(user.username + " est ban !") //Permet d'ajouter un titre en dessous du author
      .setDescription(`Cet utilisateur a étais ban pour: ${reason}`) //Permet de mettre un text en dessous du titre
      .setAuthor({
        name: user.username, //Nom qui s'affichera tout en haut
        iconURL: user.displayAvatarURL(),
      })
      .setTimestamp() //Affiche la date et l'heure tout en bas
      .setFooter({
        text: `Executé par ${interaction.user.username}#${interaction.user.discriminator}`,
      });
    await interaction.reply({ embeds: [embedBan] }); //Reply l'embed
    await interaction.guild.members.ban(user);
    await client.dbSanction.create({
      _userid: user,
      _username: user.username,
      _serverid: interaction.guild.id,
      _reason: reason,
    });
  },
  get data() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addUserOption((option) =>
        option
          .setName("nom")
          .setDescription("Utilisateur à ban")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("reason")
          .setDescription("La raison du ban")
          .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers);
  },
};
