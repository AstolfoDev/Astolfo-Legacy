

module.exports.run = async (client, message, args) => {
  const eco = require('discord-economy');
  const { RichEmbed } = require('discord.js');
  
  stuff = args.join(" ").toLowerCase()
  
  var coronaBonus = " ";
  if (stuff == "from home") {
    max = 2250
    coronaBonus = "[Corona Bonus]: **x3 momey for staying at home!**"
  }
  else {
    max = 750
  }
  var output = await eco.Work(message.author.id, {
      failurerate: 10,
      money: Math.floor(Math.random() * max),
      jobs: ['cashier', 'shopkeeper','pilot','manga artist','idol','video editor','professional weeb','osu! streamer','beatsaber streamer','ramen chef','highschool dropout','game developer','website developer','software developer','software engineer','anime artist','light novel writer',"game designer","drug dealer","gangster","reddit shitposter","minecraft youtuber","minecraft streamer","anime voice actor","discord bot developer","game designer","AMV youtuber","mobile game developer","twitch streamer","AstolfoEx analyst","twitch streamer"]
    })
    if (output.earned == 0) return message.reply(`u worked as a ${output.job} but did a bad job at it so u got no moneeeeeeeee :(`)
    
    const workSuccess = new RichEmbed()
      .setTitle(`Bank uwu of Astowolfo`)
      .setColor(`#de1073`)
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setDescription(`woweeeeeeeeeeee ${message.author.username} u worked as a \`${output.job}\` and earned ${output.earned} creditz!!\n\nu now hav ${output.balance} creditzzzzzzzzz\n\n${coronaBonus}`)
      .setThumbnail("https://media.giphy.com/media/ADgfsbHcS62Jy/giphy.gif")
      .setFooter("Astolfo.js", "https://media.giphy.com/media/ADgfsbHcS62Jy/giphy.gif")
      .setTimestamp()
      
    message.channel.send(workSuccess)
    
    const db = require("betterqdb");
    const userData = new db.table("user");
    const companyData = new db.table("company");
    
    if (userData.has(`u${message.author.id}.company`)) {
      var companyName = userData.get(`u${message.author.id}.company`);
      
      companyData.add(`${companyName}.Exp`, 1)
    }
    //message.channel.send(`woweeeee ${message.author.username} u worked as a \` ${output.job} \` and earned ${output.earned} creditz!!\n
//u now hav ${output.balance} creditzzzzzz`)
};

module.exports.help = {
  name: "work",
  cooldown: 300,
  aliases: ["job","earn"],
  usage: "",
  category: "Economy",
};