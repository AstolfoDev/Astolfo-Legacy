module.exports.run = async (client, message, args) => {
  const db = require("betterqdb");
  const marketData = new db.table("market");
  const userData = new db.table("user");
  const eco = require("discord-economy");
  const { RichEmbed } = require("discord.js");
  
  var marketid = args[0];
  
  if (!marketid) {
    message.channel.send("pls enter the id of the trade you want to accept!")
  }
  
  const offers = await marketData.get("offers")
  
  
  if (marketid < 1 || marketid > offers.length || isNaN(parseInt(marketid)) === true) {
    message.channel.send("sowwy! that id is invalid!!")
  }
  
  if (offers[marketid-1].ID == message.author.id) return message.channel.send("oi oi oi, u cant buy ur own listing! if u want to get rid of it then do `/cancel <marketID>` to remove ur offer!!! :3")
  
  var currency = offers[marketid-1].To
  
  var amount = offers[marketid-1].AmountTo
  
  var balTC = userData.get(`u${message.author.id}.tc`);
  
  var balAT = userData.get(`u${message.author.id}.at`);
  
  var currency2;
  var amount2 = offers[marketid-1].AmountFrom
  
  if (offers[marketid-1].From == "credit") {
    currency2 = "cr"
  }
  else if (offers[marketid-1].From == "trapcoin") {
    currency2 = "tc"
  }
  else if (offers[marketid-1].From == "apocrypha token") {
    currency2 = "at"
  }
  
  if (currency == "credit") {
    checkBal = await eco.FetchBalance(message.author.id)
    
    if (checkBal.balance < amount) {
      message.channel.send(`sowwwwy!!! u dont have enough ${currency} for this trade!!`)
      return
    }
    else {

      // Hey Agent ;3
      
      eco.AddToBalance(offers[marketid-1].ID, offers[marketid-1].AmountTo)
      eco.SubtractFromBalance(message.author.id, offers[marketid-1].AmountTo)
      
    //  userData.subtract(`u${offers[marketid-1].ID}.${currency2}`, amount2)
      
      userData.add(`u${message.author.id}.${currency2}`, amount2)
    }
  }
  
  if (currency == "trapcoin") {
    if (balTC < offers[marketid-1].AmountTo) {
      message.channel.send(`uh ohh!!!! eeeeeh!! u dont have enough ${currency} to accept this offer!!!`)
      return
    }
    if (currency2 == "cr") {
      userData.add(`u${offers[marketid-1].ID}.tc`, offers[marketid-1].AmountTo)
      
      userData.subtract(`u${message.author.id}.tc`, offers[marketid-1].AmountTo)
      
      eco.AddToBalance(message.author.id, amount2)
      
    //  eco.SubtractFromBalance(offers[marketid-1], amount2)
    }
    else {
      userData.add(`u${offers[marketid-1].ID}.tc`, offers[marketid-1].AmountTo)
      
      userData.subtract(`u${message.author.id}.tc`, offers[marketid-1].AmountTo)
      
     // userData.subtract(`u${offers[marketid-1]}.${currency2}`, amount2)
      
      userData.add(`u${message.author.id}.${currency2}`, parseInt(amount2))
      
    }
  }
  
  if (currency == "apocrypha token") {
    if (balAT < offers[marketid-1].AmountTo) {
      message.channel.send(`AH!! AHHHHHHHHHH!!!!!!!!!! you totally dont have enough ${currency} for this trade!!!!1!1!1!1!!!!!!!!`)
      return
    }
    if (currency2 == "cr") {
      userData.add(`u${offers[marketid-1].ID}.at`, offers[marketid-1].AmountTo)
      
      userData.subtract(`u${message.author.id}.at`, offers[marketid-1].AmountTo)
      
      eco.AddToBalance(message.author.id, amount2)
      
     // eco.SubtractFromBalance(offers[marketid-1], amount2)
    }
    else {
      userData.add(`u${offers[marketid-1].ID}.at`, parseInt(offers[marketid-1].AmountTo))
      
      userData.subtract(`u${message.author.id}.at`, offers[marketid-1].AmountTo)
      
      //userData.subtract(`u${offers[marketid-1]}.${currency2}`, amount2);
      
      userData.add(`u${message.author.id}.${currency2}`)
      
    }
  }
  
  const Display = new RichEmbed()
    .setTitle(`AstolfoEx Marketplace`)
    .setColor(`#de1073`)
    .setDescription(`**Twansaction detaillllllz**\nSeller: ${offers[marketid-1].Username}\nBuyer: ${message.author.username}\n\n**Twaaaaaade Detaiws**\nOffering: ${offers[marketid-1].AmountFrom} ${offers[marketid-1].From}\nRequesting: ${offers[marketid-1].AmountTo} ${offers[marketid-1].To}`)
    .setThumbnail("https://media.giphy.com/media/UrsXRIHqHbIkwVhoKe/giphy.gif")
    .setFooter("Astolfo.js", "https://media.giphy.com/media/UrsXRIHqHbIkwVhoKe/giphy.gif")
    .setTimestamp()
  
  message.channel.send(Display)
  
  const dm = message.author.id
  
  const user = client.users.get(offers[marketid-1].ID);
  
  if (user != undefined) {
      user.send(Display)
  }
  
  var removeValue = marketid-1;
  
  var removeArray = offers;
  removeArray.splice(removeValue, 1);
  marketData.delete("offers");
  
  for (element of removeArray) {
    marketData.push("offers", element)
  }
  
  
};

module.exports.help = {
  name: "acceptoffer",
  aliases: ["trade","offer"],
  category: "st0nks market",
  usage: "<market ID>"
};