const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
    if (interaction.customId === "Help") {
      // Réponse quand tu selects Accueil

      if (interaction.values[0] === "Accueil") {
        const selectMenuHelp = new StringSelectMenuBuilder()
          .setCustomId("Help")
          .setPlaceholder("🏝️Accueil")
          .addOptions(
            {
              label: "Accueil",
              value: "Accueil",
              emoji: {
                name: "🏝️",
              },
            },
            {
              label: "Configuration",
              value: "Configuration",
              emoji: {
                name: "🛠️",
              },
            },
            {
              label: "Informations/Utilitaires",
              value: "Informations/Utilitaires",
              emoji: {
                name: "🧐",
              },
            },
            {
              label: "Modération/Anti-raid",
              value: "Modération Anti-raid",
              emoji: {
                name: "⚔️",
              },
            },
            {
              label: "Autres commandes",
              value: "Autres commandes",
              emoji: {
                name: "📌",
              },
            }
          );

        const reponseAccueil = new EmbedBuilder()
          .setColor(0xbe40ff)
          .setAuthor({
            name: "Maison Macchiato",
            iconURL:
              "https://cdn.discordapp.com/attachments/1276540947882311723/1276582105664458793/image.png?ex=66ca0d3b&is=66c8bbbb&hm=87434db7c58c2c123b49b1c47eb278b5a333b3909954e4af2bf081ffcbf320d6&",
            url: "https://discord.gg/b4rukFdYNy",
          })
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/1276540947882311723/1276582105664458793/image.png?ex=66ca0d3b&is=66c8bbbb&hm=87434db7c58c2c123b49b1c47eb278b5a333b3909954e4af2bf081ffcbf320d6&"
          )
          .addFields(
            {
              name: "🛠️-Configuration",
              value: "``config``, ``whitelist``",
              inline: false,
            },
            {
              name: "🧐-Informations/Utilitaires",
              value:
                "``ban-list``, ``embed``, ``invite-info``, ``nuke``, ``role-all``, ``role-react``, ``server-info``, ``snipe``, ``unban-all``, ``user-info``",
              inline: false,
            },
            {
              name: "⚔-Modération/Anti-raid",
              value:
                "``ban``, ``clear-channels``, ``clear-roles``, ``clear-user``, ``clear``, ``kick``, ``lock``, ``mute``, ``raidmode``, ``unban``, ``unlock``, ``unmute``",
              inline: false,
            },
            {
              name: "📌-Autres commandes",
              value: "``bot-info``, ``help``, ``invite``, ``ping``, ``say``",
              inline: false,
            }
          )
          .setTimestamp()
          .setFooter({
            text: `Demandé par ${interaction.user.tag}`,
            iconURL: `${interaction.user.displayAvatarURL()}`,
          });

        const actionRow = new ActionRowBuilder().addComponents(selectMenuHelp);

        interaction.update({
          embeds: [reponseAccueil],
          components: [actionRow],
        });
      }

      // Réponse quand tu selects Configuration

      if (interaction.values[0] === "Configuration") {
        const selectMenuHelp = new StringSelectMenuBuilder()
          .setCustomId("Help")
          .setPlaceholder("🛠️Configuration")
          .addOptions(
            {
              label: "Accueil",
              value: "Accueil",
              emoji: {
                name: "🏝️",
              },
            },
            {
              label: "Configuration",
              value: "Configuration",
              emoji: {
                name: "🛠️",
              },
            },
            {
              label: "Informations/Utilitaires",
              value: "Informations/Utilitaires",
              emoji: {
                name: "🧐",
              },
            },
            {
              label: "Modération/Anti-raid",
              value: "Modération Anti-raid",
              emoji: {
                name: "⚔️",
              },
            },
            {
              label: "Autres commandes",
              value: "Autres commandes",
              emoji: {
                name: "📌",
              },
            }
          );

        const reponseConfiguration = new EmbedBuilder()
          .setColor(0xbe40ff)
          .setTitle("Voici les configurations du bot")
          .setAuthor({
            name: "Maison Macchiato",
            iconURL:
              "https://cdn.discordapp.com/attachments/1276540947882311723/1276582105664458793/image.png?ex=66ca0d3b&is=66c8bbbb&hm=87434db7c58c2c123b49b1c47eb278b5a333b3909954e4af2bf081ffcbf320d6&",
            url: "https://discord.gg/b4rukFdYNy",
          })
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/1276540947882311723/1276582105664458793/image.png?ex=66ca0d3b&is=66c8bbbb&hm=87434db7c58c2c123b49b1c47eb278b5a333b3909954e4af2bf081ffcbf320d6&"
          )
          .addFields(
            {
              name: "config",
              value:
                "Configurer les fonctionnalités du bot.\nSyntaxe: ``config``",
              inline: false,
            },
            {
              name: "whitelist",
              value:
                "Gérer les membres dans la liste blanche de l'anti-raid.\nSyntaxe: ``whitelist``",
              inline: false,
            }
          )
          .setTimestamp()
          .setFooter({
            text: `Demandé par ${interaction.user.tag}`,
            iconURL: `${interaction.user.displayAvatarURL()}`,
          });
        const actionRow = new ActionRowBuilder().addComponents(selectMenuHelp);

        interaction.update({
          embeds: [reponseConfiguration],
          components: [actionRow],
        });
      }

      // Réponse quand tu selects Informations/Utilitaires
      if (interaction.values[0] === "Informations/Utilitaires") {
        const selectMenuHelp = new StringSelectMenuBuilder()
          .setCustomId("Help")
          .setPlaceholder("🧐Informations/Utilitaires")
          .addOptions(
            {
              label: "Accueil",
              value: "Accueil",
              emoji: {
                name: "🏝️",
              },
            },
            {
              label: "Configuration",
              value: "Configuration",
              emoji: {
                name: "🛠️",
              },
            },
            {
              label: "Informations/Utilitaires",
              value: "u",
              inline: true,
              emoji: {
                name: "🧐",
              },
            },
            {
              label: "Modération/Anti-raid",
              value: "Modération Anti-raid",
              emoji: {
                name: "⚔️",
              },
            },
            {
              label: "Autres commandes",
              value: "Autres commandes",
              emoji: {
                name: "📌",
              },
            }
          );

        const reponseInformationsUtilitaires = new EmbedBuilder()
          .setColor(0xbe40ff)
          .setTitle("Voici les commnandes utilitaires et d'informations")
          .setAuthor({
            name: "Maison Macchiato",
            iconURL:
              "https://cdn.discordapp.com/attachments/1276540947882311723/1276582105664458793/image.png?ex=66ca0d3b&is=66c8bbbb&hm=87434db7c58c2c123b49b1c47eb278b5a333b3909954e4af2bf081ffcbf320d6&",
            url: "https://discord.gg/b4rukFdYNy",
          })
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/1276540947882311723/1276582105664458793/image.png?ex=66ca0d3b&is=66c8bbbb&hm=87434db7c58c2c123b49b1c47eb278b5a333b3909954e4af2bf081ffcbf320d6&"
          )
          .addFields(
            {
              name: "ban-list",
              value:
                "Afficher la liste des utilisateurs bannis du serveur.\nSyntaxe: ``ban-list``",
              inline: false,
            },
            {
              name: "embed",
              value:
                "Construire et envoyer un embed avec le bot.\nSyntaxe: ``embed``",
              inline: false,
            },
            {
              name: "invite-info",
              value:
                "Afficher les informations sur une invitation Discord.\nSyntaxe: ``invite-info <lien ou code d'invitation>``",
              inline: false,
            },
            {
              name: "nuke",
              value: "Supprimer un salon et le recréer.\nSyntaxe: ``nuke``",
              inline: false,
            },
            {
              name: "role-all",
              value:
                "Attribuer un rôle à tous les membres du serveur.\nSyntaxe: ``role-all <@rôle ou ID de rôle>``",
              inline: false,
            },
            {
              name: "role-react",
              value:
                "Attribuer un rôle en cliquant sur une réaction.\nSyntaxe: ``role-react <emoji ou ID d'emoji> <@role ou ID de rôle> <ID du message> [#salon ou ID de salon]``",
              inline: false,
            },
            {
              name: "server-info",
              value:
                "Afficher les informations sur le serveur.\nSyntaxe: ``server-info``",
              inline: false,
            },
            {
              name: "snipe",
              value:
                "Afficher les derniers messages supprimés.\nSyntaxe: ``snipe [nombre de messages]``",
              inline: false,
            },
            {
              name: "unban-all",
              value:
                "Révoquer l'ensemble des bannissements du serveur.\nSyntaxe: ``unban-all``",
              inline: false,
            },
            {
              name: "user-info",
              value:
                "Afficher les informations sur un utilisateur.\nSyntaxe: ``user-info [@utilisateur ou ID d'utilisateur]``",
              inline: false,
            }
          )
          .setTimestamp()
          .setFooter({
            text: `Demandé par ${interaction.user.tag}`,
            iconURL: `${interaction.user.displayAvatarURL()}`,
          });

        const actionRow = new ActionRowBuilder().addComponents(selectMenuHelp);

        interaction.update({
          embeds: [reponseInformationsUtilitaires],
          components: [actionRow],
        });
      }
      // Réponse quand tu selects Modérations/Anti-raid
      if (interaction.values[0] === "Modération Anti-raid") {
        const selectMenuHelp = new StringSelectMenuBuilder()
          .setCustomId("Help")
          .setPlaceholder("⚔-Modération/Anti-raid")
          .addOptions(
            {
              label: "Accueil",
              value: "Accueil",
              emoji: {
                name: "🏝️",
              },
            },
            {
              label: "Configuration",
              value: "Configuration",
              emoji: {
                name: "🛠️",
              },
            },
            {
              label: "Informations/Utilitaires",
              value: "Informations/Utilitaires",
              emoji: {
                name: "🧐",
              },
            },
            {
              label: "Modération/Anti-raid",
              value: "Modération Anti-raid",
              emoji: {
                name: "⚔️",
              },
            },
            {
              label: "Autres commandes",
              value: "Autres commandes",
              emoji: {
                name: "📌",
              },
            }
          );

        const reponseModerationAntiRaid = new EmbedBuilder()
          .setColor(0xbe40ff)
          .setTitle("Voici les commandes de modération et d'anti-raid")
          .setAuthor({
            name: "Maison Macchiato",
            iconURL:
              "https://cdn.discordapp.com/attachments/1276540947882311723/1276582105664458793/image.png?ex=66ca0d3b&is=66c8bbbb&hm=87434db7c58c2c123b49b1c47eb278b5a333b3909954e4af2bf081ffcbf320d6&",
            url: "https://discord.gg/b4rukFdYNy",
          })
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/1276540947882311723/1276582105664458793/image.png?ex=66ca0d3b&is=66c8bbbb&hm=87434db7c58c2c123b49b1c47eb278b5a333b3909954e4af2bf081ffcbf320d6&"
          )
          .addFields(
            {
              name: "ban",
              value:
                "Bannir un utilisateur du serveur.\nSyntaxe: ``ban <@utilisateur ou ID d'utilisateur> [raison]``",
              inline: false,
            },
            {
              name: "clear-channels",
              value:
                "Supprimer tous les salons ayant un nom spécifique.\nSyntaxe: ``clear-channels <#salon, ID de salon ou nom du salon>``",
              inline: false,
            },
            {
              name: "clear-roles",
              value:
                "Supprimer tous les rôles ayant un nom spécifique.\nSyntaxe: ``clear-roles <@role, ID de rôle ou nom du rôle>``",
              inline: false,
            },
            {
              name: "clear-user",
              value:
                "Supprimer les messages d'un utilisateur sur l'ensemble du serveur.\nSyntaxe: ``clear-user <@utilisateur ou ID d'utilisateur>``",
              inline: false,
            },
            {
              name: "clear",
              value:
                "Supprimer des messages.\nSyntaxe: ``clear <nombre de messages à supprimer>``",
              inline: false,
            },
            {
              name: "kick",
              value:
                "Expulser un utilisateur.\nSyntaxe: ``kick <@utilisateur ou ID d'utilisateur> [raison]``",
              inline: false,
            },
            {
              name: "lock",
              value:
                "Verrouiler un salon.\nSyntaxe: ``lock [#salon ou ID de salon]``",
              inline: false,
            },
            {
              name: "mute",
              value:
                "Rendre muet un membre du serveur.\nSyntaxe: ``mute <@utilisateur ou ID d'utilisateur> <durée> [raison]``",
              inline: false,
            },
            {
              name: "raidmode",
              value:
                "Activer/désactiver le mode raid. (empêche de rejoindre le serveur)\nSyntaxe: ``raidmode``",
              inline: false,
            },
            {
              name: "unban",
              value:
                "Révoquer le banissement d'un utilisateur.\nSyntaxe: ``unban <@utilisateur ou ID d'utilisateur>``",
              inline: false,
            },
            {
              name: "unlock",
              value:
                "Déverrouiler un salon.\nSyntaxe: ``unlock [#salon ou ID de salon]``",
              inline: false,
            },
            {
              name: "unmute",
              value:
                "Rendre la parole à un membre du serveur.\nSyntaxe: ``unmute <@utilisateur ou ID d'utilisateur>``",
              inline: false,
            }
          )
          .setTimestamp()
          .setFooter({
            text: `Demandé par ${interaction.user.tag}`,
            iconURL: `${interaction.user.displayAvatarURL()}`,
          });
        const actionRow = new ActionRowBuilder().addComponents(selectMenuHelp);

        interaction.update({
          embeds: [reponseModerationAntiRaid],
          components: [actionRow],
        });
      }
      // Réponse quand tu selects Autres commandes
      if (interaction.values[0] === "Autres commandes") {
        const selectMenuHelp = new StringSelectMenuBuilder()
          .setCustomId("Help")
          .setPlaceholder("📌Autres commandes")
          .addOptions(
            {
              label: "Accueil",
              value: "Accueil",
              emoji: {
                name: "🏝️",
              },
            },
            {
              label: "Configuration",
              value: "Configuration",
              emoji: {
                name: "🛠️",
              },
            },
            {
              label: "Informations/Utilitaires",
              value: "u",
              inline: true,
              emoji: {
                name: "🧐",
              },
            },
            {
              label: "Modération/Anti-raid",
              value: "Modération Anti-raid",
              emoji: {
                name: "⚔️",
              },
            },
            {
              label: "Autres commandes",
              value: "Autres commandes",
              emoji: {
                name: "📌",
              },
            }
          );

        const reponseAutresCommandes = new EmbedBuilder()
          .setColor(0xbe40ff)
          .setAuthor({
            name: "Maison Macchiato",
            iconURL:
              "https://cdn.discordapp.com/attachments/1276540947882311723/1276582105664458793/image.png?ex=66ca0d3b&is=66c8bbbb&hm=87434db7c58c2c123b49b1c47eb278b5a333b3909954e4af2bf081ffcbf320d6&",
            url: "https://discord.gg/b4rukFdYNy",
          })
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/1276540947882311723/1276582105664458793/image.png?ex=66ca0d3b&is=66c8bbbb&hm=87434db7c58c2c123b49b1c47eb278b5a333b3909954e4af2bf081ffcbf320d6&"
          )
          .addFields(
            {
              name: "bot-info",
              value:
                "Afficher les informations sur le bot.\nSyntaxe: ``bot-info``",
              inline: false,
            },
            {
              name: "help",
              value: "Afficher l'aide du bot.\nSyntaxe: ``help``",
              inline: false,
            },
            {
              name: "invite",
              value: "Afficher l'invitation du bot.\nSyntaxe: ``invite``",
              inline: false,
            },
            {
              name: "ping",
              value: "Afficher le ping du bot.\nSyntaxe: ``ping``",
              inline: false,
            },
            {
              name: "say",
              value:
                "Envoyer un message avec le bot.\nSyntaxe: ``say <message à faire dire par le bot>``",
              inline: false,
            }
          )
          .setTimestamp()
          .setFooter({
            text: `Demandé par ${interaction.user.tag}`,
            iconURL: `${interaction.user.displayAvatarURL()}`,
          });

        const actionRow = new ActionRowBuilder().addComponents(selectMenuHelp);

        interaction.update({
          embeds: [reponseAutresCommandes],
          components: [actionRow],
        });
      }
    }
  },
};
