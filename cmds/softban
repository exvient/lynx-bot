
const Discord = require("discord.js");
const moment  = require("moment");

module.exports.run = async (bot, message, args, jChannel) => {

    let bUser   = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let bReason = args.join(" ").slice(22);
    if (!bUser) return message.channel.send("**>>>** Invalid User.");
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**>>>** You do not have the permision to Softban users.");
    if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("**>>>** You cannot Softban this user.")

    let banEmbed = new Discord.RichEmbed()
    .setTitle("~ **SoftBan** ~")
    .setColor("#606060")
    .addField("**~**User**~**", bUser)
    .addField("**~**Author**~**", message.author)
    .addField("**~**Channel**~**", message.channel)
    .addField("**~**Time**~**", moment(message.createdAt).format(`MMMM Do YYYY, h:mm a`))
    .addField("**~**Reason**~**", bReason);

    let banAnnounce = new Discord.RichEmbed()
    .setColor("#606060")
    .setDescription(`User ${bUser} got SoftBanned from the server!`);

    let banDm = new Discord.RichEmbed()
    .setColor("#606060")
    .setDescription(`**>>>** You got SoftBanned from ${message.guild.name}!\n**>>>** Reason: ${bReason}\n**>>>** You can join again immediately.`);

    try {
        message.guild.channels.get(jChannel).createInvite().then(invite =>
            bUser.send(invite.url)
        );
        bUser.send(banDm);
    } catch(e) {
        console.error(e.stack);
    }

    message.delete().catch(O_o=>{});
    message.guild.member(bUser).ban(bReason);
    message.guild.unban(bUser.id).catch(O_o=>{});
    botChannel.send(banEmbed);

}

module.exports.help = {
    name: "softban"
}
