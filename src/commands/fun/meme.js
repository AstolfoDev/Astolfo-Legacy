module.exports.run = async (client, message, args) => {
  
  const { RichEmbed } = require("discord.js")
  const randomPuppy = require("random-puppy")
  
  const subredditlist = ["meme","memes","animememes","animemes","dankmemes","gamingmemes"]
    
  const subreddit = subredditlist[Math.floor(Math.random()*subredditlist.length)];


    message.channel.startTyping();

    randomPuppy(subreddit).then(async url => {
            const meme = new RichEmbed()
                .setTitle("r/"+subreddit)
                .setColor("#de1073")
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setImage(url)
                .setFooter("Astolfo.js", "https://media.giphy.com/media/MEd88QoSanUvXJSwJd/giphy.gif")
                .setTimestamp()
                
            message.channel.send(meme).then(() => message.channel.stopTyping());
    }).catch(err => console.error(err));
};

module.exports.help = {
  name: "meme",
  aliases: ["reddit","memes"],
  usage: " ",
  category: "Fun",
}