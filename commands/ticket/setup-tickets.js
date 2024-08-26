const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  SlashCommandBuilder,
  ChannelType,
  PermissionFlagsBits,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "setup-tickets",
  description: "Configure le panneau de tickets",
  categorie: "support",
  guildOwnerOnly: false,
  botOwnerOnly: false,

  async executeSlash(client, interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
      return interaction.reply({
        content: "Vous n'avez pas la permission d'utiliser cette commande.",
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle("Tickets ➜ Macchiato")
      .setDescription("Cliquez sur le bouton ci-dessous pour ouvrir un ticket.")
      .setImage(
        "https://cdn.discordapp.com/attachments/1276264726862762004/1276545261430374553/17161F8E-0978-462A-B064-31ABD1C9D0F4.gif?ex=66c9eaeb&is=66c8996b&hm=a405cefd3fb6d10bed1305ff57c3bff020f58f958ac08c4dea6999df7d40c613&"
      );

    const selectMenuTicket = new StringSelectMenuBuilder()
      .setCustomId("select-ticket")
      .setPlaceholder(`Quel est la nature de ton problème ?`)
      .addOptions(
        {
          label: "Recrutements",
          value: "Recrutements",
          emoji: {
            id: "1276614649566990366",
            name: "logogris",
          },
        },
        {
          label: "Signalement",
          value: "Signalement",
          emoji: {
            id: "1276614561436405870",
            name: "logomarron",
          },
        },
        {
          label: "Partenariat",
          value: "Partenariat",
          emoji: {
            id: "1276614649566990366",
            name: "logogris",
          },
        },
        {
          label: "Certification",
          value: "Certification",
          emoji: {
            id: "1276614561436405870",
            name: "logomarron",
          },
        },
        {
          label: "Autres …",
          value: "Autres …",
          emoji: {
            id: "1276614649566990366",
            name: "logogris",
          },
        }
      );

    const row = new ActionRowBuilder().addComponents(selectMenuTicket);

    await interaction.channel.send({ embeds: [embed], components: [row] });

    interaction.reply({
      content: "Panneau de tickets configuré avec succès!",
      ephemeral: true,
    });
  },

  async handleTicketCreation(interaction) {
    const { guild, user } = interaction;

    // Vérifier si l'utilisateur a déjà un ticket ouvert

    // Trouver la catégorie spécifique (remplacez 'ID_CATEGORIE' par l'ID réel)
    const category = guild.channels.cache.get("1276521256136474698");

    const supportRole = guild.roles.cache.get("1276521215242014741");

    // Créer le nouveau salon
    const ticketChannel = await guild.channels.create({
      name: `ticket-${user.username}-${
        guild.channels.cache.filter((c) => c.name.startsWith("ticket-")).size +
        1
      }`,
      type: ChannelType.GuildText,
      parent: category,
      permissionOverwrites: [
        {
          id: guild.id,
          deny: [PermissionFlagsBits.ViewChannel],
        },
        {
          id: user.id,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
          ],
        },
        {
          id: supportRole.id,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ManageChannels,
          ],
        },
      ],
    });

    // Créer l'embed pour le nouveau salon
    const ticketEmbed = new EmbedBuilder()
      .setTitle(
        "Vous venez d’entrer en contact avec la partie support du serveur."
      )
      .setDescription(
        `- 1 | Merci d’indiquer la raison.

- 2 | Merci d’être patient, nous traitons tous ticket dans les plus brefs délais.

- 3 | Vous ouvrez des tickets et vous les désertez ? Bienvenue dans la catégorie des personnes warn.

- 4 | Respect et courtoisie sont la moindre des choses.`
      )
      .setImage(
        "https://cdn.discordapp.com/attachments/1276264726862762004/1276527562704556155/F2D52082-3F80-44BE-86E8-3153B01E7B1E.gif?ex=66c9da6f&is=66c888ef&hm=c77b44b5d88bc07631f911fdd5704fda1244cc7384a1c971c0d715855aea8e25&"
      )
      .setTimestamp()
      .setFooter({
        text: `L’équipe Maison Macchiato`, //Met le text qui tu veux tout en bas
        iconURL: interaction.guild.iconURL({
          dynamic: true,
          size: 2048,
          format: "png",
        }), //Tu peux mettre un icon à côté du text
      });

    const claimButton = new ButtonBuilder()
      .setCustomId("claim-ticket")
      .setLabel("➜ Prendre en charge le ticket")
      .setStyle(ButtonStyle.Primary);

    const closeTicketButton = new ButtonBuilder()
      .setCustomId("close-ticket")
      .setLabel("Fermer le ticket")
      .setStyle(ButtonStyle.Danger);

    const buttonRow = new ActionRowBuilder().addComponents(
      claimButton,
      closeTicketButton
    );

    await ticketChannel.send({
      content: `<@&${supportRole.id}>`,
      embeds: [ticketEmbed],
      components: [buttonRow],
    });

    return interaction.reply({
      content: `Votre ticket a été créé: ${ticketChannel}`,
      ephemeral: true,
    });
  },

  async handleTicketClaim(interaction) {
    const { member, channel } = interaction;

    const supportRole = member.guild.roles.cache.get("1276521215242014741");

    // Vérifier si l'utilisateur a le rôle de support
    if (!member.roles.cache.has(supportRole.id)) {
      return interaction.reply({
        content: "Vous n'avez pas la permission de réclamer ce ticket.",
        ephemeral: true,
      });
    }

    // Vérifier si le ticket a déjà été réclamé
    if (channel.name.includes("claimed")) {
      return interaction.reply({
        content: "Ce ticket a déjà été réclamé.",
        ephemeral: true,
      });
    }

    //Claim le ticket
    await channel.setName(`${channel.name}-claimed-by-${member.user.username}`);

    await channel.permissionOverwrites.edit(supportRole, {
      SendMessages: false,
    });

    await channel.permissionOverwrites.edit(member.user, {
      SendMessages: true,
    });

    //Mettre à jour l'embed
    const ticketEmbed = new EmbedBuilder()
      .setTitle("Ticket pris en charge")
      .setDescription(`Ce ticket a été pris en charge par ${member}.`);

    const disabledClaimButton = new ButtonBuilder()
      .setCustomId("claim-ticket")
      .setLabel("➜ Ticket pris en charge")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(true);

    const closeTicketButton = new ButtonBuilder()
      .setCustomId("close-ticket")
      .setLabel("Fermer le ticket")
      .setStyle(ButtonStyle.Danger)
      .setDisabled(false);

    const row = new ActionRowBuilder().addComponents(
      disabledClaimButton,
      closeTicketButton
    );

    await interaction.message.edit({ components: [row] });

    await channel.send({ embeds: [ticketEmbed] });

    return interaction.reply({
      content: `${member} a réclamé ce ticket. Vous êtes maintenant le seul membre du support à pouvoir y écrire.`,
      ephemeral: true,
    });
  },

  async handleTicketClose(interaction) {
    const { channel } = interaction;

    // Créer un message de confirmation
    const confirmEmbed = new EmbedBuilder()
      .setTitle("Confirmation de fermeture")
      .setDescription("Êtes-vous sûr de vouloir fermer ce ticket ?")
      .setColor("Red");

    const confirmButton = new ButtonBuilder()
      .setCustomId("confirm-close")
      .setLabel("Confirmer")
      .setStyle(ButtonStyle.Danger);

    const cancelButton = new ButtonBuilder()
      .setCustomId("cancel-close")
      .setLabel("Annuler")
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(
      confirmButton,
      cancelButton
    );

    await interaction.reply({
      embeds: [confirmEmbed],
      components: [row],
      ephemeral: true,
    });

    const filter = (i) =>
      i.user.id === interaction.user.id &&
      (i.customId === "confirm-close" || i.customId === "cancel-close");

    try {
      const confirmation = await channel.awaitMessageComponent({
        filter,
        time: 60000,
      });

      if (confirmation.customId === "confirm-close") {
        await channel.delete();
        // Ne pas essayer d'envoyer un message après la suppression du canal
      } else {
        if (confirmation.replied || confirmation.deferred) {
          await confirmation.followUp({
            content: "Fermeture du ticket annulée.",
            ephemeral: true,
          });
        } else {
          await confirmation.update({
            content: "Fermeture du ticket annulée.",
            components: [],
            embeds: [],
          });
        }
      }
    } catch (error) {
      // Si l'interaction originale est toujours valide, on l'édite
      try {
        await interaction.editReply({
          content: "Pas de réponse, fermeture du ticket annulée.",
          components: [],
          embeds: [],
        });
      } catch (editError) {
        // Si l'édition échoue, on ignore simplement l'erreur
        console.error("Impossible d'éditer le message de réponse :", editError);
      }
    }
  },

  get data() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description);
  },
};
