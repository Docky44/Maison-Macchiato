// commands/setup-tickets.js
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: "setup-tickets",
    description: "Configure le panneau de tickets",
    categorie: "support",
    guildOwnerOnly: false,
    botOwnerOnly: false,

    async executeSlash(client, interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
            return interaction.reply({ content: "Vous n'avez pas la permission d'utiliser cette commande.", ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setTitle('Tickets ➜ Macchiato')
            .setDescription('Cliquez sur le bouton ci-dessous pour ouvrir un ticket.')
            .setColor('#0099ff');

        const openTicketButton = new ButtonBuilder()
            .setCustomId('open-ticket')
            .setLabel('Ouvrir un Ticket')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(openTicketButton);

        await interaction.channel.send({ embeds: [embed], components: [row] });

        interaction.reply({ content: 'Panneau de tickets configuré avec succès!', ephemeral: true });
    },

    get data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
    }
};