module.exports.run = async (client, message, args) => {

  var admin = message.member.hasPermission('ADMINISTRATOR');

  if (admin == false) {
     return
  }

  fullString = ""
  for (word of args) {
    fullString = fullString + " " + word
  }

  var par = fullString
  var i = 0
  
  //for (i = 0 ; i < par.length; i++) {
  //  message.channel.send(par)
  //  par = par.substring(0, 2)
  //}

  var new_str = par
  while (par.length > 0) {
     par = par.slice(1)
     new_str = new_str + "\n" + par
  }
  message.channel.send(new_str)
  return
}


module.exports.help = {
	name: "diminish",
	aliases: ["dim"],
	description: "Watch your text slowly dissappearrrr.... T^T",
	usage: "<text>",
	category: "Misc",
};