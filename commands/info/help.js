const {
  ActionRowBuilder,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: "help",
  description: `Grace à cette commande tu pourras trouver ce que fait le bot 😉`,
  async executeSlash(client, interaction) {
    const { member, channel } = interaction;
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

    const helpEmbed = new EmbedBuilder()
      .setColor(0xbe40ff)
      .setAuthor({
        name: "Maison Macchiato",
        iconURL:
          "https://cdn.discordapp.com/attachments/1276540947882311723/1276582105664458793/image.png?ex=66ca0d3b&is=66c8bbbb&hm=87434db7c58c2c123b49b1c47eb278b5a333b3909954e4af2bf081ffcbf320d6&",
        url: "https://discord.gg/cHzbJGGh9U",
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

    const selectRow = new ActionRowBuilder().addComponents(selectMenuHelp);

    interaction.reply({
      embeds: [helpEmbed],
      components: [selectRow],
    });
  },
  get data() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description);
  },
};
