const { ActivityType } = require("discord.js");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`[READY] ${client.user.tag} (${client.user.id}) est prêt | ${client.guilds.cache.size.toLocaleString('fr-FR')} serveurs | ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0).toLocaleString('fr-FR')} utilisateurs`.green);

        var compteurStatus = 1
        setInterval(async() => {
            status = [`ces ${client.guilds.cache.size.toLocaleString('fr-FR')} serveurs`, `ces ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0).toLocaleString('fr-FR')} utilisateurs`, `sa commande /help`]
            compteurStatus = (compteurStatus + 1) % (status.length);
            client.user.setPresence({
                activities: [{
                    name: `${status[compteurStatus]}`,
                    type: ActivityType.Watching,
                }],
                status: "dnd",
            })
        }, 5000);

        //client.guilds.cache.forEach((guild) => {
        //    client.dbGuild.create({
        //        _id: guild.id,
        //    }).then(() => {
        //        console.log(`[DB-CHEK]・Je viens de créer une base de donnée pour le serveur ${guild.name}.`)
        //    }).catch(() => {
        //    })
        //})
        //
    }
}