module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
    if (!interaction.isButton()) return;

    const ticketCommand = client.commands.get("setup-tickets");

    if (interaction.customId === "open-ticket") {
      await ticketCommand.handleTicketCreation(interaction);
    } else if (interaction.customId === "claim-ticket") {
      await ticketCommand.handleTicketClaim(interaction);
    } else if (interaction.customId === "close-ticket") {
      await ticketCommand.handleTicketClose(interaction);
    }
  },
};
