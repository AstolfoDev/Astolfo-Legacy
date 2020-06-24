const db = require("betterqdb");
const { RichEmbed } = require("discord.js");
const userData = new db.table("user");
const gunData = new db.table("gun");

module.exports.run = async (client, message, args) => {
  
  var user = userData.get(`u${message.author.id}`);
  var gunName = args.join(" ").toLowerCase();
  
  if (!gunName) return message.channel.send("u neeeedz to specify which gun u wanna equip :P")
  
  if (!userData.has(`u${message.author.id}.GunInventory`)) return message.channel.send("u dont hasssss any gunzzZzz in ur inventory to equip");
  
  var userGuns = userData.get(`u${message.author.id}.GunInventory`)
  var allGuns = gunData.all()
  var tempData;
  var tempData2;
  var valid = false;
  
  for (let i = 0; i < allGuns.length; i++) {
    tempData = allGuns[i].ID;
    tempData2 = gunData.get(tempData);
    if (tempData2.Name.toLowerCase() == gunName) {
      if (userGuns.includes(tempData2.ID)) {
        valid = true;
      }
    }
  }
  
  if (valid === false) {
    message.channel.send(`u either dont own that gun or the gun "${gunName}" does not exist`)
    return;
  }
  
  userData.set(`u${message.author.id}.equip`, gunName)
  message.channel.send(`u haz eqwipped da ${gunName}!!!!`)
};

module.exports.help = {
  name: "equip",
  usage: "<gun name>",
  description: "Select a weapon in your inventory as your primary weapon.",
  category: "Weaponry",
};