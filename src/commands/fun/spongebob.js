module.exports.run = async (client, message, args) => {
  const fact = ["Spongebob has a pet clam named 'Shelly', it can be seen inside it's cage hanging in Spongebob's bedroom.","The Spongebob episode: 'SB-129' was the first episode to premiere on a Friday and the only episode to premiere on New Year's Eve.","Mr. Krabs is hesitant to add much technology to the Krusty Krab due to his fleeting fear of robot overlords.","The Krusty Krab surprisingly has a money-back guaruntee which can be found on the Galley Grub sign.","Mrs. Puff has been to jail over 15 times.","Spongebob was briefly the proud owner of a road vehicle twice in the series. Once with the 'Patty Wagon' *(which was never seen from again)*."]
  
  var index = [Math.floor(Math.random() * fact.length)];
  
  message.channel.send(`Fact #${index}:\n${fact[index]}`)
}

module.exports.help = {
  name: "spongebob",
  aliases: ["fotd","sponge","sfact"],
  category: "Fun",
}