const { SlashCommandBuilder, EmbedBuilder, inlineCode } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "user-info",
  description: "Affiche les informations d'un utilisateur",
  categorie: "info",
  guildOwnerOnly: false,
  botOwnerOnly: false,

  async executeSlash(client, interaction) {
    let user = interaction.options.getUser("utilisateur") || interaction.user;
    let member = await interaction.guild.members
      .fetch(user.id)
      .catch(() => null);

    moment.locale("fr");
    const joinedAt = member ? moment(member.joinedAt).tz("Europe/Paris") : null;
    const createdAt = moment(user.createdAt).tz("Europe/Paris");
    const now = moment();

    const embedUserInfo = new EmbedBuilder()
      .setAuthor({
        name: `${client.user.username}`,
        iconURL: `${client.user.displayAvatarURL()}`,
      })
      .setThumbnail(
        user.displayAvatarURL({ dynamic: true, size: 2048, format: "png" })
      )
      .addFields({
        name: `📜 - Informations sur l'utilisateur :`,
        value: `>>> **Nom :** ${inlineCode(user.tag)}\n**ID :** ${inlineCode(
          user.id
        )}\n**Création du compte :** ${createdAt.format(
          "DD MMMM YYYY HH:mm"
        )} (il y a ${moment
          .duration(now.diff(createdAt))
          .humanize()})\n**Bot :** ${user.bot ? "Oui" : "Non"}`,
        inline: false,
      });

    if (member) {
      embedUserInfo.addFields({
        name: `📈 - Informations sur le membre :`,
        value: `>>> **A rejoint le serveur le :** ${joinedAt.format(
          "DD MMMM YYYY HH:mm"
        )} (il y a ${moment
          .duration(now.diff(joinedAt))
          .humanize()})\n**Rôle le plus élevé :** ${member.roles.highest}`,
        inline: false,
      });
    }

    embedUserInfo.setTimestamp().setFooter({
      text: `Demandé par ${interaction.user.tag}`,
      iconURL: `${interaction.user.displayAvatarURL()}`,
    });

    interaction.reply({ embeds: [embedUserInfo] });
  },
  get data() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addUserOption((option) =>
        option
          .setName("utilisateur")
          .setDescription(
            "L'utilisateur dont vous voulez voir les informations"
          )
          .setRequired(false)
      );
  },
};
