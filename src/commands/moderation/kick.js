module.exports.run = async (client, message, args) => {
  var admin = message.member.hasPermission('ADMINISTRATOR');
  var kick = message.member.hasPermission('KICK_MEMBERS');
  const user = message.mentions.users.first();
  const member = message.guild.member(user);
  
  if (admin == false && kick == false) return message.reply("sowwwwwy! you dont have permission to use dat ;(");
  
  if (!user) return message.reply("hmmmmmmm idk who you want to kick, plz specify!!");
  
  if (member) {
    member.kick(`Astolfo sends his regards: ${message.author.tag}`)
    .then(() => {
      message.reply(`wooooooooooooosh, yayyyyyy ${user} is gone! ;3`);
    })
    .catch(err => {
      message.reply(`uhhhhh im sorrrrri but i cant kick ${user} :confounded:`);
    });
  }
};


module.exports.help = {
	name: "kick",
	aliases: ["k", "softban"],
	description: "Kick a user from the server",
	usgae: "kick (user)",
	category: "Moderation",
};