const config = require('../config.json');

exports.run = (client, message, args) => {
    let isAuthorized = message.member.roles.some(r => { return config.personnelRoles.includes(r.name); });
    if (!isAuthorized)
        return message.reply('you do not have permission to run this command.');

    let role = message.guild.roles.find("name", "Executive");
    let member = message.mentions.members.first();
    if (typeof member !== 'undefined' && member !== null)
    {
        if (member.user.bot)
            return message.reply('you cannot modify a bot.');

        if (member.roles.some(r => { return r.name === 'Executive';}))
            return message.reply(`${member.displayName} is already an exec.`);

        member.addRole(role).catch(console.error);
    }
};