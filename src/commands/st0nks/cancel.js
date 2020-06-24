module.exports.run = async (client, message, args) => {
  const eco = require("discord-economy");
  const db = require("betterqdb");
  const userData = new db.table("user");
  const marketData = new db.table("market");
  const { RichEmbed } = require("discord.js");
  var offers = marketData.get("offers");
  
  
  if (!args[0] || args[0] === undefined) {
    message.channel.send("plsssss enter the market ID of the offer you wish to cancel!!!");
    return;
  }

  var marketID = args[0];
  
  if (marketID > offers.length || marketID < 1) {
    message.channel.send("invalid market ID!!!!1!1!!!!!!!");
    return;
  }
  
  if (offers[marketID-1].ID != message.author.id) {
    message.channel.send(`listing #${marketID} does not belong to you so you cant cancel it!!!`)
    return;
  }
  
  var removeValue = marketID-1;
  var removeArray = offers;
  
  removeArray.splice(removeValue, 1);

  marketData.delete("offers");
  
  for (element of removeArray) {
    marketData.push("offers", element)
  }
  message.channel.send("oki! ive cancelled your listing!!! :3")
};

module.exports.help = {
  name: "cancel",
  aliases: ["clist"],
  usage: "<marketID>",
  category: "st0nks market",
};