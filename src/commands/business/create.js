const db = require("betterqdb");
const { RichEmbed } = require("discord.js");
const userData = new db.table("user");
const companyData = new db.table("company");

const moment = require('moment');
const ms = require('ms');
const urlExists = require("url-exist-sync");

module.exports.run = async (client, message, args) => {
  var filter = m => m.author.id === message.author.id;
  var confirmName;
  var confirmLogo;
  var confirmOpen;
  var confirmFinal;
  var logo;
  var open;
  tcBal = userData.get(`u${message.author.id}.tc`)
  
  name = args.join(" ")
  
  if (tcBal < 25) {
    message.channel.send(`you need 25 trap coins to create a company!`)
    return;
  }
  if (!name) {
    message.channel.send(`You need a name for your company!!!`)
    return;
  }
  if (userData.has(`u${message.author.id}.company`)) {
    message.channel.send(`ur already in a company!!!!! leave that first before creating a new one!`)
    return;
  }
  
  const ConfirmName = new RichEmbed()
    .setTitle("Confirm (yes/no)")
    .setColor("#de1073")
    .setThumbnail(message.author.avatarURL)
    .setDescription(`Do you want to create the company "${name}"?`)
  const ConfirmLogo = new RichEmbed()
    .setTitle("Confirm (yes/no)")
    .setColor("#de1073")
    .setThumbnail(message.author.avatarURL)
    .setDescription(`Do you want to set a logo for ${name}?`)
  const SetLogo = new RichEmbed()
    .setTitle("Setup Logo (url)")
    .setColor("#de1073")
    .setThumbnail(message.author.avatarURL)
    .setDescription(`Enter the direct URL of the logo you want to use.`)
    
  message.channel.send(ConfirmName).then(msg => {
      message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000,
        errors: ['time']
      }).then(collected => {
        confirmName = collected.first().content.toLowerCase();
        if (confirmName != "y" && confirmName != "yes") {
          message.channel.send(`company creation cancelled!!!`)
          return
        }
        collected.first().delete()
        msg.edit(SetLogo).then(msg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 120000,
                errors: ['time']
              }).then(collected => {
                logo = collected.first().content;
                
                if (urlExists(logo) == false) {
                  logo = message.author.avatarURL
                  message.channel.send("invalid URL, avatar used instead...")
                }
                collected.first().delete()
                
                const ConfirmOpen = new RichEmbed()
      .setTitle("Confirm (open/closed)")
      .setColor("#de1073")
      .setThumbnail(logo)
      .setDescription(`Do you want ${name} to be open or closed?\n\nOpen: *anyone can join!*\nClosed: *users must be invited to join!*`)
      
                msg.edit(ConfirmOpen).then(msg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 120000,
                errors: ['time']
              }).then(collected => {
                confirmOpen = collected.first().content.toLowerCase();
                
                if (confirmOpen != "open" && confirmOpen != "closed") {
                  message.channel.send(`invalid option!!! company creation cancelled!!!`)
                  return;
                }
                
                open = confirmOpen
                collected.first().delete()
                msg.delete()
                const ConfirmDetails = new RichEmbed()
    .setTitle("Confirm (yes/no)")
    .setColor("#de1073")
    .setThumbnail(logo)
    .setImage(logo)
    .setDescription(`Would you like to register a company under the following details?\n\nName: ${name}\nStatus: ${open}\nLogo: ${logo}`)
    message.channel.send(ConfirmDetails).then(msg => {
      message.channel.awaitMessages(filter, {
        max: 1,
        time: 60000,
        errors: ['time']
      }).then(collected => {
        confirmFinal = collected.first().content.toLowerCase();
        if (confirmFinal != "yes" && confirmFinal != "y") return message.channel.send("company creation cancelled!")
        
        if (tcBal < 25) {
           message.channel.send(`you need 25 trap coins to create a company!`)
           return;
        }
        if (userData.has(`u${message.author.id}.company`)) {
           message.channel.send(`ur already in a company!!!!! leave that first before creating a new one!`)
           return;
        }
        
        if (companyData.has(name)) return message.channel.send(`sowwy! a company with the name "${name}" already exists!!!!`)
        collected.first().delete()
        
        
        userData.set(`u${message.author.id}.company`, name)
        
        companyData.set(name, { Owner: message.author.id, Open: open, Logo: logo, Exp: 0, Name: name })
        
        companyData.push(`${name}.members`, message.author.id)
        
        userData.subtract(`u${message.author.id}.tc`, 25)
        
        message.channel.send(`${name} has been created successfully!!`)
      })
    })
                
                
          })
        })
          })
        })
          })
      
  })
  
  
};

module.exports.help = {
  name: "createcompany",
  aliases: ["newcompany"],
  category: "Business",
};