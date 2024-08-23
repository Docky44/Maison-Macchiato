const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
} = require("discord.js"); //import les fonctions utilent au bouton

module.exports = {
  name: "bouton", //Nom de la commande
  description: `bouton description`, //Description de la commande
  async executeSlash(client, interaction) {
    const bouton = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("Bouton_bleu") //ID du bouton pour pouvoir l'appeller ensuite dans event
          .setEmoji("✅")
          .setLabel("Bouton bleu") //Text affiché sur le bouton plus un emoji
          .setStyle(ButtonStyle.Primary) //Couleur du bouton bleu
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("Bouton_rouge") //ID du bouton pour pouvoir l'appeller ensuite dans event
          .setEmoji("❕")
          .setLabel("Bouton rouge") //Text affiché sur le bouton plus un emoji
          .setStyle(ButtonStyle.Danger) //Couleur du bouton rouge
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("Bouton_vert") //ID du bouton pour pouvoir l'appeller ensuite dans event
          .setEmoji("☑")
          .setLabel("Bouton vert") //Text affiché sur le bouton plus un emoji
          .setStyle(ButtonStyle.Success) //Couleur du bouton vert
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("Bouton_gris") //ID du bouton pour pouvoir l'appeller ensuite dans event
          .setEmoji("🔞")
          .setLabel("Bouton gris") //Text affiché sur le bouton plus un emoji
          .setStyle(ButtonStyle.Secondary) //Couleur du bouton gris
      )
      .addComponents(
        new ButtonBuilder()
          .setEmoji("📌")
          .setLabel("Un bouton link") //Text affiché sur le bouton plus un emoji
          .setStyle(ButtonStyle.Link) //Bouton qui implémente un lien
          .setURL("https://discord.gg/b4rukFdYNy") //Lien qui s'ouvrira quand on clique sur le bouton
        //Pour une bouton link nous avons pas besoin de .setCustomId car il n'y a pas d'interaction à faire avec celui-ci
      );
    const bouton2 = new ActionRowBuilder() //Création d'un autre const car c'est 5 boutons max par const
      .addComponents(
        new ButtonBuilder()
          .setCustomId("Bouon_non_cliquable") //ID du bouton pour pouvoir l'appeller ensuite dans event
          .setEmoji("⛔")
          .setLabel("Bouton pas cliquable") //Text affiché sur le bouton plus un emoji
          .setStyle(ButtonStyle.Primary) //Couleur du bouton bleu
          .setDisabled(true) //Permet de faire en sorte qu'on ne puisse pas cliquer sur le bouton
      );
    interaction.reply({
      content: "Je suis un message test pour le bouton",
      components: [bouton, bouton2],
    }); //Envoie le message et ajoute le bouton en dessous
  },
  get data() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description);
  },
};
//Ne pas oublier de faire la commande node deplay-commands.js dans le terminal afin d'importer la commande / à discord
