module.exports.run = async (client, message, args) => {
  const { RichEmbed } = require("discord.js");
  const db = require("betterqdb");
  const userData = new db.table("user");
  
  const funds = parseInt(userData.get(`u${message.author.id}.bank`));
  
  const Bank = new RichEmbed()
    .setTitle(`Bank uwu of Astowolfo`)
    .setColor(`#de1073`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setThumbnail(`https://media.giphy.com/media/13FvLTDaKHKcX6/giphy.gif`)
    .setDescription(`Account howolder: ${message.author.username}\nAccount ID: 00${message.author.discriminator}1\nAccount Balance: ${new Intl.NumberFormat().format(funds)}`)
    .setFooter("Astolfo.js")
    .setTimestamp()
  
  message.channel.send(Bank);
};

module.exports.help = {
  name: "bank",
  category: "st0nks market",
};