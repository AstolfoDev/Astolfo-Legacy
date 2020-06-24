module.exports.run = async (client, message, args) => {
  const { RichEmbed } = require("discord.js");
  var getFavicons = require('get-website-favicon');
  var urlExists = require('url-exists');
  const icoToPng = require('ico-to-png');
  const fetchFavicon = require("fetch-favicon");
  
  
  var link = args[0]
  urlExists(link, function(err, exists) {
    if (exists == false) return message.channel.send("dis url no exists!!!!1!")
    getFavicons(link).then(data=>{
    
    var pngfav = "";
    var favicon = "";
    
      if (data.icons.length == 0) {
        favicon = "";
      }
      else {
        favicon = data.icons[0].src
      }
    
      const embed = new RichEmbed()
        .setTitle(`Requested by ${message.author.username}`)
        .setColor('#de1073')
        .setThumbnail(favicon)
        .setDescription(link)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setFooter(`${data.baseUrl} | Astolfo.js`, favicon)
        .setTimestamp()
      
      message.channel.send(embed)
    });
  });
};

module.exports.help = {
  name: "link",
  aliases: ["url"],
  category: "Misc",
}