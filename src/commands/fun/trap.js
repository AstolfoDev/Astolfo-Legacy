module.exports.run = async (cliemt, message, args) => {
  const { RichEmbed } = require("discord.js");
  
  const Trap = new RichEmbed()
    .setTitle("ooOOoooOoh")
    .setColor("#de1073")
    .setImage("https://media2.giphy.com/media/MEd88QoSanUvXJSwJd/giphy.gif?cid=4bf119fc824cc5564b0804c526000e0d752bed539102694a&rid=giphy.gif")
    .setFooter("Astolfo.js")
    .setTimestamp()
    
  message.channel.send(Trap);

};

module.exports.help = {
  name: "trap",
  aliases: ["traps"],
  usage: "",
  category: "fun",
}