const db = require('betterqdb');
const userData = new db.table("user");
const { RichEmbed } = require('discord.js');

const eco = require('discord-economy');

module.exports.run = async (client, message, args) => {
  var user = message.mentions.users.first()
  var checkUser = 0
  var checker
  
  if (!user) {
    checkUser = message.author
    if (client.users.get(args[0])) {
      checkUser = client.users.get(args[0])
    }
  }
  //if (!user && userData.has(`u${client.users.get(args[0]).id}`)) {
   // checkUser = client.users//.get(args[0])
 // }
  else {
    checkUser = user
  };
  
  var bal = userData.get(`u${checkUser.id}.tc`);
  
  var bal2 = userData.get(`u${checkUser.id}.at`)
  
  var gamer = await eco.FetchBalance(checkUser.id)
  
  var bal3 = gamer.balance;
  
  if (bal === null) {
    bal = 0;
  }
  if (bal2 === null) {
    bal2 = 0;
  }
  
  const Wallet = new RichEmbed()
      .setTitle(`AstolfoEx Wallet`)
      .setThumbnail(`https://media.giphy.com/media/JtBZm3Getg3dqxK0zP/giphy.gif`)
      .setColor(`#de1073`)
      .setAuthor(checkUser.tag, checkUser.avatarURL)
      .setDescription(`**Trap Coin:**\n${Math.round( bal * 100 + Number.EPSILON ) / 100} TC\n\n**Apocrypha Token:**\n${Math.round( bal2 * 100 + Number.EPSILON ) / 100} AT\n\n**Credit:**\n${bal3} CR`)
      .setFooter("Astolfo.js", "https://media.giphy.com/media/MEd88QoSanUvXJSwJd/giphy.gif")
      .setTimestamp()
    
    message.channel.send(Wallet)
};

module.exports.help = {
  name: "wallet",
  aliases: ["tcbal","checktc"],
  category: "st0nks market",
};

