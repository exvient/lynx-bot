const Discord = module.require('discord.js')

module.exports.run = async (bot, message, args) => {
    let embed1 = new Discord.RichEmbed();
    embed1.setAuthor(message.author.username);
    embed1.setDescription(":no_entry_sign: You don't have permission to do that.");
    embed1.setColor("#FF7575");

if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed1);


let toBan = message.guild.member(message.mentions.users.first());
    let embed = new Discord.RichEmbed();
    embed.setAuthor(message.author.username);
    embed.setDescription(":no_entry_sign: You did not specify a user to ban.");
    embed.setColor("#FF7575");
if(!toBan) return message.channel.send(embed);
    let embed4= new Discord.RichEmbed();
    embed4.setAuthor(message.author.username);
    embed4.setDescription(":no_entry_sign: You cannot ban yourself...");
    embed4.setColor("#FF7575");
if(toBan.id === message.author.id) return message.channel.send(embed4)
    let embed5= new Discord.RichEmbed();
    embed5.setAuthor(message.author.username);
    embed5.setDescription(":no_entry_sign: You cannot ban someone the same role or higher than you.");
    embed5.setColor("#FF7575");
if(toBan.highestRole.position >= message.member.highestRole.position) return message.channel.send(embed5)
    
    
    let embed6 = new Discord.RichEmbed();
    embed6.setAuthor(message.author.username);
    embed6.setDescription(`:white_check_mark: The user **${toBan}** has been banned by ${message.author.username}.`)
    embed6.setColor("#43D490")
    await ban(toBan).; 
    message.channel.send(embed6)


}
module.exports.help = {
    name: "ban"
}
