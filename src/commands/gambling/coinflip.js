module.exports.run = async (client, message, args) => {
  const eco = require("discord-economy");
  var flip = args[0]
      var amount = args[1]
      

      if (!flip || !['heads', 'tails'].includes(flip)) return message.reply('hmph? you forget to choose heads or tails')
      if (!amount) return message.reply(`ugggggh you forgot to say how many coins you wanted to bet!!`)
      if (amount < 1) return message.channel.send("nuuuuu ty <3")
  
      var output = await eco.FetchBalance(message.author.id)
      if (output.balance < amount) return message.reply(`h—haah?! you don't have ${amount}!`)
  
      var gamble = await eco.Coinflip(message.author.id, flip, amount).catch(console.error)
      message.reply(`You ${gamble.output}! New balance: ${gamble.newbalance}`)
      
      if (gamble.output == "lost") {
        //cr giveM = [Math.floor(Math.random()*amount)];
        //cco.AddToBalance("193044575500238849", parseInt(giveM));
        const db = require("betterqdb");
        const userData = new db.table("user");
        userData.add(`u193044575500238849.bank`, amount);
      }
  
    }

  module.exports.help = {
	name: "coinflip",
	aliases: ["cf", "flip"],
	description: "Flip a coin",
	usage: "<heads/tails> <bet>",
	category: "Gambling",
};