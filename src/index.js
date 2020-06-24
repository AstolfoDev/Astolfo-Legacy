  // Keep Online
const keep_alive = require('./keep_alive.js'); 
const crossenv = require('cross-env');
const Discord = require('discord.js');
const db = require('betterqdb');
let userData = new db.table("user");
let guildData = new db.table("guild");
let marketData = new db.table("market");
let companyData = new db.table ("company");
let gunData = new db.table("gun");

gunData.set(`Beretta`, { FR: 40, PR: 30, ID: 0, DMG: 38, Name: "Beretta 92", Image: "https://cdn.discordapp.com/attachments/692373756672475136/694765737361014784/image0.jpg", Cost: 3 });
gunData.set(`TEC`, { FR: 70, PR: 35, ID: 1, DMG: 28, Name: "TEC-9", Image: "https://cdn.discordapp.com/attachments/692373756672475136/694765737822126110/image1.jpg", Cost: 10 });
gunData.set(`Revolver`, { FR: 25, PR: 40, ID: 2, DMG: 70, Name: "1851 Colt Navy Revolver", Image: "https://cdn.discordapp.com/attachments/692373756672475136/694765738338287626/image2.jpg", Cost: 20 });
gunData.set(`P-Chan`, { FR: 55, PR: 45, ID: 3, DMG: 23, Name: "P90", Image: "https://cdn.discordapp.com/attachments/692373756672475136/694765738791010385/image3.jpg", Cost: 25 });
gunData.set(`AK47`, { FR: 60, PR: 50, ID: 4, DMG: 30, Name: "AK-47", Image: "https://cdn.discordapp.com/attachments/692373756672475136/694765741060259870/image4.jpg", Cost: 50 });
gunData.set(`Remington`, { FR: 65, PR: 55, ID: 5, DMG: 32, Name: "Remington R5 RGP", Image: "https://cdn.discordapp.com/attachments/692373756672475136/694765741786005514/image5.jpg", Cost: 75 });
gunData.set(`Minigun`, { FR: 100, PR: 80, ID: 6, DMG: 30, Name: "Minigun M134", Image: "https://media.discordapp.net/attachments/692373756672475136/694765742062567454/image6.jpg", Cost: 100 });

// Cooldowns

let cooldowns = new Map();


const Canvas = require('canvas');

const ensql = require('better-sqlite-pool');
const enmap = require('enmap');


const font = require('font');

const client = new Discord.Client({ disableEveryone: true });
const fs = require('fs');
const sequelize = require('sequelize');
const sqlite = require('sqlite3');
const eco = require('discord-economy');

const config = require('./config');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();


// Enmap Stuff (server settings)

client.settings = new enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep',
});


const defaultSettings = {
  prefix: "/",
  welcomeChannel: "welcome",
  welcomeMessage: "Haiiiiiii, welcome to the server, {{user}}!!!",
  roleOnJoin: "",
  welcomeImageURL: "",
}










// Command Handler
const { readdirSync } = require('fs');
const { sep } = require('path');
const { success, error, warning } = require('log-symbols');

const load = (dir = './commands/') => {
	readdirSync(dir).forEach(dirs => {
		const commands = readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files =>
			files.endsWith('.js')
		);
		for (const file of commands) {
			const pull = require(`${dir}/${dirs}/${file}`);
			if (
				pull.help &&
				typeof pull.help.name === 'string' &&
				typeof pull.help.category === 'string'
			) {
				if (client.commands.get(pull.help.name))
					return console.warn(
						`${warning} Multiple commands share the same name ${
							pull.help.name
						}.`
					);
				client.commands.set(pull.help.name, pull);
				console.log(`${success} Loaded ${pull.help.name} command.`);
			} else {
				console.log(
					`${error} An error was found when attempting to load ${dir}${dirs}. you have a missing help.name or help.name is not a string. or you have a missing help.category or help.category is not a string`
				);
				continue;
			}
			if (pull.help.aliases && typeof pull.help.aliases === 'object') {
				pull.help.aliases.forEach(alias => {
					if (client.aliases.get(alias))
						return console.warn(
							`${warning} Two or more commands have the same aliases ${alias}`
						);
					client.aliases.set(alias, pull.help.name);
				});
			}
		}
	});
};
load();


