module.exports.run = async (client, message, args) => {
  const eco = require('discord-economy');
  var user = message.mentions.users.first()
  var amount = args[1]
  
  if ((message.author.id == 193044575500238849 || message.author.id == 261498586611712000) == false) return message.reply("*~gasp!* you shouldnt be using that command!.... uwu")
  if (!user) return message.channel.send("[Debug] First argument, 'user', missing or invalid.")
  
  if (!amount) return message.channel.send("[Debug] Second argument, 'amount', missing or invalid.")
  
  if (isNaN(parseInt(amount)) == true) return message.channel.send("[Debug] Second argument, 'amount', is NaN.")
  
  eco.AddToBalance(user.id, amount)
  message.channel.send(`[Debug] Updated Database\nCR: ${user.balance}\nID: ${user.id}`)
  
};

module.exports.help = {
  name: "add",
  aliases: ["a"],
  category: "Debug",
  usage: "<@user> <amount>",
};