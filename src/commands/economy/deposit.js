module.exports.run = async (client, message, args) => {
  
  const eco = require("discord-economy");
  const db = require("betterqdb");
  const { RichEmbed } = require("discord.js");
  const userData = new db.table("user");
  
  const balance = await eco.FetchBalance(message.author.id);
  
  const amount = args[0]
  
  if (!amount) return
  
  if (isNaN(parseInt(amount))) return
  
  if (amount > balance.Balance) return
  
  if (!userData.has(`u${message.author.id}.bank`)) {
    userData.set(`u${message.author.id}.bank`, 0)
  }
  
  userData.add(`u${message.author.id}.bank`, parseInt(amount))
  
  eco.SubtractFromBalance(message.author.id, amount);
  
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
}

module.exports.help = {
  name: "deposit",
  category: "st0nks market",
}