client.once('ready', () => {
	console.log(`electra is ready!`);

	setInterval(() => {
	  const status = ["Twitter: @astolfo_js","/help for commands","/support for tech support",`${client.users.size} Discord users`,"Fate/Grand Order"]
	  
	  const statusy = ["WATCHING","LISTENING","LISTENING","WATCHING","PLAYING"]
	  const statusx = [Math.floor(Math.random() * status.length)]
	  
	  client.user.setActivity(status[statusx], { type: statusy[statusx]});
	}, 5000)
	
	setInterval(() => {
	  const images = ["https://tinyurl.com/astolfo1","https://tinyurl.com/astolfo2","https://tinyurl.com/astolfo3"]
	  const astimg = [Math.floor(Math.random() * images.length)]
	  
	  client.user.setAvatar(images[astimg])
	  
	  console.log(`New image: #${astimg}`)
	}, 300000)
});

client.on('guildMemberAdd', async member => {
  
  client.settings.ensure(member.guild.id, defaultSettings);
  
  let welcomeMessage = client.settings.get(member.guild.id, "welcomeMessage");
  
  var role = client.settings.get(member.guild.id, "roleOnJoin");
  
  var image = client.settings.get(member.guild.id, "welcomeImageURL");
  
  welcomeMessage = welcomeMessage.replace("{{user}}", member)
  
  
  
  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext('2d');
  
  var number = Math.floor(Math.random()*5)
  
  var background = await Canvas.loadImage(`./wallpapers/wallpaper${number}.png`);
  
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#de1073';
  ctx.strokeRect(0, 0, canvas.width, canvas.height)
  
  const avatar = await Canvas.loadImage(member.user.displayAvatarURL)
  
  
  ctx.beginPath()
  ctx.arc(125, 125, 100, 0, Math.PI*2, true)
  ctx.closePath()
  ctx.clip()
  
  ctx.drawImage(avatar, 25, 25, 200, 200)
  
  
  const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');
  
    const attachment2 = new Discord.Attachment(image, 'welcome-image.png')
    
  if (client.settings.get(member.guild.id, "welcomeChannel") == 0) return
  
  if (client.settings.get(member.guild.id, "roleOnJoin") != 0) {
    member.addRole(role);
  }

if (client.settings.get(member.guild.id, "welcomeImageURL") == 0) return member.guild.channels
     .find("name", client.settings.get(member.guild.id, "welcomeChannel"))
     .send(welcomeMessage, attachment)
     .catch(console.error);

else return member.guild.channels
    .find("name", client.settings.get(member.guild.id, "welcomeChannel"))
    .send(welcomeMessage, attachment2)
    .catch(console.error)
});

