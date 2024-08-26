module.exports = {
  name: "interactionCreate", //Nom obligatoire pour que l'interaction se face
  async execute(client, interaction) {
    if (interaction.customId === "Bouton_bleu") {
      //On récupére le customeId que nous avons mis dans le fichier template-bouton
      interaction.reply({ content: "Je suis la réaction au bouton bleu" }); //On reply le message que l'on souhaite quand on clique sur le bouton
    } else if (interaction.customId === "Bouton_rouge") {
      //On récupére le customeId que nous avons mis dans le fichier template-bouton
      interaction.reply({ content: "Je suis la réaction au bouton rouge" });
    } else if (interaction.customId === "Bouton_vert") {
      //On récupére le customeId que nous avons mis dans le fichier template-bouton
      interaction.reply({ content: "Je suis la réaction au bouton vert" });
    } else if (interaction.customId === "Bouton_gris") {
      //On récupére le customeId que nous avons mis dans le fichier template-bouton
      interaction.reply({ content: "Je suis la réaction au bouton gris" }); //On reply le message que l'on souhaite quand on clique sur le bouton
    }
  },
};
