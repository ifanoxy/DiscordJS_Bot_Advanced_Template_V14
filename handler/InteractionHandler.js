const config = require('../config');

function loadInteraction(client) {
    const ascii = require('ascii-table');
    const fs = require('fs');
    const table = new ascii().setHeading("Interaction","Status", "Type");

    let contextMenusArray = [];
    let developerArray = [];

    const commandsFolders = fs.readdirSync("./commandes");
    for (const folder of commandsFolders) {
        const commandFiles = fs
        .readdirSync(`./commandes/${folder}`)
        .filter((file) => file.endsWith(".js"));

        for (const file of commandFiles) {
            const commandFile = require(`../commandes/${folder}/${file}`);

            client.commands.set(commandFile.data.name, commandFile);

            if(commandFile.developer) developerArray.push(commandFile.data.toJSON())
            else contextMenusArray.push(commandFile.data.toJSON());

            table.addRow(file, "✔️", "SlashCommand");
            continue;
        }
    }

    const interactionsFolders = fs.readdirSync("./interaction");
    for (const folder of interactionsFolders){
        switch(folder) {
            case "Button" : {
                    const commandFiles = fs.readdirSync(`./interaction/${folder}`).filter((file) => file.endsWith(".js"));
                    for (const file of commandFiles) {
                        const commandFile = require(`../interaction/${folder}/${file}`);
                        client.Button.set(commandFile.customId, commandFile);
                        table.addRow(file, "✔️", folder);
                        continue;
                    }
            }break;
            case "ContextMenu" : {
                    const commandFiles = fs.readdirSync(`./interaction/${folder}`).filter((file) => file.endsWith(".js"));
                    for (const file of commandFiles) {
                        const commandFile = require(`../interaction/${folder}/${file}`);
                        client.ContextMenu.set(commandFile.data.name, commandFile);
                        table.addRow(file, "✔️", folder);
                        if(commandFile.developer) developerArray.push(commandFile.data.toJSON())
                        else contextMenusArray.push(commandFile.data.toJSON());
                        continue;
                    }
            }break;
            case "ModalSubmit" : {
                    const commandFiles = fs.readdirSync(`./interaction/${folder}`).filter((file) => file.endsWith(".js"));
                    for (const file of commandFiles) {
                        const commandFile = require(`../interaction/${folder}/${file}`);
                        client.ModalSubmit.set(commandFile.customId, commandFile);
                        table.addRow(file, "✔️", folder);
                        continue;
                    }
            }break;
            case "SelectMenu" : {
                    const commandFiles = fs.readdirSync(`./interaction/${folder}`).filter((file) => file.endsWith(".js"));
                    for (const file of commandFiles) {
                        const commandFile = require(`../interaction/${folder}/${file}`);
                        client.SelectMenu.set(commandFile.customId, commandFile);
                        table.addRow(file, "✔️", folder);
                        continue;
                    }
            }break;
        }
    }
    
    client.application.commands.set(contextMenusArray)
    const developerGuild = client.guilds.cache.get(config.supportGuild)
    developerGuild.commands.set(developerArray);

    return console.log(table.toString(), "\nInteraction loaded")
}

module.exports = { loadInteraction }