const db = require('betterqdb');
const userData = new db.table('user');
const marketData = new db.table('market')
const eco = require('discord-economy');
const { RichEmbed } = require('discord.js');
const moment = require('moment');
const ms = require('ms');


module.exports.run = async (client, message, args) => {
  const checkBal = await eco.FetchBalance(message.author.id)
  
  const clientInfo = userData.get(`u${message.author.id}`)
  var filter = m => m.author.id === message.author.id;
  var currency;
  var currency2;
  var quantity;
  var quantity2;
  message.channel.send(`<:astolfoHappy:683035783963082797> **oooooooooh! which currency do you want to trade?**\n*(The currency you currently possess and want to exchange)*\n[Valid Currencies: \`TrapCoin\`, \`Apocrypha Token\` and \`Credit\`]`).then(msg => {
      message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000,
        errors: ['time']
      }).then(collected => {
        currency = collected.first().content.toLowerCase();
        if(currency != "trapcoin" && currency != "apocrypha token" && currency != "credit") return message.channel.send('<:astolfoTea:683035717252808726> **invalid currency type!!!**');
        collected.first().delete();
        msg.edit(`<:astolfoHappy:683035783963082797> **Okiiiiii, how many would you trade?**\n*(The quantity of ${currency} you wish to exchange)*\n[Examples: \`1\`, \`1000\` and \`1337\`]`).then(msg => {
          message.channel.awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ['time']
          }).then(collected => {
            
            if(isNaN(parseInt(collected.first().content)) === true) return message.channel.send('**<:astolfoHappy:683035783963082797> You need to enter a number!!**');
            quantity = collected.first().content
            
            if (quantity > 100000) return message.channel.send("you cant trade more than 100k at a time!!")
            
            if (quantity > checkBal.balance && currency == "credit") return message.channel.send(`u dont have ${quantity} creditzzzz!!!!`)
            
            if (quantity > clientInfo.tc && currency == "trapcoin") return message.channel.send(`You DONT HAV ${quantity} trapcoiiiiiiiiiiinz!!!!1!1!!!!`)
            
            if (quantity > clientInfo.at && currency == "apocrypha token") return message.channel.send(`u do not currently hav ${quantity} apocryphaaaaaaaaaaaa tokenZzzzZzz!!`)
            collected.first().delete();
                        msg.edit(`**<:astolfoHappy:683035783963082797> Nowwwww, what currency would you like to trade for?**\*(The currency you want to recieve in exchange for your ${currency})*\n[Valid Currencies: \`TrapCoin\`, \`Apocrypha Token\` and \`Credit\`]`).then(msg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
              }).then(collected => {
                currency2 = collected.first().content.toLowerCase()
                
                if (currency2 == currency) return message.channel.send("<:astolfoBleh:683036224453476388> **You can't trade for the same currency owo!!!!!!!!!**")
                collected.first().delete();
                
                if (currency2 != 'trapcoin' && currency2 != 'apocrypha token' && currency2 != 'credit') return message.channel.send('<:astolfoHappy:683035783963082797> **Invalid currency!!!!**')
                
                msg.edit(`<:astolfoHappy:683035783963082797> **yaaaaaaaaa, how much you want?**\n*(The number of ${currency2} you want to recieve for your ${quantity} ${currency})*\n[Examples: \`20\`, \`4200\` or \`6090\`]`).then(msg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
              }).then(collected => {
                quantity2 = collected.first().content;
                
                if (isNaN(parseInt(quantity2)) == true) return message.channel.send("<:astolfoHappy:683035783963082797> **Invalid numbaaaaaaaar!!!!!!**")
                
                if (quantity2 > 100000) return message.channel.send("u cant tradezzZzzz more than 100k at once :P")
                
                collected.first().delete();
                msg.delete();
                message.delete();
                
        
                if (!marketData.has("offers")) 
                {
                marketData.push(`offers`, { From: currency, To: currency2, AmountFrom: quantity, AmountTo: quantity2, ID: message.author.id, Username: message.author.username, Avatar: message.author.avatarURL})
                }
                else { marketData.push(`offers`, {From: currency, To: currency2, AmountFrom: quantity, AmountTo: quantity2, ID: message.author.id, Username: message.author.username, Avatar: message.author.avatarURL})
                }
                
                const userInfo = marketData.get(`offers`);
                
                
                const Listing = new RichEmbed()
                  .setTitle(`New Listing:`)
                  .setColor(`#de1073`)
                  .setAuthor(message.author.tag, message.author.avatarURL)
                  .setDescription(`Information:\nOffering: ${quantity} ${currency}\n\nRequesting: ${quantity2} ${currency2}\n\nUser ID: ${message.author.id}`)
                  .setThumbnail(`https://media.giphy.com/media/JtBZm3Getg3dqxK0zP/giphy.gif`)
                  .setFooter("Astolfo.js", "https://media.giphy.com/media/JtBZm3Getg3dqxK0zP/giphy.gif")
                  .setTimestamp()
                  
                message.channel.send(Listing)
              });
              });
              })
          });
        });
      });
    });
  }
)};

module.exports.help = {
  name: "addstocks",
  aliases: ["addst0nks"],
  category: "Marketplace",
};