const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("see the bot latency")
    .setDMPermission(true),
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        const pingembed = new EmbedBuilder()
        .setTitle('Commande ping')
        .setDescription(`🌍 Bot latency **${Date.now() - interaction.createdTimestamp}ms** \n🔧  API Latency **${Math.round(client.ws.ping)}ms**`)
        .setColor('Blurple')
  
        interaction.reply({embeds:[pingembed], ephemeral: true})
    }
}