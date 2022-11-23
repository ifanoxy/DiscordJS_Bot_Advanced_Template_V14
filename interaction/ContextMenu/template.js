const { ContextMenuCommandBuilder } = require("discord.js");

module.exports = {
    developer: false,
    data: new ContextMenuCommandBuilder()
        .setName('test'),
    execute(interaction, client) {

    }
}