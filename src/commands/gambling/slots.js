module.exports.run = async (client, message, args) => {
  const eco = require("discord-economy");
  var amount = args[0]
  
  if (!amount) return message.reply("errrrrm you need to put an amount to bet plz ;3")
  if (amount < 1) return message.channel.send("rawr x3 nice")
  if (isNaN(parseInt(args[0])) == true) return message.reply("grrr thats not a number!!")
  
  if (amount == 0) return message.reply("eeeeeeeeeh you cant just bet nothing... can you?")
  
  var output = await eco.FetchBalance(message.author.id)
  if (output.balance < amount) return message.reply(`waaaah! you don't have ${amount} credits to bet!`)
  
  var gamble = await eco.Slots(message.author.id, amount, {
    width: 3,
    height: 1
  }).catch(console.error)
  message.channel.send(gamble.grid)
  message.reply(`lemme take a loooksies... seems like you ${gamble.output}!!!\nYou now have ${gamble.newbalance}!!!`)
};

module.exports.help = {
  name: "slots",
  aliases: ["slot","sm","machine"],
  usage: "<bet>",
  category: "Gambling",
}