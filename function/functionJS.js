module.exports = {
  async embed(MessageOrInteraction, text, ephemeral, colorSet) {
    MessageOrInteraction.reply({
      embeds: [
        {
          color: colorSet,
          title: text,
        },
      ],
      ephemeral: ephemeral,
    });
  },
  async QuestionReponce(MessageOrInteraction, text, client) {
    const id = MessageOrInteraction.user
      ? MessageOrInteraction.user.id
      : MessageOrInteraction.author.id;
    const filterMessage = (m) => m.author.id === id && !m.author.bot;

    const Question = await MessageOrInteraction.channel.send({
      embeds: [
        {
          color: client.colorWarn,
          title: text,
        },
      ],
      fetchReply: true,
    });
    const reponce = (
      await MessageOrInteraction.channel.awaitMessages({
        filter: filterMessage,
        max: 1,
        time: 30000,
      })
    ).first();

    if (!reponce) {
      Question.delete().catch(() => {});
      await MessageOrInteraction.channel
        .send({
          embeds: [
            {
              color: client.colorError,
              title: "⏳ Vous n'avez pas répondu dans les temps.",
            },
          ],
        })
        .then((m) => {
          setTimeout(() => {
            m.delete().catch(() => {});
          }, 5_000);
        })
        .catch(() => {});
      return undefined;
    }
    if (reponce.content.toLowerCase() === "cancel") {
      Question.delete().catch(() => {});
      reponce.delete().catch(() => {});
      await MessageOrInteraction.channel
        .send({
          embeds: [
            {
              color: client.colorSucces,
              title: "La demande à bien été annuler",
            },
          ],
        })
        .then((m) => {
          setTimeout(() => {
            m.delete().catch(() => {});
          }, 5_000);
        })
        .catch(() => {});
      return undefined;
    }
    Question.delete().catch(() => {});
    reponce.delete().catch(() => {});
    return reponce;
  },
};
