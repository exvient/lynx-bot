const Discord = module.require('discord.js')
const fs = module.require("fs");
let command;
let prefix;

module.exports.run = async (bot, message, args) => {
    let embed1 = new Discord.RichEmbed();
    embed1.setAuthor(message.author.username);
    embed1.setDescription(":no_entry_sign: You don't have permission to do that.");
    embed1.setColor("#FF7575");

if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embed1);


let toMute = message.guild.member(message.mentions.users.first());
    let embed = new Discord.RichEmbed();
    embed.setAuthor(message.author.username);
    embed.setDescription(":no_entry_sign: You did not specify a user to unmute.");
    embed.setColor("#FF7575");
if(!toMute) return message.channel.send(embed);
let role = message.guild.roles.find(r => r.name === "LynxBot Mute")
let embed2 = new Discord.RichEmbed();
    embed2.setAuthor(message.author.username);
    embed2.setDescription(":no_entry_sign: This user is not muted.");
    embed2.setColor("#FF7575");
if(!role || !toMute.roles.has(role.id)) return message.channel.send(embed2);

await toMute.removeRole(role);
let embed3 = new Discord.RichEmbed();
    embed3.setAuthor(message.author.username);
    embed3.setDescription(`:white_check_mark: The user **${toMute}** has been unmuted by ${message.author.username}.`)
    embed3.setColor("#43D490")
    message.channel.send(embed3)
}
module.exports.help = {
    name: "unmute"
}