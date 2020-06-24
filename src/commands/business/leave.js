const db = require("betterqdb");
const { RichEmbed } = require("discord.js");
const userData = new db.table("user");
const companyData = new db.table("company");

module.exports.run = async (client, message, args) => {
  
  if (!userData.has(`u${message.author.id}.company`)) return message.channel.send("ur not in any companies!!!!1!!")
  
  const companyName = userData.get(`u${message.author.id}.company`)
  
  if (userData.has(`u${message.author.id}.company`)) {
    const companyInfo = companyData.get(companyName)
    
    if (companyInfo.Owner == message.author.id) return message.channel.send("u cant leave your own company!!! disband it or give someone else ownership first!!")
    var company = userData.get(`u${message.author.id}.company`)
    userData.delete(`u${message.author.id}.company`)
    message.channel.send(`You have left the ${company} company!`)
    
    
    var removeArray = companyData.get(`${companyName}.members`);
    
    var search_term = message.author.id;
    for (var i=removeArray.length-1; i>=0; i--) {
      if (removeArray[i] === search_term) {
        removeArray.splice(i, 1);
        
      }
    }
    
    companyData.delete(`${companyName}.members`)
    
    for (element of removeArray) {
      companyData.push(`${companyName}.members`, element)
    }


  }
};

module.exports.help = {
  name: "leave",
  aliases: ["quitcompany"],
  category: "Business",
};