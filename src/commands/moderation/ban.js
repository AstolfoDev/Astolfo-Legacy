module.exports.run = async (client, message, args) => {
  const perms = message.member.hasPermission('BAN_MEMBERS');
  const user = message.mentions.users.first()
  const member = message.guild.member(user)
  
  if (perms == false) return message.reply("woah woah woah, you dont have access to do that!!")
  
  if (!user) return message.reply("plzzzzzzz tag theeeeeeeee user you want to ban e__e")
  
  if (member) {
    member.ban({
      reason: `Compliments of: ${message.author.tag}`,
    })
    .then(() => {
      message.reply(`awwwwh snap! ${user.tag} just got b-b-bannnnnned!!!`)
    })
    .catch(err => {
      message.reply(`oh erm... looks like i wasnt able to ban ${user.tag}`)
    })
  }
}

module.exports.help = {
  name: "ban",
  aliases: ["b","permban","hardkick"],
  description: "Use this to permenantly remove a member from the server.",
  usage: "<@user>",
  category: "Moderation",
}