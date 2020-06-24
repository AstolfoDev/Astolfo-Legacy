const db = require("betterqdb");
const userData = new db.table("user");
const companyData = new db.table("company");
const { RichEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  
  const confirm = args.join(" ");
  
  if (!userData.has(`u${message.author.id}.company`)) return message.channel.send("ur not in any companies!!!!1!!")
  
  const company = userData.get(`u${message.author.id}.company`)
  
  const compInfo = companyData.get(company)
  
  
  
  const owner = compInfo.Owner
  
  
  if (message.author.id != owner) return message.channel.send(`you do not own ${compInfo.Name}!!! sooooooo you cannot disband it!!`)
  
  if (!confirm) return message.channel.send(`pls type \`/disband ${company}\` to confirm the company deletion!`)
  
  if (confirm != company) return message.channel.send(`ur input "${confirm}" does not match "${company}"`)
  
  
  const memberss = companyData.get(`${company}.members`)
  
  const amount = memberss.length
  for (let i=0; i<amount; i++) {
    
    var user = client.users.get(memberss[i])
    user.send(`The ${company} company has been deleted and you have been removed from it.`)
    userData.delete(`u${memberss[i]}.company`);
  }
  
  companyData.delete(`${company}.members`)
  companyData.delete(company)
  
  message.channel.send(`${company} has been disbanded`)
};

module.exports.help = {
  name: "disband",
  category: "Business",
};

