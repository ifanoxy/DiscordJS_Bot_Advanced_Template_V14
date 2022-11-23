const { ShardingManager } = require('discord.js');
const config = require("./config");

const manager = new ShardingManager('./bot.js', { token: process.env.TOKEN || config.token });

manager.on('shardCreate', shard => console.log(`Lancement de la shard : ${shard.id}`));

manager.spawn();