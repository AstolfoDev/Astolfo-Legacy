module.exports.run = async (client, message, args) => {
  announcement = args.join(" ")
  
  const { RichEmbed } = require("discord.js");
  
  var d = new Date();
  var n = d.getFullYear();
  
  if (announcement.length > 2048) return message.channel.send("sowwwwwweey, ur announcememt can only be 2048 characters long!! :(")
  if (announcement == 0) return message.channel.send("heyyyy!!! you need to put a message for me to announce :/")
  if (!message.member.roles.find(r => r.name === "Astolfo Bypass") && message.member.hasPermission("MANAGE_GUILD") === false) return message.channel.send("errrrm you need the `Astolfo Bypass` role or the `MANAGE_GUILD` permission to do an annoucnement :3")
  
  const Announce = new RichEmbed()
    .setColor("#de1073")
    .setTitle("Announcement")
    .setDescription(announcement)
    .setAuthor(message.member.user.tag, message.author.avatarURL)
    .setFooter(`Astolfo.js`, "https://i.imgur.com/jrWEblb.png")
    .setTimestamp()

  message.channel.send(Announce)
  
};

module.exports.help = {
  name: "announce",
  aliases: ["bc","broadcast","announcement"],
  usage: "<message>",
  category: "Misc",
};