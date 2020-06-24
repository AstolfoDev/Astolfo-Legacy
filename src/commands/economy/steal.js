module.exports.run = async (client, message, args) => {
  const db = require("betterqdb");
  const userData = new db.table("user");
  const gunData = new db.table("gun")

  const eco = require("discord-economy");
  
  var user = message.mentions.users.first()
  
  if (!user) return message.channel.send("uuuuuuuuuuuuuuwu you need to @mention the user you want to rob!")
  
  if (user.id == message.author.id) return message.channel.send("h-huh?! you cant rob yourself!!")

  var output = await eco.FetchBalance(user.id)
  
  var msgbal = await eco.FetchBalance(message.author.id)
  
  if (isNaN(output.balance)) return message.channel.send("output is NaN")
  
  if (isNaN(msgbal.balance)) return message.channel.send("msgbal is NaN")
  
  if (output.balance < 1) return message.channel.send("errrrrrm that user doesn\'t have any money u can steal :(");
  
  var chance = 10;
  
  var multiplier = (Math.floor(Math.random()*(output.balance*0.5)));
  
  var winfail = (Math.floor(Math.random()*chance));
  
  var finerate = (Math.floor(Math.random()*4));
  
  var fine = (Math.floor(Math.random()*(msgbal.balance*0.5)));
  
  var tax = (Math.floor(fine*0.75));


  if (winfail != 1) {
    if (finerate == 1) {
      eco.SubtractFromBalance(message.author.id, fine);
      
      eco.AddToBalance(user.id, tax);
      
      message.channel.send(`ahhhh ${message.author}!!! you didn't rob ${user} successfully :(\nThey have recieved ${tax} credits as compensation.\nA ${fine} credit fine was taken from ${message.author}'s account!`);
    }
    else {
      message.channel.send(`you weren't able to rob the user but at least you weren't caught!!`);
    };
  }
  if (winfail == 1) {
    eco.SubtractFromBalance(user.id, multiplier);
    
    eco.AddToBalance(message.author.id, multiplier);
    
    message.channel.send(`You successfully stole ${multiplier} credits from ${user}'s account`);
  };
};

module.exports.help = {
  name: "steal",
  cooldown: 300,
  aliases: ["rob"],
  usage: "<@user>",
  category: "Economy",
};