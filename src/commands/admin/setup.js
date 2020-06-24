module.exports.run = async  (client, message, args) => {
  const enmap = require('enmap');
  if (!message.member.hasPermission('MANAGE_GUILD') && message.author.id != 193044575500238849) return message.channel.send("nope");
  

  const [prop, ...value] = args;
  
  if (!client.settings.has(message.guild.id, prop)) return message.channel.send("[Config] This is not a valid setting you can configure.\n *(Please check your spelling and capitalisation.)*")
  
  if (prop == undefined) return message.channel.send(`**[Config] Use /setup <flag> <value>\nAvailable Flags:**\nprefix\nwelcomeMessage\nwelcomeChannel\nwelcomeImageURL\nroleOnJoin\n*(NOTE: These are all __cAsE sEnSiTiVe__)*\n*[!] Do not edit these if you don't know what you're doing.*`)
  
  client.settings.set(message.guild.id, value.join(" "), prop);
  
  message.channel.send(`[Config] You have successfully changed the value for ${prop} to "${value.join(" ")}".`)
}

module.exports.help = {
  name: "setup",
  aliases: ["setconf","setconfig","configure"],
  usage: "<setting> <new value>",
  description: "Modify the value for a setting in the configuration.",
  category: "admin",
}