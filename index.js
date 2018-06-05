const Discord = require("discord.js");
let sent = new Set();
let cdseconds = 60;
let channels = new Set();

const client = new Discord.Client({disableEveryone: true});

client.on("ready", async () => {
  console.log(`${client.user.username} is online!}`);
});

client.on("message", async message => {
  if (message.author.bot) return;

  channels.forEach(function(value){
  if(message.channel.id === value){
    if(message.member.roles.find("name", "NoRep")) return;
    if(!sent.has(message.author.id)){
      message.author.send("Hi there Commander, I am Clyde. Please note that the trade chats have a **1 min cool-down** between every message to reduce text flood.");
    }
    sent.add(message.author.id);
    var cdrole = message.guild.roles.find('name', 'CD');

    message.member.addRole(cdrole);

    setTimeout(() => {
      message.member.removeRole(cdrole);
    }, cdseconds * 1000);
  }
});

  if(message.member.hasPermissions("ADMINISTRATOR") || message.member.roles.find("name", "Coder")) {
    const PREFIX = ">";
    const args = message.content.split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === ">cda"){
      let cdchannel = message.channel.id;
      channels.add(cdchannel);
      message.channel.send("Enabled cooldown in this channel.");
    } else if (command === ">cdd"){
      let cdchannel = message.channel.id;
      channels.delete(cdchannel);
      message.channel.send("Disabled cooldown in this channel.");
    } else if (command === ">cdl"){
      channels.forEach(function(value){
        message.channel.send(value);
    });
  }
  if (message.contains("/rank")) {
	  let role = member.guild.roles.find('name', 'Member');
	  member.removeRole(role);
  }
  }
});

client.on('guildMemberAdd', member => {
  let role = member.guild.roles.find('name', 'Member');
  member.addRole(role);
});

client.login(process.env.BOT_TOKEN);
