module.exports.run = async (client, message, args) => {
  const { RichEmbed } = require("discord.js");
  
  const suggestion = args.join(" ")
  
  if (suggestion == 0) return message.channel.send("oh no, you didnt tell me what your suggestion is!")
  
  const Vote = new RichEmbed()
      .setTitle("Poll")
      .setColor("#de1073")
      .setDescription(suggestion)
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setFooter("Astolfo.js","https://media.giphy.com/media/MEd88QoSanUvXJSwJd/giphy.gif")
      .setTimestamp()
      
  message.channel.send(Vote)
      .then(function (message) {
              message.react("👍")
              
              message.react("👎")
            }).catch(function() {
             });
  
  
}

module.exports.help = {
  name: "suggest",
  aliases: ["suggestion","vote","poll"],
  usage: "<suggestion/vote>",
  category: "Misc",
}