const Discord = require("discord.js");
const TOKEN = process.env.TOKEN
const prefix = ".;"
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");

bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json")

fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0){
        console.log("No commands to load.");
        return;
    }
    console.log(`Loading ${jsfiles.length} command(s).`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        bot.commands.set(props.help.name, props);
    });
});



bot.on("ready", () => {

    bot.user.setActivity("The prefix is .; | .;help")
    console.log("Lynxbot is running.");

    bot.setInterval(() => {
        for(let i in bot.mutes) {
            let time = bot.mutes[i].time;
            let guildId = bot.mutes[i].guild;
            let guild = bot.guilds.get(guildId);
            let member = guild.members.get(i)
            let mutedRole = guild.roles.find(r => r.name=== "LynxBot Mute");
            let channel = guild.channel
            if(!mutedRole) continue;

            if(Date.now() > time) {

                member.removeRole(mutedRole);

                delete bot.mutes[i];

                fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
                    if(err) throw err;
                })
            }
        }
    }, 3000)
});
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(/(?:https?:\/)?discord(?:app.com\/invite|.gg)/gi.test(message.content)){
        message.delete();
        return;
    }

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;
    

    let cmd = bot.commands.get(command.slice(prefix.length))
    if(cmd) cmd.run(bot, message, args)})

bot.login(TOKEN);

