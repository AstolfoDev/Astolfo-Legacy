module.exports.run = async (client, message, args) => {
  return message.reply(args.join(" "));
};


module.exports.help = {
	name: "say",
	aliases: ["repeat", "echo"],
	description: "Debug Command",
	usage: "<message>",
	category: "Debug",
};