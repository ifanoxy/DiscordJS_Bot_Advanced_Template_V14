const { Client, Partials, Collection, GatewayIntentBits } = require("discord.js");
const { DirectMessages, MessageContent, DirectMessageTyping, Guilds, GuildPresences, GuildMessages } = GatewayIntentBits;
const { User, Message, Channel,GuildMember} = Partials;
const { loadEvents } = require('./handler/eventHandler');
const { loadInteraction } = require("./handler/InteractionHandler");
const client = new Client({
    intents: [DirectMessages, MessageContent, DirectMessageTyping, Guilds, GuildPresences, GuildMessages],
    partials: [User, Message, Channel, GuildMember],
});
const config = require("./config");

client.commands = new Collection();
client.AutoComplete = new Collection();
client.Button = new Collection();
client.ContextMenu = new Collection();
client.ModalSubmit = new Collection();
client.SelectMenu = new Collection();

client.login(process.env.TOKEN || config.token)
    .then(() => {
        loadEvents(client);
        loadInteraction(client);
    })
    .catch(err => {
        console.log(err.stack)
    })

process.on('unhandledRejection', async error => {
    console.log(error.stack)
})

process.on('uncaughtException', async error => {
    console.log(error.stack)
})