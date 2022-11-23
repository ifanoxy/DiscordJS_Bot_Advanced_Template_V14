const { CommandInteraction, EmbedBuilder, InteractionType} = require('discord.js');
const { Client } = require("discord.js")

module.exports = {
    name:'interactionCreate',
    once: false,
    /**
     * 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client, db) {
        switch(true) {
            case interaction.isChatInputCommand() : {
                const command = client.commands.get(interaction.commandName);
                if(!command)return interaction.reply({embeds:[new EmbedBuilder().setColor("#36393F").setDescription('This command does not exist !')], ephemeral: true})
                command.execute(interaction, client, db);
            }break;
            case interaction.isAutocomplete() : {

            }break;
            case interaction.isButton() : {
                const button = client.Button.get(interaction.customId)
                if(!button)return interaction.reply({embeds:[new EmbedBuilder().setColor("#36393F").setDescription('This button does not exist !')], ephemeral: true})
                button.execute(interaction, client, db)
            }break;
            case interaction.isModalSubmit() : {
                const modal = client.ModalSubmit.get(interaction.customId)
                if(!modal)return interaction.reply({embeds:[new EmbedBuilder().setColor("#36393F").setDescription('This mod does not exist !')], ephemeral: true})
                modal.execute(interaction, client, db)
            }break;
            case interaction.isSelectMenu() : {
                const selectMenu = client.SelectMenu.get(interaction.customId)
                if(!selectMenu)return interaction.reply({embeds:[new EmbedBuilder().setColor("#36393F").setDescription('This Select Menu does not exist !')], ephemeral: true})
                selectMenu.execute(interaction, client, db)
            }break;
            case interaction.isUserContextMenuCommand() : {
                const ContextMenu = client.ContextMenu.get(interaction.commandName);
                if(!ContextMenu)return interaction.reply({embeds:[new EmbedBuilder().setColor("#36393F").setDescription('This ContextMenu does not exist !')], ephemeral: true})
                ContextMenu.execute(interaction, client, db);
            }break;
        }
    }
}