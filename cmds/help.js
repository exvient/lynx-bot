const Discord = module.require('discord.js')
let command;
let prefix;

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed();
        embed.setAuthor(message.author.username);
        embed.setDescription("Here's the help you requested.");
        embed.setColor("#1D89E4");
        embed.addField("Commands", "help\nmute*\nunmute*\nuserinfo");
        embed.addField("Note:", "*May only be used by server moderators.")
    message.channel.send(embed);}

module.exports.help = {
    name: "help"
}
