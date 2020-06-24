module.exports.run = async (client, message, args) => {
  const eco = require("discord-economy");
  var roll = args[0]
  var amount = args[1]

  if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) return message.reply('Specify the roll, it should be a number between 1-6')
  if (!amount) return message.reply('Specify the amount you want to gamble!')
 if (amount < 1) return message.channel.send("lmfao no tyyyyyy!!! <3")
 
  var output = eco.FetchBalance(message.author.id)
  if (output.balance < amount) return message.reply('You have fewer coins than the amount you want to gamble!')
 
  var gamble = await eco.Dice(message.author.id, roll, amount).catch(console.error)
  message.reply(`The dice rolled ${gamble.dice}. So you ${gamble.output}! New balance: ${gamble.newbalance}`)
 
  }

  module.exports.help = {
	name: "roll",
	aliases: ["dice"],
	description: "Roll a dice",
	usgae: "<side> <bet>",
	category: "Gambling",
};