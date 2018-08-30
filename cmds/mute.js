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
    embed.setDescription(":no_entry_sign: You did not specify a user to mute.");
    embed.setColor("#FF7575");
if(!toMute) return message.channel.send(embed);
    let embed4= new Discord.RichEmbed();
    embed4.setAuthor(message.author.username);
    embed4.setDescription(":no_entry_sign: You cannot mute yourself...");
    embed4.setColor("#FF7575");
if(toMute.id === message.author.id) return message.channel.send(embed4)
    let embed5= new Discord.RichEmbed();
    embed5.setAuthor(message.author.username);
    embed5.setDescription(":no_entry_sign: You cannot mute someone the same role or higher than you.");
    embed5.setColor("#FF7575");
if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send(embed5)

let role = message.guild.roles.find(r => r.name === "LynxBot Mute")
if(!role){
    try{
    role = await message.guild.createRole({
        name: "LynxBot Mute",
        permissions: [],
    });

    message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
        })
    })
} 
catch(e) 
{
    console.log(e.stack)
}
}
let embed2 = new Discord.RichEmbed();
    embed2.setAuthor(message.author.username);
    embed2.setDescription(":no_entry_sign: This user is already muted.");
    embed2.setColor("#FF7575");
if(toMute.roles.has(role.id)) return message.channel.send(embed2);


bot.mutes[toMute.id] = {
    guild: message.guild.id,
    time: Date.now() + parseInt(args[1]) * 1000
}
await toMute.addRole(role);
fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
    if(err) throw err;
    let embed = new Discord.RichEmbed();
    embed.setAuthor(message.author.username);
    embed.setDescription(`:white_check_mark: The user **${toMute}** has been muted by ${message.author.username}.`)
    embed.setColor("#43D490")
    message.channel.send(embed)
})
}
module.exports.help = {
    name: "mute"
}