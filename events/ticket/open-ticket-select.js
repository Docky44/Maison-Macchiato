const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  ChannelType,
  PermissionFlagsBits,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
    if (interaction.customId === "select-ticket") {
      // Réponse quand tu selects Accueil

      if (interaction.values[0] === "Recrutements") {
        const { guild, user } = interaction;

        const existingTicket = guild.channels.cache.find(
          (channel) =>
            channel.name === `recrutement-${user.username.toLowerCase()}`
        );

        if (existingTicket) {
          const updatedMenu = new StringSelectMenuBuilder()
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

          const updatedRow = new ActionRowBuilder().addComponents(updatedMenu);

          await interaction.message.edit({ components: [updatedRow] });
          return interaction.reply({
            content: "Vous avez déjà un ticket recrutement ouvert!",
            ephemeral: true,
          });
        }

        // Trouver la catégorie spécifique (remplacez 'ID_CATEGORIE' par l'ID réel)
        const category = guild.channels.cache.get("1276521256136474698");

        const supportRole = guild.roles.cache.get("1276521215242014741");

        // Créer le nouveau salon
        const ticketChannel = await guild.channels.create({
          name: `recrutement-${user.username}`,
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
            "Vous venez d’entrer en contact avec la partie recrutements du serveur."
          )
          .setDescription(
            `*Il nous faudrait :*

- Votre âge ? (+18 seulement).

- Prouvez votre âge à l’aide de votre carte d’identité 🪪 (cachez toutes autres informations).

- Nous accorder quelques petites minutes dans un channel vocal.

*Nous traitons les tickets dans les plus brefs délais, merci d’être patient.*`
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

        const updatedMenu = new StringSelectMenuBuilder()
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

        const updatedRow = new ActionRowBuilder().addComponents(updatedMenu);

        await interaction.message.edit({ components: [updatedRow] });

        return interaction.reply({
          content: `Votre ticket a été créé: ${ticketChannel}`,
          ephemeral: true,
        });
      }

      if (interaction.values[0] === "Signalement") {
        // Réponse quand tu selects Accueil
        const { guild, user } = interaction;

        // Vérifier si l'utilisateur a déjà un ticket ouvert
        const existingTicket = guild.channels.cache.find(
          (channel) =>
            channel.name === `signalement-${user.username.toLowerCase()}`
        );

        if (existingTicket) {
          const updatedMenu = new StringSelectMenuBuilder()
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

          const updatedRow = new ActionRowBuilder().addComponents(updatedMenu);

          await interaction.message.edit({ components: [updatedRow] });
          return interaction.reply({
            content: "Vous avez déjà un ticket signalement ouvert!",
            ephemeral: true,
          });
        }

        // Trouver la catégorie spécifique (remplacez 'ID_CATEGORIE' par l'ID réel)
        const category = guild.channels.cache.get("1276521256136474698");

        const supportRole = guild.roles.cache.get("1276521215242014741");

        // Créer le nouveau salon
        const ticketChannel = await guild.channels.create({
          name: `signalement-${user.username}`,
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
            `*Il nous faudrait :*

- La personne que vous souhaitez signaler.

- Pourquoi signaler ?

- Une ou plusieurs preuves concrète.

- Un entretien oral vous sera proposer, votre disponibilité ?`
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

        const updatedMenu = new StringSelectMenuBuilder()
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

        const updatedRow = new ActionRowBuilder().addComponents(updatedMenu);

        await interaction.message.edit({ components: [updatedRow] });

        return interaction.reply({
          content: `Votre ticket a été créé: ${ticketChannel}`,
          ephemeral: true,
        });
      }

      if (interaction.values[0] === "Partenariat") {
        // Réponse quand tu selects Accueil
        const { guild, user } = interaction;

        // Vérifier si l'utilisateur a déjà un ticket ouvert
        const existingTicket = guild.channels.cache.find(
          (channel) =>
            channel.name === `partenariat-${user.username.toLowerCase()}`
        );

        if (existingTicket) {
          const updatedMenu = new StringSelectMenuBuilder()
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

          const updatedRow = new ActionRowBuilder().addComponents(updatedMenu);

          await interaction.message.edit({ components: [updatedRow] });
          return interaction.reply({
            content: "Vous avez déjà un ticket partenariat ouvert!",
            ephemeral: true,
          });
        }

        // Trouver la catégorie spécifique (remplacez 'ID_CATEGORIE' par l'ID réel)
        const category = guild.channels.cache.get("1276521256136474698");

        const supportRole = guild.roles.cache.get("1276521215242014741");

        // Créer le nouveau salon
        const ticketChannel = await guild.channels.create({
          name: `partenariat-${user.username}`,
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
            "Vous venez d’entrer en contact avec la partie partenariat du serveur."
          )
          .setDescription(
            `*Il nous faudrait :*

- Votre réseaux utiliser pour le partenariat ? (Discord, TikTok, Telegram…)

- Combien de membres/followers avez vous?

- Un lien vers votre réseaux/discord

*Nous traitons les tickets dans les plus brefs délais, merci d’être patient.*`
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

        const updatedMenu = new StringSelectMenuBuilder()
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

        const updatedRow = new ActionRowBuilder().addComponents(updatedMenu);

        await interaction.message.edit({ components: [updatedRow] });

        return interaction.reply({
          content: `Votre ticket a été créé: ${ticketChannel}`,
          ephemeral: true,
        });
      }

      if (interaction.values[0] === "Certification") {
        // Réponse quand tu selects Accueil
        const { guild, user } = interaction;

        // Vérifier si l'utilisateur a déjà un ticket ouvert
        const existingTicket = guild.channels.cache.find(
          (channel) =>
            channel.name === `certification-${user.username.toLowerCase()}`
        );

        if (existingTicket) {
          const updatedMenu = new StringSelectMenuBuilder()
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

          const updatedRow = new ActionRowBuilder().addComponents(updatedMenu);

          await interaction.message.edit({ components: [updatedRow] });
          return interaction.reply({
            content: "Vous avez déjà un ticket certification ouvert!",
            ephemeral: true,
          });
        }

        // Trouver la catégorie spécifique (remplacez 'ID_CATEGORIE' par l'ID réel)
        const category = guild.channels.cache.get("1276521256136474698");

        const supportRole = guild.roles.cache.get("1276521215242014741");

        // Créer le nouveau salon
        const ticketChannel = await guild.channels.create({
          name: `certification-${user.username}`,
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

        const channelId = "1276632110580371628";

        // Créer l'embed pour le nouveau salon
        const ticketEmbed = new EmbedBuilder()
          .setTitle(
            "Vous venez d’entrer en contact avec la partie certification du serveur."
          )
          .setDescription(
            `- Avez-vous effectuer la <#${channelId}> pour intégrer l’équipe de Maison Macchiato ?

Il nous faudrait :

- Une bref présentation de vous.

- Vos expériences.

- Vos compétences et expériences.

- Ainsi que le nom des serveurs ou vous avez développer vos compétences.

- Pouvez-vous nous faire part de votre motivation ?

- Un entretien oral vous sera proposer, votre disponibilité ?

*Nous traitons les tickets dans les plus brefs délais, merci d’être patient.*`
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

        const updatedMenu = new StringSelectMenuBuilder()
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

        const updatedRow = new ActionRowBuilder().addComponents(updatedMenu);

        await interaction.message.edit({ components: [updatedRow] });

        return interaction.reply({
          content: `Votre ticket a été créé: ${ticketChannel}`,
          ephemeral: true,
        });
      }

      if (interaction.values[0] === "Autres …") {
        // Réponse quand tu selects Accueil

        const { guild, user } = interaction;

        // Vérifier si l'utilisateur a déjà un ticket ouvert
        const existingTicket = guild.channels.cache.find(
          (channel) => channel.name === `autres-${user.username.toLowerCase()}`
        );

        if (existingTicket) {
          const updatedMenu = new StringSelectMenuBuilder()
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

          const updatedRow = new ActionRowBuilder().addComponents(updatedMenu);

          await interaction.message.edit({ components: [updatedRow] });
          return interaction.reply({
            content: "Vous avez déjà un ticket autres ouvert!",
            ephemeral: true,
          });
        }

        // Trouver la catégorie spécifique (remplacez 'ID_CATEGORIE' par l'ID réel)
        const category = guild.channels.cache.get("1276521256136474698");

        const supportRole = guild.roles.cache.get("1276521215242014741");

        // Créer le nouveau salon
        const ticketChannel = await guild.channels.create({
          name: `Autres-${user.username}`,
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
            `*Il nous faudrait :*

- La personne que vous souhaitez signaler.

- Pourquoi signaler ?

- Une ou plusieurs preuves concrète.

- Un entretien oral vous sera proposer, votre disponibilité ?

*Nous traitons les tickets dans les plus brefs délais, merci d’être patient.*`
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

        const updatedMenu = new StringSelectMenuBuilder()
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

        const updatedRow = new ActionRowBuilder().addComponents(updatedMenu);

        await interaction.message.edit({ components: [updatedRow] });

        return interaction.reply({
          content: `Votre ticket a été créé: ${ticketChannel}`,
          ephemeral: true,
        });
      }
    }
  },
};
