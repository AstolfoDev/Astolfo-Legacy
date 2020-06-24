module.exports.run = async (client, message, args) => {
  const eco = require("discord-economy");
  var user = message.mentions.users.first()
      var amount = args[1]
      
      if (amount < 0) return message.reply("e.e hey! you can't use negative numbers lawl")
      
      if (amount == 0) return message.reply("Oh noes! you can't send nothing. Plz put a number greater than zewwo!!!")
      
      if (isNaN(parseInt(amount)) == true) return message.reply("eeeeeeh! thats not a nummmmmbar!!!! gib numberz plssss!!")
  
      if (!user) return message.reply('whooooops! you forgot to ping the person who you want to send credits to!')
      if (!amount) return message.reply('ahhh!! i dont know how much you want to send!! plz tell me ;3')
  
      var output = await eco.FetchBalance(message.author.id)
      if (output.balance < amount) return message.reply(`errrrrm you dont have ${amount} credits!`)
  
      var transfer = await eco.Transfer(message.author.id, user.id, amount)
      message.reply(`oki! lemme send\nBalance from ${message.author.tag}: ${transfer.FromUser}\nBalance from ${user.tag}: ${transfer.ToUser}`);
    }

  module.exports.help = {
	name: "pay",
	aliases: ["send", "transfer", "give", "givecredits"],
	description: "Send credits to another uesr",
	usage: "<user>",
	category: "Economy",
};