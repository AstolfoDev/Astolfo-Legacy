const db = require("betterqdb");
const { RichEmbed } = require("discord.js");
const userData = new db.table("user");
const gunData = new db.table("gun");

module.exports.run = async (client, message, args) => {
  
  var guns = [];
  var ammo = 0;
  var equip = "";
  var tempData;
  var tempData2;
  var gunsMsg = "";
  var gunInfo = gunData.all();
  
  if(userData.has(`u${message.author.id}.GunInventory`)) {
    var gunInv = userData.get(`u${message.author.id}.GunInventory`);
    
    for (let i = 0; i < gunInv.length; i++) {
      tempData = gunInv[i];
      tempData2 = gunInfo[tempData].ID;
      guns[i] = gunData.get(`${tempData2}.Name`);
      gunsMsg = `${gunsMsg}"${guns[i]}" `;
    }
  }
  else {
    gunsMsg = "None";
  }
  
  
  
  if (userData.has(`u${message.author.id}.bullets`)) {
    ammo = userData.get(`u${message.author.id}.bullets`);
  }
  
  if (userData.has(`u${message.author.id}.equip`)) {
    equip = userData.get(`u${message.author.id}.equip`)
  }
  
  const Display = new RichEmbed()
    .setTitle(`${message.author.username}'s armoury`)
    .setColor("#de1073")
    .setThumbnail(message.author.avatarURL)
    .setDescription(`Equipped Gun: ${equip}\nGuns: ${gunsMsg}\nAmmunition: ${ammo}`)
    .setFooter("Astolfo.js", message.author.avatarURL)
    .setTimestamp()
  
  message.channel.send(Display)
};

module.exports.help = {
  name: "armoury",
  aliases: ["guninventory","guninv"],
  usage: " ",
  category: "Weaponry",
  description: "View the guns in your posession and the total ammo you have remaining."
};