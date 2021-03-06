const config = require('../config.json');

exports.run = (client, message, args) => {
    let isAuthorized = message.member.roles.some(r => { return config.execRoles.includes(r.name); });
    if (!isAuthorized)
    {
        return message.reply('you do not have permission to run this command.');
    }

    let role = message.guild.roles.find("name", "Member");
    let member = message.mentions.members.first();
    if (typeof member !== 'undefined' && member !== null)
    {
        if (member.user.bot)
            return message.reply('you cannot modify a bot.');

        if (member.roles.some(r => { return r.name !== '@everyone';}))
            return message.reply(`${member.displayName} is already a member of Insun.`);

        member.addRole(role).catch(console.error);

        const general = message.guild.channels.find(c => c.name === 'general');
        if (typeof general !== 'undefined' && general !== null)
            general.send(`Welcome to the Insun Discord server ${member.user}!`).catch(console.error);
    }
};