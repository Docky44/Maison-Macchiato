const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "emebed", //Nom de la commande
  description: "Descritpion de l'embed", //Description qui apparaitra pour le / commande
  categorie: "support",
  guildOwnerOnly: false,
  botOwnerOnly: false,
  async executeSlash(client, interaction) {
    const embedTest = new EmbedBuilder()
      .setColor(0xbe40ff) //Permet de modifier la couleur du bandeau sur le côté de l'embed
      .setTitle("exemple titre") //Permet d'ajouter un titre en dessous du author
      .setDescription("exemple description") //Permet de mettre un text en dessous du titre
      .setAuthor({
        name: "exemple auteur", //Nom qui s'affichera tout en haut
        iconURL:
          "https://cdn.discordapp.com/attachments/1276264726862762004/1276527562704556155/F2D52082-3F80-44BE-86E8-3153B01E7B1E.gif?ex=66c9da6f&is=66c888ef&hm=c77b44b5d88bc07631f911fdd5704fda1244cc7384a1c971c0d715855aea8e25&", //Icon à côté du nom
        url: "https://discord.gg/qAuBbZBk", //Pas obligatoire mais si tu cliques sur le nom ça peut t'enmener sur le lien
      })
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/1276264726862762004/1276527562704556155/F2D52082-3F80-44BE-86E8-3153B01E7B1E.gif?ex=66c9da6f&is=66c888ef&hm=c77b44b5d88bc07631f911fdd5704fda1244cc7384a1c971c0d715855aea8e25&"
      ) //Image qui se trouve en haut à droite
      .addFields(
        //Permet d'ajouter un petit titre et une description en plus
        {
          name: "test nouveau field", //Titre du nouveau field
          value: "Une valeur", //Text en dessous du titre
          inline: false, //Le prochain field sera en dessous de lui
        },
        {
          name: "test autre field", //Titre du nouveau field
          value: "Une valeur", //Text en dessous du titre
          inline: true, //Le prochain field sera à côté de lui
        }
      )
      .addFields(
        //Il peut y avoir autant de field que l'on veut
        {
          name: "Auuutrree", //Titre du nouveau field
          value: "aaaaa", //Text en dessous du titre
          inline: false, //Le prochain field sera en dessous de lui
        }
      )
      .setImage(
        "https://cdn.discordapp.com/attachments/1276264726862762004/1276527562704556155/F2D52082-3F80-44BE-86E8-3153B01E7B1E.gif?ex=66c9da6f&is=66c888ef&hm=c77b44b5d88bc07631f911fdd5704fda1244cc7384a1c971c0d715855aea8e25&"
      ) //Image qui se trouve en bas
      .setTimestamp() //Affiche la date et l'heure tout en bas
      .setFooter({
        text: `En bas la`, //Met le text qui tu veux tout en bas
        iconURL: `https://cdn.discordapp.com/attachments/1276264726862762004/1276527562704556155/F2D52082-3F80-44BE-86E8-3153B01E7B1E.gif?ex=66c9da6f&is=66c888ef&hm=c77b44b5d88bc07631f911fdd5704fda1244cc7384a1c971c0d715855aea8e25&`, //Tu peux mettre un icon à côté du text
      });

    await interaction.channel.send({ embeds: [embedTest] }); //Reply l'embed
  },

  get data() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description);
  },
};
//Ne pas oublier de faire la commande node deplay-commands.js dans le terminal afin d'importer la commande / à discord
