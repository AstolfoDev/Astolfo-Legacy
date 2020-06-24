const { RichEmbed } = require("discord.js");
const { readdirSync } = require("fs");
var prefix = "/"
var owners = []
const tea = "<:astolfoTea:683035717252808726>"
const blush = "<:astolfoBlush:683035864842109118>"

module.exports.run = (client, message, args) => {

	const embed = new RichEmbed()
		.setColor("#de1073")
		.setAuthor(`Astolfo Help`, client.user.displayAvatarURL)
		.setFooter(`@${message.author.tag}`, message.author.displayAvatarURL)
		.setTimestamp();
    
	if (args[0]) {
		let command = args[0];
		let cmd;
		if (client.commands.has(command)) {
			cmd = client.commands.get(command);
		}
		else if (client.aliases.has(command)) {
			cmd = client.commands.get(client.aliases.get(command));
		}
		if(!cmd) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${prefix}help\` for the list of the commands.`));
		command = cmd.help;
		embed.setTitle(`Command Information`);
		embed.setDescription([
			`Command: ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}`,
			`Description: ${command.description || "No Description provided."}`,
			`Usage: ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "No Usage"} `,
			`Aliases: ${command.aliases ? command.aliases.join(", ") : "None"}`,
			`Category: ${command.category ? command.category : "General" || "Misc"}`,
		].join("\n"));

		return message.channel.send(embed);
	}
	const categories = readdirSync("./commands/");
	embed.setDescription([
		`List of commands for Astolfo.`,
		`The prefix for this bot is **${prefix}**`,
	].join("\n"));
	categories.forEach(category => {
		const dir = client.commands.filter(c => c.help.category.toLowerCase() === category.toLowerCase());
		const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);

		try {
			if (dir.size === 0) return;
			if (owners.includes(message.author.id)) embed.addField(`❯ ${capitalise}`, dir.map(c => `\`${c.help.name}\``).join(", "));
			else if (category !== "Developer") embed.addField(`${tea}  ${capitalise}`, dir.map(c => `\`${c.help.name}\``).join(", "));
		}
		catch (e) {
			console.log(e);
		}
	});
	return message.channel.send(embed);
};

module.exports.help = {
	name: "help",
	aliases: ["h","?"],
	description: "Help command to show the commands",
	usage: "<command name>",
	category: "Misc",
};