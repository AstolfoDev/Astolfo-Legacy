module.exports.run = async (client, message, args) => {
  
  var msg1 = args.join(" ")
  var msg2 = "";
  var number;
  
  for (let i=0; i<msg1.length; i++) {
    number = [Math.floor(Math.random()*2)]
    
    if (number == 1) {
      msg2 += msg1[i].toLowerCase()
    }
    else {
      msg2 += msg1[i].toUpperCase()
    }
  }
  
  message.reply(msg2)
  
};

module.exports.help = {
  name: "s",
  alises: ["sarcasm"],
  category: "Fun",
};
