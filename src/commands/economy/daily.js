module.exports.run = async (client, message, args) => {
  const eco = require("discord-economy");
  var output = await eco.Daily(message.author.id)
 
    if (output.updated) {
 
      var profile = await eco.AddToBalance(message.author.id, 100)
      message.reply(`omgggg you claimed your daily coins successfully! *~wooo!*\nYou now own ${profile.newbalance} credits.`);
 
    } else {
      message.reply(`Oops, you need to wait ${output.timetowait} before you can claim more credits! ;3`)
    }
 
}

// .then(msg => {msg.delete(5000)})

module.exports.help = {
	name: "daily",
	aliases: ["claim", "claimdaily"],
	description: "Claim your daily credits",
	usage: "",
	category: "Economy",
};