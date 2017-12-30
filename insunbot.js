const Discord = require("discord.js");
const client = new Discord.Client();

const fs = require('fs');
const config = require("./config.json");

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

client.on("message", (message) => {
    if (message.author.bot)
        return;
    if (message.content.indexOf(config.prefix) !== 0)
        return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!command.match(/[a-z\-]+/g))
    {
        console.log(`Command ${command} was failed RegEx evaluation.`);
        return;
    }

    try
    {
        let commandFileName = `./commands/${command}.js`;
        if (!fs.existsSync(commandFileName))
        {
            console.log(`Could not find command file ${commandFileName}.`);
            return;
        }

        let commandFile = require(commandFileName);
        commandFile.run(client, message, args);
    }
    catch (err)
    {
        console.error(err);
    }
});

client.login(config.token);