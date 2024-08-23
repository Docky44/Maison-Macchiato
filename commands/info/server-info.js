const {
  SlashCommandBuilder,
  PermissionsBitField,
  EmbedBuilder,
  messageLink,
  codeBlock,
  inlineCode,
  spoiler,
} = require("discord.js");
const moment = require("moment");
const momentTz = require("moment-timezone");
const datetime = require("datetime");

module.exports = {
  name: "server-info",
  description:
    "Cette commande te permet d'obtenir des informations sur le serveur............",
  categorie: "info",
  guildOwnerOnly: false,
  botOwnerOnly: false,

  async executeSlash(client, interaction, functionJS) {
    let owner = await client.users.fetch(interaction.guild.ownerId);
    moment.locale("fr");
    const date = moment(interaction.guild.createdAt).tz("Europe/Paris");
    const now = moment();
    const diff = now.diff(date);
    const duration = moment.duration(diff);

    const embedServerInfo = new EmbedBuilder()
      //.setColor(0x000) //Permet de modifier la couleur du bandeau sur le côté de l'embed
      .setAuthor({
        name: `${client.user.username}`, //Nom qui s'affichera tout en haut
        iconURL: `${client.user.displayAvatarURL()}`, //Icon à côté du nom
      })
      .setThumbnail(
        interaction.guild.iconURL({ dynamic: true, size: 2048, format: "png" })
      ) //Image qui se trouve en haut à droite
      .addFields(
        //Permet d'ajouter un petit titre et une description en plus
        {
          name: `📜 - Informations sur le serveur : `, //Titre du nouveau field
          value: `>>> **Nom :** ${inlineCode(
            interaction.guild.name
          )}\n **ID :** ${
            interaction.guild.id
          }\n **Date de création :** ${date.format(
            "DD MMMM YYYY HH:mm"
          )} (il y a ${duration.humanize()})\n **Propiéraire du serveur :**  ${owner}\n **ID du propiéraire :**  ${inlineCode(
            interaction.guild.ownerId
          )}`, //Text en dessous du titre
          inline: false, //Le prochain field sera en dessous de lui
        },
        {
          name: `📈 - Statistique du serveur :`, //Titre du nouveau field
          value: `>>> **Membres :** ${interaction.guild.memberCount} \n **Boost :** ${interaction.guild.premiumSubscriptionCount} boost`, //Text en dessous du titre
          inline: false, //Le prochain field sera à côté de lui
        }
      )
      .setTimestamp() //Affiche la date et l'heure tout en bas
      .setFooter({
        text: `Demander par ${interaction.user.tag}`, //Met le text qui tu veux tout en bas
        iconURL: `${interaction.user.displayAvatarURL()}`, //Tu peux mettre un icon à côté du text
      });
    interaction.reply({ embeds: [embedServerInfo] }); //Reply l'embed
  },
  get data() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description);
  },
};
