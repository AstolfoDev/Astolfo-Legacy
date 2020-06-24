const db = require("betterqdb");
const userData = new db.table("user");

const { RichEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  
  var amount = args[0];
  var balance = userData.get(`u${message.author.id}.at`);
  
  if (!amount) return message.channel.send(`u need to speicfy the number of bulletz u wanna buyyyyy!!! ;P`);
  
  if (isNaN(parseInt(amount))) return message.channel.send("dat iz not a valid numberrrrrrrrrrr :3");
  
  var price = amount*10;
  
  if (balance < price) return message.channel.send(`u do not has enough of da moneyyyyzzZz for ${amount} bulletzZzzz!!`);
  
  if (!userData.has(`u${message.author.id}.bullets`)) {
    userData.set(`u${message.author.id}.bullets`, amount)
    userData.subtract(`u${message.author.id}.at`, price)
  }
  else {
    userData.add(`u${message.author.id}.bullets`, amount)
    userData.subtract(`u${message.author.id}.at`, price)
  }
  
  const Display = new RichEmbed()
    .setTitle("Transaction Compleeeeeeeeete!")
    .setColor("#de1073")
    .setDescription(`Product: Bullets\nQuantity: ${amount}\nTID: ${message.author.username[0]}${amount}${Math.floor(Math.random()*1000)}\nCost: ${price} AT`)
    .setFooter("Astolfo.js", message.author.avatarURL)
    .setTimestamp()
  
  message.channel.send(Display);
};

module.exports.help = {
  name: "buyammo",
  aliases: ["getammo"],
  category: "Weaponry",
};