module.exports.run = async (client, message, args) => {
  const eco = require("discord-economy");
  const Discord = require("discord.js");
  
  if (message.mentions.users.first()) {
  
        var output = await eco.Leaderboard({
          filter: x => x.balance > 0,
          search: message.mentions.users.first().id
        })
        message.channel.send(`The user ${message.mentions.users.first().tag} is number ${output} on my leaderboard!`);
  
      } else {
  
        eco.Leaderboard({
          limit: 10,
          filter: x => x.balance > 0
        }).then(async users => {
  
          if (users[0]) var firstplace = await client.fetchUser(users[0].userid)
          if (users[1]) var secondplace = await client.fetchUser(users[1].userid) 
          if (users[2]) var thirdplace = await client.fetchUser(users[2].userid)
         
        const embed = new Discord.RichEmbed()
          .setTitle("**Astolfo Leaderboard**")
          .setColor("#de1073")
          .setDescription(`[Global economy balances]\n1 - ${firstplace && firstplace.tag || 'Nobody Yet'} : ${users[0] && users[0].balance || 'None'}
2 - ${secondplace && secondplace.tag || 'Nobody Yet'} : ${users[1] && users[1].balance || 'None'}
3 - ${thirdplace && thirdplace.tag || 'Nobody Yet'} : ${users[2] && users[2].balance || 'None'}`)
  message.channel.send(embed)
  
        })
  
      }
    }

  module.exports.help = {
	name: "leaderboard",
	aliases: ["lb", "top", "check"],
	description: "Check the leaderbaord",
	usage: "[user]",
	category: "Economy",
};