const { RichEmbed } = require("discord.js");
const db = require("betterqdb");
const userData = new db.table("user")
const companyData = new db.table("company")

module.exports.run = async (client, message, args) => {
  
  var companyDataAll = companyData.all()
  if (companyDataAll != null) {
    var pages = Math.ceil(companyDataAll.length/5)
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
  
 var empty = "**sowwy uwu there are no companies on the register x3 check back later OwO**";
 
 
  for (let i = 0; i < amount; i++) {
    if (i < companyDataAll.length) {
      data[i] = `**${companyDataAll[i].data.Name}**\nMembers: ${companyDataAll[i].data.members.length}\nState: ${companyDataAll[i].data.Open}\nEXP: ${companyDataAll[i].data.Exp}`
    }
    else if (i >= companyDataAll.length) {
      data[i] =
      "";
      //data[i] = `[ID: ${i+1}] N/A\nNo offer available`
    }
  }

  for (let x = 0; x < data.length; x++) {
    offerlist = `${offerlist+data[x]}\n\n`
  }

  
  if (companyDataAll != null) {
    const Display = new RichEmbed()
      .setTitle(`Astolfo Companies House`)
      .setColor(`#de1073`)
      .setDescription(`${data[page*5-5]}\n\n${data[page*5-4]}\n\n${data[page*5-3]}\n\n${data[page*5-2]}\n\n${data[page*5-1]}`)
      .setThumbnail("https://www.wallpapermaiden.com/image/2019/03/17/fate-series-astolfo-pink-hair-suit-braid-ponytail-coat-31328-resized.jpeg")
      .setFooter(`Page ${page}/${pages} | Astolfo.js`, "https://www.wallpapermaiden.com/image/2019/03/17/fate-series-astolfo-pink-hair-suit-braid-ponytail-coat-31328-resized.jpeg")
      .setTimestamp()
    message.channel.send(Display)
  }
  
  else {
      const Display = new RichEmbed()
      .setTitle(`Astolfo Companies House`)
      .setColor(`#de1073`)
      .setDescription(empty)
      .setThumbnail("https://www.wallpapermaiden.com/image/2019/03/17/fate-series-astolfo-pink-hair-suit-braid-ponytail-coat-31328-resized.jpeg")
      .setFooter(`Page ${page}/${pages} | Astolfo.js`, "https://www.wallpapermaiden.com/image/2019/03/17/fate-series-astolfo-pink-hair-suit-braid-ponytail-coat-31328-resized.jpeg")
      .setTimestamp()
      
    message.channel.send(Display)
    }
};

module.exports.help = {
  name: "list",
  category: "Business",
};