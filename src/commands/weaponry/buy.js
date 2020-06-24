const { RichEmbed } = require("discord.js");
const db = require("betterqdb");
const userData = new db.table("user")
const gunData = new db.table("gun")

module.exports.run = async (client, message, args) => {
  
  var gunName = ["Beretta 92","TEC-9","1851 Colt Navy Revolver","P90","AK-47","Remington R5 RGP","Minigun M134"];
  var aN = ["a","a","an","a","an","a","a"];
  var weapon = args.join(" ").toLowerCase();
  var gunID;
  
  if (!weapon) return message.channel.send("pls specify the gun u want to buy :3");
  
  if (weapon == "beretta" || weapon == "beretta 92") {
    gunID = 0;
  }
  
  else if (weapon == "tec" || weapon == "tec-9") {
    gunID = 1;
  }
  
  else if (weapon == "revolver" || weapon == "1851 colt navy revolver") {
    gunID = 2;
  }
  
  else if (weapon == "p-chan" || weapon == "p chan" || weapon == "pchan" || weapon == "p90") {
    gunID = 3;
  }
  
  else if (weapon == "ak" || weapon == "ak47" || weapon == "ak-47") {
    gunID = 4;
  }
  
  else if (weapon == "remington" || weapon == "remington r5 rgp") {
    gunID = 5;
  }
  
  else if (weapon == "minigun" || weapon == "minigun m134") {
    gunID = 6;
  }
  
  else return message.channel.send("invalid gun name!! pls make sure ur spelling it correctly :P")
  
  if (userData.has(`u${message.author.id}.GunInventory`)) {
    var newArray = userData.get(`u${message.author.id}.GunInventory`)
    if (newArray.includes(gunID)) return message.channel.send(`u already own ${aN[gunID]} ${gunName[gunID]}!!!! ;P`)
  }
  
  var balance = userData.get(`u${message.author.id}.tc`);
  
  var gunInfo = gunData.get(gunData.all()[gunID].ID);
  
  var gunCost = gunInfo.Cost;
  
  if (balance < gunCost) return message.channel.send(`u dont have ${gunCost} trap coins to afford ${aN[gunID]} ${gunInfo.Name}!!!`)
  
  userData.push(`u${message.author.id}.GunInventory`, gunID)
  
  userData.subtract(`u${message.author.id}.tc`, gunCost)
  
  const Display = new RichEmbed()
    .setTitle("New Purchase")
    .setThumbnail(gunInfo.Image)
    .setDescription(`Gun Name: ${gunInfo.Name}\nGun ID: ${message.author.username}-${gunID}-${message.author.discriminator}\nCost: ${gunCost} TC\n\n**Need som bulletz?**\nBuy bullets for 10 AT each \n \`/buyammo <amount>\``)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setColor("#de1073")
    .setFooter("Astolfo.js", gunInfo.Image)
    .setTimestamp()
  
  message.channel.send(Display)
};

module.exports.help = {
  name: "buy",
  category: "Weaponry",
};