client.on('message', async message => {
  const guildConf = client.settings.ensure(message.guild.id, defaultSettings)
  
  userData.add(`u${message.author.id}.at`, 0.1)

  var cont = message.content.toLowerCase()

	if (message.channel.type != 'text') return;
	
	
//://:://:://:://:://:://://
// Astolfo-Kay Integration//
//://:://:://:://:://:://://
  if  (message.channel.id == 692367547227439135 && message.author.id != 682220266901733381) {
    let splitter = "/"
    let casesen = message.content.toLowerCase()
    let parts = casesen.split(splitter);
    
    var identifier = parts[0];
    var type = parts[1];
    var command = parts[2];
    var userID = parts[3];
    var amount = parseFloat(parts[4]);
    var currency = parts[5]
    
    try {
      if (command == "give") {

         if (!userData.has(`u${userID}`)) {
          throw "invalid_user(noData)";
        }
        if (currency != "cr" && currency != "at" && currency != "tc") {
          throw "invalid_currency";
        }
        
       // if (isNaN(parseInt(amount)) === true) {
      //    throw "amount_is_NaN";
        
        if (currency == "cr") {
          eco.AddToBalance(userID, amount)
          message.channel.send(`${identifier}${splitter}anw${splitter}give`)
        }
        if (currency == "tc") {
          userData.add(`u${userID}.tc`, amount)
          message.channel.send(`${identifier}${splitter}anw${splitter}give`)
        }
        if (currency == "at") {
          userData.add(`u${userID}.at`, amount);
          message.channel.send(`${identifier}${splitter}anw${splitter}${command}`)
        }       
      }
      else if (command == "wallet") {
        cr = await eco.FetchBalance(userID);
        tc = await userData.get(`u${userID}.tc`);
        at = await userData.get(`u${userID}.at`);
        
        message.channel.send(`${identifier}${splitter}anw${splitter}${command}${splitter}${cr.balance}${splitter}${tc}${splitter}${at}`)
      }
      else if (command == "ping") {
        message.channel.send(`${identifier}${splitter}anw${splitter}${command}`)
      }
      else if (command == "set") {
          if (isNaN(parseInt(userID)) === true) {
            return
          }
        
        
          userData.set(`u${userID}.${currency}`, amount);
          
          if (currency == "cr") {
            balCheckCR = await eco.FetchBalance(userID)
            
            addAmount = amount-balCheckCR.balance
            
            eco.AddToBalance(userID, addAmount)
          }
        
          message.channel.send(`${identifier}${splitter}anw${splitter}${command}`)
      }
      else if (command == " ") {
        throw "missimg_command"
      }
      else {
        throw "unknown_command"
      }
     } catch (err) {
      if (err.message == undefined) {
        message.channel.send(`${identifier}${splitter}anw${splitter}error${splitter}${err}`)
      } else {
        err_m = err.message.replace("https://", "")
        err_m = err_m.replace("discord.gg/", "")
        message.channel.send(`${identifier}${splitter}anw${splitter}error${splitter}${err_m}`)
      }
      throw err
      
    }
      
  }
////////////////////////////
////////////////////////////
	
	
  if (!userData.has(`u${message.author.id}.coins`)) userData.set(`u${message.author.id}.coins`, 0);
        if (!userData.has(`u${message.author.id}.xp`)) userData.set(`u${message.author.id}.xp`, 0);
        if (!userData.has(`u${message.author.id}.daily`)) userData.set(`u${message.author.id}.daily`, 0);
        if (!userData.has(`u${message.author.id}.bio`)) userData.set(`u${message.author.id}.bio`, "hewwwwwo! uwu");
        if (!userData.has(`u${message.author.id}.tc`)) userData.set(`u${message.author.id}.tc`, 0);
        if (!userData.has(`u${message.author.id}.at`)) userData.set(`u${message.author.id}.at`, 0);
        if (!userData.has(`u${message.author.id}.stocks`)) userData.set(`u${message.author.id}.stocks`, { Security: 0, AstolfoEx: 0, Insurance: 0, AstolfoInc: 0, AstolfoCasino: 0, AstolfoStats: 0, AstolfoBank: 0 })

        if (!guildData.has(`g${message.guild.id}.prefix`)) guildData.set(`g${message.guild.id}.prefix`, "/");

	if (message.author.bot && message.author.id != 677649373206937631) return;
  
  if (cont.indexOf("astolfo") !== -1 && (cont.indexOf("cute") !== -1 || cont.indexOf("love") !== -1)) {
    const img = new Discord.Attachment("https://i.imgur.com/jrWEblb.png")  //Moe1/Moe2    
    message.channel.send(`;3`, img) //Something sweet here
    return
  }
	if (message.content.indexOf(guildConf.prefix) !== 0) return
	let args = message.content.split(' ');
	var command = args[0].toLowerCase();
	let cmd =
		client.commands.get(command.slice(guildConf.prefix.length)) ||
		client.commands.get(client.aliases.get(command.slice(guildConf.prefix.length)));

	args = args.slice(1);


  if (!cooldowns.has(cmd.help.name)) cooldowns.set(cmd.help.name, new Map());
  const timestamps = cooldowns.get(cmd.help.name);
  const coolTime = (cmd.help.cooldown || 2) * 1000;
  const now = Date.now();

  if (timestamps.has(message.author.id)) {
    let expiration = timestamps.get(message.author.id) + coolTime;

    if (now < expiration) {
      const timeLeft = (expiration - now) / 1000;
      if (timeLeft >= 60) {
        
        const mintime = timeLeft/60
        return message.reply(`please wait another **${Math.ceil(mintime)}** minutes!`)
      }
      
      if (timeLeft >= 3600) {
        const hourtime = ((timeLeft/60)/60)
        return message.reply(`please wait another **${Math.ceil(hourtime)}** minutes!`)
      }
      else {
        return message.reply(`please wait another **${Math.ceil(timeLeft)}** seconds!`);
      }
    }
  } else {
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), coolTime);
  }


	if (cmd) cmd.run(client, message, args);
	
	
	const agent = "193044575500238849"
	const zyra = "508777382472187914"
	if (message.content === "/join") {

	  if (!(message.author.id == agent && message.author.id == zyra) == false) return message.channel.send(`hahahah no thx baiiiiiiiiii ;3`)
	  
	  client.emit('guildMemberAdd', message.member)
	  
	}
})


client.login(config.token);