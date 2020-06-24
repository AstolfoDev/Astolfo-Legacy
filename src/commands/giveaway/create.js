module.exports.run = async (client, message, args) => {
  const moment = require('moment');
  const { RichEmbed } = require('discord.js');
  const ms = require('ms');
  
  var time = moment().format('Do MMMM YYYY , hh:mm');
  var room;
  var title;
  var duration;
  var currentTime = new Date(),
  hours = currentTime.getHours() + 3,
  minutes = currentTime.getMinutes(),
  done = currentTime.getMinutes() + duration,
  seconds = currentTime.getSeconds();
  
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  
  
  var suffix = "AM";
  
  if (hours >= 12){
    suffix = "PM";
    hours = hours - 12
  }
  if (hours == 0){
    hours = 12;
  }
  
  var filter = m => m.author.id === message.author.id;
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply("huhhhhhhh??? you dont have permission to start a giveaway!!! >:3")
  
  var sugoi = "<:astolfoSugoi:683036088880857106>";
  
  var blush = "<:astolfoBlush:683035864842109118>"
  
  
  message.channel.send(`<:astolfoSugoi:683036088880857106> **oooooooh! what channel should we put this giveaway in?** *~hype!*\n*(Please enter the channel name* __**without**__ *the hashtag, example: giveaway-channel)*`).then(msg => {
    message.channel.awaitMessages(filter, {
      max: 1,
      time: 20000,
      error: ['time']
    }).then(collected => {
      //let room = message.guild.channels.find('name', collected.first().content);
      let room = message.guild.channels.find('name', collected.first().content) || message.guild.channels.find('name', collected.first().content.slice(0, -1).slice().substring(2));
      if (!room) return message.channel.send(`${blush} ah... AHHH!! i couldnt find the channel!!`)
      room = collected.first().content;
      collected.first().delete();
      msg.edit(`${sugoi} **Okiiiii, how long should we set this giveaway for, hmm??**\n*(Format: s,m,h,d,w, example: 10s [10 seconds])*`).then(msg => {
        message.channel.awaitMessages(filter, {
          max: 1,
          time: 20000,
          errors: ['time'],
        }).then(collected => {
          if (!collected.first().content.match(/[1-60][s,m,h,d,w]/)) return message.channel.send(`${blush} ahhhhhh!!! thats not the right format!!! ahhhhhh`)
          duration = collected.first().content;
          collected.first().delete();
          msg.edit(`${blush} **yayyyyyyyyy now it's time for da prizeeeee!!!!!!!**\n*(Enter the item you would like to give away)*`).then(msg => {
            message.channel.awaitMessages(filter, {
              max: 1,
              time: 20000,
              errors: ['time'],
            }).then(collected => {
              title = collected.first().content;
              collected.first().delete();
              msg.delete();
              message.delete();
              try {
                const giveEmbed = new RichEmbed()
                .setDescription(`**${title}**\nReact to this message with 🎉 to enter the giveaway!\nTime remaining: ${duration}\nGiveaway started @ ${hours}:${minutes}${suffix}`)
                .setColor('#de1073')
                .setFooter(message.author.username, message.author.avatarURL);
              message.guild.channels.find('name', room).send(`${sugoi} **Successfully created giveaway!**`, {embed: giveEmbed}).then(m => {
                let re = m.react('🎉');
                setTimeout(() => {
                  let users = m.reactions.get('🎉').users
                  
                  let list = users.array().filter(u => u.id !== m.author.id !== client.user.id);
                  
                  let gFilter = [Math.floor(Math.random()*list.length) + 0]

               if (list[gFilter].bot){
                    list.splice(gFilter, 1)
                  }
                  let winners = [];
                  winners.push(list[gFilter]);
                  list.splice(gFilter, 1)
                  
                  const noEmbed = new RichEmbed()
                  .setAuthor(message.author.username, message.author.avatarURL)
                  .setTitle(title)
                  .setColor('#de1073')
                  .addField(`${blush} **Giveaway Cancelled!** ${blush}`,`Oh nuuuuuu!!! Nobody reacted in time!!!!\nThat means no one wins the prize ;(`)
                  
                  const endEmbed = new RichEmbed()
                  .setAuthor(message.author.username, message.author.avatarURL)
                  .setTitle(title)
                  .setColor('#de1073')
                  .addField(`${sugoi} ** Giveaway Ended!** ${sugoi}`,`Winners: ${winners[0]}\nEnded at:`)
                 .setTimestamp()
              if (winners[0] == undefined) return m.edit(`**🎉 GIVEAWAY CANCELLED!** 🎉`, {embed:noEmbed});
              
              m.edit(`🎉 **GIVEAWAY ENDED!** 🎉`, {embed: endEmbed});
                  message.guild.channels.find("name", room).send(`**Whooooooop!! GG to ${winners[0]}!!!! You've won ${title}**`, {embed: {}})
                }, ms(duration))
              })
              } catch(e) {
                message.channel.send(`${blush} eeeeeeeeek! an unexpected ewwor haz occured ;(`)
                console.log(e);
              }
            })
          })
        })
      })
    })
  })
}

module.exports.help = {
  name: "giveaway",
  aliases: ["cg","gc","g","giveawaycreate","creategiveaway","startgiveaway"],
  description: "Create a giveaway.",
  usage: "<time> <winner count> <prize>",
  category: "Giveaway",
}