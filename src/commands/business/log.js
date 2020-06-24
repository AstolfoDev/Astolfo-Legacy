const db = require("betterqdb");
const { RichEmbed } = require("discord.js");
const userData = new db.table("user");
const companyData = new db.table("company");

module.exports.run = async (client, message, args) => {
  
  const company = companyData.get(`u${message.author.id}.company`)
  
  const info = companyData.get(`${company}.members`)
  console.log(companyData.all()[0].data.Name)
};

module.exports.help = {
  name: "log",
  category: "Business",
};