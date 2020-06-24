const db = require("betterqdb");
const { RichEmbed } = require("discord.js");
const userData = new db.table("user");
const companyData = new db.table("company");

module.exports.run = async (client, message, args) => {
  if (userData.has(`u${message.author.id}.company`)) return message.channel.send("ur already in a company! leave that one first before joining a new one!!!!1!! :3");
  
  const company = args.join(" ");
  
  if (!companyData.has(company)) return message.channel.send(`The company "${company}" does not exist`)
  
  
  const info = companyData.get(company);
  
  const open = info.Open.toLowerCase()
  
  
  if (open != "open") return message.channel.send(`${company} is not open! you need an invite to join them!!!`)
  
  
  companyData.push(`${company}.members`, message.author.id)
  
  userData.set(`u${message.author.id}.company`, company)
  
  message.channel.send(`You hazzz successfully joined ${company}!!!!`)
  
  const dm = message.author.id
  
  const user = client.users.get(offers[marketid-1].ID);
  
  user.send(`${message.author.tag} has joined ${company}!!!`);
  
  
};

module.exports.help = {
  name: "join",
  aliases: ["j"],
  category: "Business",
};