const Discord = module.require('discord.js')
let command;
let prefix;

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed();
        embed.setAuthor(message.author.username);
        embed.setDescription("This is the user's info");
        embed.setColor("#1D89E4");
        embed.addField("Full Username", `${message.author.username}#${message.author.discriminator}`);
        embed.addField("ID", message.author.id);
        embed.addField("Created at", message.author.createdAt);
    message.channel.send(embed);
}

module.exports.help = {
    name: "userinfo"
}