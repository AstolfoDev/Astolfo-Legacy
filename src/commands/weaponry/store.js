const { RichEmbed } = require("discord.js");
const db = require("betterqdb");
const userData = new db.table("user")
const gunData = new db.table("gun")

module.exports.run = async (client, message, args) => {
  
  
  var gunDataAll = gunData.all()
  var pages = Math.ceil(gunDataAll.length/1)
  
  var page = 1
  
  amount = gunDataAll.length;
  
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
  
 var empty = "**sowwy uwu there are no guns at the shop x3 check back later OwO**";
 
 var image = [];
 
  for (let i = 0; i < amount; i++) {
    if (i < amount) {
      data[i] = `**${gunData.get(gunDataAll[i].ID).Name}**\nDamage: ${gunData.get(gunDataAll[i].ID).DMG}\nFire Rate: ${gunData.get(gunDataAll[i].ID).FR}\nRating: ${gunData.get(gunDataAll[i].ID).PR}\n**Price: ${gunData.get(gunDataAll[i].ID).Cost} TC**\n\n**Order:** \`/buy ${gunData.get(gunDataAll[i].ID).Name}\``
      image[i] = gunData.get(gunDataAll[i].ID).Image
    }
    else if (i >= amount) {
      data[i] =
      "";
      //data[i] = `[ID: ${i+1}] N/A\nNo offer available`
    }
  }

  for (let x = 0; x < data.length; x++) {
    offerlist = `${offerlist+data[x]}\n\n`
  }
  
  if (isNaN(parseInt(page)) === true) return message.channel.send(`smh "${page}" is not a number... lawl X3`)

  if (gunDataAll != null) {
    const Display = new RichEmbed()
      .setTitle(`Astolfo's Gun Shop`)
      .setColor(`#de1073`)
      .setDescription(`${data[page-1]}`)
      .setImage(image[page-1])
      .setThumbnail("https://cdn.discordapp.com/attachments/692373756672475136/694966770129305732/image0.jpg")
      .setFooter(`Page ${page}/${pages} | Astolfo.js`, "https://cdn.discordapp.com/attachments/692373756672475136/694966770129305732/image0.jpg")
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
  name: "store",
  aliases: ["shop","gunshop"],
  category: "Weaponry",
};