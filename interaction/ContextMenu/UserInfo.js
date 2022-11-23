const { ContextMenuCommandBuilder, ApplicationCommandType, ContextMenuCommandInteraction, Client, EmbedBuilder } = require("discord.js");
module.exports = {
    data: new ContextMenuCommandBuilder()
    .setName('User information')
    .setType(ApplicationCommandType.User),
    /**
     * 
     * @param {ContextMenuCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const target = interaction.guild.members.cache.get(interaction.targetId)
        const UserInfo = new EmbedBuilder()
            .setColor('#e7905e')
            .setTitle(`Information sur ${target.user.tag}`)
            .setDescription(`
            bot : ${String(target.user.bot).replace('true',"Yes").replace('false',"No")}
            Date of account creation <t:${Math.round(target.user.createdTimestamp/1000)}>
            Id : ${target.user.id}

            **Information about this server ${interaction.guild}**
            `)
            .addFields(
                {name: `Roles`, value: `${target.roles.cache.map(a => a).filter(a => a.name !== "@everyone").join("\n")}`},
            )
            .setThumbnail(target.user.avatarURL())
            .setImage(target.user.bannerURL())
        interaction.reply({embeds: [UserInfo], ephemeral: true})
    }
}