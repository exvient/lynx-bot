const api = "http://jsonplaceholder.typicode.com/posts"
const Discord = module.require('discord.js')
const snekfetch = require("snekfetch")

module.exports.run = async (bot, message, args) => {
    snekfetch.get(api).then(r => {
        let body = r.body
        let id = Number(args[0])
        let embed = new Discord.RichEmbed();
        embed.setAuthor(message.author.username)
        embed.setDescription("Please supply an ID")
        embed.setColor("#FF7575");
        let embed2 = new Discord.RichEmbed();
        embed2.setAuthor(message.author.username)
        embed2.setDescription("Please supply a valid number.")
        embed2.setColor("#FF7575");
        let embed3 = new Discord.RichEmbed();
        embed3.setAuthor(message.author.username)
        embed3.setDescription("This entry does not exist.")
        embed3.setColor("#FF7575");
        if(!id) return message.channel.send(embed)
        if(isNaN(id)) return message.channel.send(embed2)

        let entry = body.find(post => post.id === id)
        if(!entry) return message.channel.send(embed3)

        let embed4 = new Discord.RichEmbed();
        embed4.setAuthor(entry.title)
        embed4.setDescription(entry.body)
        embed4.addField("Author ID", entry.userId)
        embed4.setFooter("Post ID: " + entry.id)

        message.channel.send(embed4)
    })
}

module.exports.help = {
    name: "json"
}