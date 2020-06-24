const db = require('betterqdb');
let userData = new db.table("user");
let guildData = new db.table("guild");


module.exports.run = async (client, message, args) => {
  const eco = require("discord-economy");
  var output = await eco.FetchBalance(message.author.id)

 // let output = userData.get(`u${message.author.id}.coins`);

  message.reply(`owo you currently have ${output.balance} credits.`);
};

// .then(msg => {msg.delete(5000)})

module.exports.help = {
	name: "balance",
	aliases: ["bal", "money"],
	description: "Check your balance",
	usage: "",
	category: "Economy",
};