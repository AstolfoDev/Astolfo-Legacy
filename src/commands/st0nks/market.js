const db = require('betterqdb');
const userData = new db.table('user');
const marketData = new db.table('market');

const { RichEmbed } = require('discord.js');
const Discord = require('discord.js')
const eco = require('discord-economy');

module.exports.run = async (client, message, args) => {

  offers = marketData.get(`offers`);
  
  if (offers != null) {
    var pages = Math.ceil(offers.length/5)
  }
  else {
    var pages = 0;
  }
  
  var page = 1
  
  amount = pages*5;
  
  if (args[0] != " " && args[0] != 0) {
    page = args[0];
    if (page > pages || page < 1) {
      message.channel.send(`uhhhh there is no page ${page} available!`);
      return
    };
  }
  if (page == undefined) {
    page = 1
  };
  
  var data = [];
  
  var offerlist = "";
  
  blank = {From: " ", To: " ", AmountFrom: " ", AmountTo: " ", Username: " "}
  
 var empty = "**sowwy uwu there are no active listings on the market x3 check back later OwO**";
 
 
  for (let i = 0; i < amount; i++) {
    if (i < offers.length) {
      data[i] = `[ID: ${i+1}] ${offers[i].Username}\nOffering: ${offers[i].AmountFrom} ${offers[i].From}\nFor: ${offers[i].AmountTo} ${offers[i].To}`
    }
    else if (i >= offers.length) {
      data[i] =
      "";
      //data[i] = `[ID: ${i+1}] N/A\nNo offer available`
    }
  }

  for (let x = 0; x < data.length; x++) {
    offerlist = `${offerlist+data[x]}\n\n`
  }

  
  if (offers != null) {
    const Display = new RichEmbed()
      .setTitle(`AstolfoEx Marketplace`)
      .setColor(`#de1073`)
      .setDescription(`${data[page*5-5]}\n\n${data[page*5-4]}\n\n${data[page*5-3]}\n\n${data[page*5-2]}\n\n${data[page*5-1]}`)
      .setThumbnail("https://www.sbs.com.au/popasia/sites/sbs.com.au.popasia/files/anime-money-gif.gif")
      .setFooter(`Page ${page}/${pages} | Astolfo.js`, "https://www.sbs.com.au/popasia/sites/sbs.com.au.popasia/files/anime-money-gif.gif")
      .setTimestamp()
    message.channel.send(Display)
  }
  
  else {
      const Display = new RichEmbed()
      .setTitle(`AstolfoEx Marketplace`)
      .setColor(`#de1073`)
      .setDescription(empty)
      .setThumbnail("https://www.sbs.com.au/popasia/sites/sbs.com.au.popasia/files/anime-money-gif.gif")
      .setFooter(`Page ${page}/${pages} | Astolfo.js`, "https://www.sbs.com.au/popasia/sites/sbs.com.au.popasia/files/anime-money-gif.gif")
      .setTimestamp()
      
    message.channel.send(Display)
    }
};

module.exports.help = {
  name: "market",
  aliases: ["listings","auction"],
  category: "st0nks market",
};