module.exports.run = async (client, message, args) => {
    if (!message.author.id == "193044575500238849") return message.channel.send("command under maintanence!")
    
    var ch = require("chess.js");
    var chess = new ch.Chess();
    
    const Discord = require("discord.js");
    const db = require("betterqdb");
    const chessData = new db.table("chess");
    const userData = new db.table("user");
    //chessData.delete("match")
    //chessData.push("match", { ID: 0 })
    const match = chessData.get("match")
    //console.log(match)
    const fs = require("fs");
    const Canvas = require("canvas");
    const canvasbuffer = require("canvas-to-buffer");
    const path = require("path");
    
    let cig = require('chess-image-generator');
    
    let ChessImageGenerator = require('chess-image-generator');
    
    //userData.delete(`u324494859757158403.chess.playing`)
    //userData.delete(`u193044575500238849.chess.playing`)
    //userData.delete("u246357206973415425.chess.playing")
    //userData.delete("u682220266901733381.chess.playing")
    
    let fenTest = chess.fen();
    let inGame = userData.has(`u${message.author.id}.chess.playing`);
    let inGameInfo = userData.get(`u${message.author.id}.chess.playing`);
    
    let command = args[0]












    
    const help = new Discord.RichEmbed()
        .setTitle("Astowolfo Chess Help")
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor(`#de1073`)
        .setDescription(`**/chess challenge <@user>** - Start a new game\n
**/chess leaderboard** - View the top rated players\n
**/chess accept** - Accept a challenge\n
**/chess move <from> <to>** - Move piece from position to new position\n
**/chess profile** - View your stats and rating\n
**/chess resign** - Resign the game you're playing\n
**/chess cancel** - Cancel your outgoing challange\n
**/chess decline** - Decline a challenge`)
        .setFooter("Astolfo.js")
        .setTimestamp()
    
    if (!command) return message.channel.send(help)
    
    
    
    if (command == "challenge") {
        let user = message.mentions.users.first()
        let checkState = userData.has(`u${user.id}.chess.playing}`)
        if (inGame) return message.channel.send("ur already in a game or u already challenged someone\ncancel a challenge with `/chess cancel` or resign your game with `/chess resign`")
        if (!user) return message.channel.send("u need to @mention the user you want to challenge")
        if (user.id == message.author.id) return message.channel.send("u cant challenge urselfffffff smh!!!!")
        if (checkState) return message.channel.send(`that player is currently unavailable!!!1!`)
        
        const challenge = new Discord.RichEmbed()
            .setTitle("__**New Challenge!**__")
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription(`Challenger | ${message.author}\n
Opponent | ${user}\n**/chess accept**`)
            .setFooter("Astolfo.js", user.avatarURL)
        let player1 = message.author;
        chessData.push("match", { ID: match.length, p1: player1.id, p2: user.id, moves: chess.pgn(), fen: chess.fen(), active: false, winner: "None", chess: chess, turn: "white" })
        userData.set(`u${message.author.id}.chess.playing`, { state: "challenging", id: match.length })
        userData.set(`u${user.id}.chess.playing`, { state:"challenged", id: match.length })
        message.channel.send(challenge);
    }
    
    
    
    if (command == "cancel") {
        if (!inGame) {
            message.channel.send("u do not have any outgoing challenges");
            return;
        }
        else if (inGame) {
            if (inGameInfo.state == "challenged") {
                message.channel.send("if u want to decline the incoming challenge then pls type:\n`/chess decline`");
            }
            else if (inGameInfo.state == "challenging") {
                let playerTwoID = match[inGameInfo.id].p2
                let playerTwo = client.users.get(playerTwoID);
                //console.log(match[inGameInfo.id])
                message.channel.send(`ur challenge to ${playerTwo} has been cancelled!`)
                userData.delete(`u${message.author.id}.chess.playing`);
                userData.delete(`u${playerTwoID}.chess.playing`);
                
            }
            else {
                message.channel.send("ur mid-game! resign to leave the match")
            }
        }
    }
    
    
    
    if (command == "profile" || command == "stats") {
        var elo = 1500
        var wins = 0
        var losses = 0
        var total = 0
        //var available = "Available"
        if (!userData.has(`u${message.author.id}.chess`)) {
            
        }
        else {
            var profileInfo = userData.get(`u${message.author.id}.chess`);
            console.log(profileInfo);
            if (!profileInfo.elo) {
                elo = 1500;
            }
            else if (profileInfo.elo) {
                elo = profileInfo.elo;
            }
            if (profileInfo.total) {
              total = profileInfo.total
            }
            if (!profileInfo.wins) {
                wins = 0;
            }
            else if (profileInfo.wins) {
                wins = profileInfo.wins;
            }
            if (!profileInfo.losses) {
                losses = 0;
            }
            else if (profileInfo.losses) {
                losses = profileInfo.losses
            }
           // if (profileInfo.playing.state) {
           //     available = "Unavailable"
          //  }
            
            const Profile = new Discord.RichEmbed()
              .setTitle(`${message.author.username}'s profile`)
              .setColor("#de1073")
              .setFooter("Astolfo.js")
              .setTimestamp()
              .setAuthor(message.author.tag, message.author.avatarURL)
              .setDescription(`**ELO:** ${elo}\n**Games:** ${total}\n**Wins:** ${wins}\n**Losses:** ${losses}`)
              .setThumbnail(message.author.avatarURL)
            message.channel.send(Profile)
        }
    }
    if (command == "decline" || command == "deny") {
        if (!inGame) {
            message.channel.send("u do not have any incoming challenges");
            return;
        }
        let playerOneID = match[inGameInfo.id].p1
        let playerOne = client.users.get(playerOneID);
        message.channel.send(`ur match with ${playerOne} has been cancelled`);
        userData.delete(`u${message.author.id}.chess.playing`);
        userData.delete(`u${playerOneID}.chess.playing`);
    }
    
    
    
    
    
    if (command == "accept") {
        if (!inGame || inGameInfo.state != "challenged") return message.channel.send("u have not been challenged by anyone");
        let playerOneID = match[inGameInfo.id].p1
        let playerOne = client.users.get(playerOneID);
        userData.set(`u${message.author.id}.chess.playing.state`, "player2");
        userData.set(`u${playerOneID}.chess.playing.state`, "player1");
        
        let runTests = async function() {
        try {
            let tests = [{description: "Options: None, Type: FEN", size: null, light: null, dark: null, array: null, pgn: null, fen: chess.fen()}];
            for (let i = 0; i < tests.length; i++) {
                let imageGenerator = await new ChessImageGenerator({
                    size: 720,
                    light: 'rgb(255, 255, 255)',
                    dark: 'rgb(222, 16, 115)',
                    style: 'merida'
                });
                if (tests[i].fen != null) {
                    await imageGenerator.loadFEN(tests[i].fen);
                } else if (tests[i].pgn != null) {
                    await imageGenerator.loadPGN(tests[i].pgn);
                } else if (tests[i].array != null) {
                    await imageGenerator.loadArray(tests[i].array);
                }
                const canvas = Canvas.createCanvas(1000, 1000);
  const ctx = canvas.getContext('2d');
  
  var number = Math.floor(Math.random()*5)
  
  var background = await Canvas.loadImage(`./chessbg.png`);
  
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#de1073';
  ctx.strokeRect(0, 0, canvas.width, canvas.height)
  
  let bruh1 = await imageGenerator.generateBuffer()
  const avatar = await Canvas.loadImage(bruh1)
  
  
  //ctx.beginPath()
  //ctx.arc(125, 125, 100, 0, Math.PI*2, true)
  //ctx.closePath()
  //ctx.clip()
  
  ctx.drawImage(avatar, 150, 25, 800, 800)
  
  
  const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png')
                let bruh = await imageGenerator.generateBuffer()
                //let attachment = new Discord.Attachment(bruh, "bruh.png")
                message.channel.send(`\u200b`, attachment);
                
            } 
        } catch(error) {
            console.log(error);
        }
    }
        runTests();
        
    }
    
    if (command == "move") {
        if (!inGame) return message.channel.send("ur not currently in a game!");
        
        
        
        let draw = async () => {
        if (!inGame) return message.channel.send("ur not currently in a game!");
        //console.log(inGameInfo)
        //console.log(match[inGameInfo.id])
        let chess = new ch.Chess();
        chess.load(match[inGameInfo.id].fen)
        var player1 = match[inGameInfo.id].p1
        var player2 = match[inGameInfo.id].p2
        var colour = chess.turn();
        
  
        //console.log(moves)
        //console.log(loadM)
        //console.log(move1)
        //console.log(move2)
       
       if (message.author.id == player1) {
         var loser = "white";
         var loserID = message.author.id
         var winner = "black";
         var winnerID = player2;
       }
       else {
         var loser = "black";
         var loserID = message.author.id;
         var winner = "white";
         var winnerID = player1;
       }
            var winnerUser = client.users.get(winnerID);
            var loserUser = client.users.get(loserID);
            
            userData.push(`u${winnerID}.chess.history`, inGameInfo.id);
            userData.push(`u${loserID}.chess.history`, inGameInfo.id);
            
            userData.add(`u${winnerID}.chess.wins`, 0);
            userData.add(`u${winnerID}.chess.total`, 1);
            userData.add(`u${loserID}.chess.losses`, 0);
            userData.add(`u${loserID}.chess.total`, 1);
            
            userData.delete(`u${winnerID}.chess.playing`);
            userData.delete(`u${loserID}.chess.playing`);
            
            let match2 = chessData.get("match")
            var removeValue = inGameInfo.id;
  
            match2[removeValue].chess = chess
            match2[removeValue].fen = chess.fen();
            match2[removeValue].moves = chess.pgn();
            match2[removeValue].winner = winner;
            match2[removeValue].turn = loser;
            
        
            chessData.delete("match");
          
            for (element of match2) {
              chessData.push("match", element)
            }
            
            var EloRank = require('elo-rank');
            var elo = new EloRank(40);
            
            var playerA = 1500;
            var playerB = 1500;
            var old1 = 1500;
            var old2 = 1500;
            
            if (userData.has(`u${winnerID}.chess.elo`)) {
                playerA = userData.get(`u${winnerID}.chess.elo`);
                old1 = playerA;
            }
            if (userData.has(`u${loserID}.chess.elo`)) {
                playerB = userData.get(`u${loserID}.chess.elo`);
                old2 = playerB;
            }
             
            //Gets expected score for first parameter
            var expectedScoreA = elo.getExpected(playerA, playerB);
            var expectedScoreB = elo.getExpected(playerB, playerA);
             
            //update score, 1 if won 0 if lost
            playerA = elo.updateRating(expectedScoreA, 1, playerA);
            playerB = elo.updateRating(expectedScoreB, 0, playerB);
            
            message.channel.send(`**Draw!**\nThe game has ended.`)
            
        }
        
        
        
        let runTests = async function() {
        try {
            let tests = [{description: "Options: None, Type: FEN", size: null, light: null, dark: null, array: null, pgn: null, fen: chess.fen()}];
            for (let i = 0; i < tests.length; i++) {
                let imageGenerator = await new ChessImageGenerator({
                    size: 720,
                    light: 'rgb(255, 255, 255)',
                    dark: 'rgb(222, 16, 115)',
                    style: 'merida'
                });
                if (tests[i].fen != null) {
                    await imageGenerator.loadFEN(tests[i].fen);
                } else if (tests[i].pgn != null) {
                    await imageGenerator.loadPGN(tests[i].pgn);
                } else if (tests[i].array != null) {
                    await imageGenerator.loadArray(tests[i].array);
                }
                const canvas = Canvas.createCanvas(1000, 1000);
  const ctx = canvas.getContext('2d');
  
  var number = Math.floor(Math.random()*5)
  
  var background = await Canvas.loadImage(`./chessbg.png`);
  
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#de1073';
  ctx.strokeRect(0, 0, canvas.width, canvas.height)
  
  let bruh1 = await imageGenerator.generateBuffer()
  const avatar = await Canvas.loadImage(bruh1)
  
  
  //ctx.beginPath()
  //ctx.arc(125, 125, 100, 0, Math.PI*2, true)
  //ctx.closePath()
  //ctx.clip()
  
  ctx.drawImage(avatar, 150, 25, 800, 800)
  
  
  const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png')
                let bruh = await imageGenerator.generateBuffer()
                //let attachment = new Discord.Attachment(bruh, "bruh.png")
                message.channel.send(`\u200b`, attachment);
                
            } 
        } catch(error) {
            console.log(error);
        }
    }
    
    
        
        
        //console.log(inGameInfo)
        //console.log(match[inGameInfo.id])
        let chess = new ch.Chess();
        chess.load(match[inGameInfo.id].fen)
        var player1 = match[inGameInfo.id].p1
        var player2 = match[inGameInfo.id].p2
        var colour = chess.turn();
        
        if (chess.turn() == "b") {
            if (message.author.id != player2) {
                message.channel.send("its not ur turn 2 move, its black's turn!!11!!")
                var colour = "black"
                return;
            }
        }
        else if (chess.turn() == "w") {
            if (message.author.id != player1) {
                message.channel.send("its currently white's turn to move!!1!1! ;P")
                var colour = "white"
                return;
            }
        }
        let move1 = args[1]
        let move2 = args[2]
        let moves = args.join(" ")
        //console.log(moves)
        //console.log(loadM)
        //console.log(move1)
        //console.log(move2)
        if (!move2 && move1) {
            let moveState = await chess.move(`${move1}`, {sloppy: true});
        }
        else if (move2 && move1) {
            let moveState = await chess.move(`${move1}${move2}`, {sloppy: true});
        }
        else {
          message.channel.send("pls specify a move!!1! :/")
          return;
        }
        if (moveState == null) {
          message.channel.send(`Invalid move!\n*(Moves are cAsE sEnSitIve)*`)
        }
        
        
        if (chess.in_check()) {
            message.channel.send(`Check!`)
        }
        if (chess.in_draw()) {
            message.channel.send("Draw!")
            if (chess.insufficient_material()) {
                message.channel.send("Insufficient material, checkmate is not possible.")
                draw();
            }
            if (!chess.insufficient_material()) {
                message.channel.send("50 move rule.")
                draw();
            }
        }
        if (chess.in_stalemate()) {
            message.channel.send("Stalemate!")
            draw();
        }
        
        
        
        
        
       
    
        
        let match1 = chessData.get("match")
        var removeValue = inGameInfo.id;
  
        match1[removeValue].chess = chess
        match1[removeValue].fen = chess.fen();
        match1[removeValue].moves = chess.pgn();
        //removeArray.splice(removeValue, 1);
        
        chessData.delete("match");
          
        for (element of match1) {
          chessData.push("match", element)
        }
        
         
    
    runTests();
    
    if (chess.in_checkmate()) {
            var loser1 = chess.turn();
            var loser;
            var loserID;
            var winner;
            var winnerID;
            if (loser1 == "b") {
                loser = "black";
                loserID = player2;
                winner = "white";
                winnerID = player1;
            }
            else if (loser1 == "w") {
                loser = "white";
                loserID = player1;
                winner = "black";
                winnerID = player2;
            }
            var winnerUser = client.users.get(winnerID);
            var loserUser = client.users.get(loserID);
            
            userData.push(`u${winnerID}.chess.history`, inGameInfo.id);
            userData.push(`u${loserID}.chess.history`, inGameInfo.id);
            
            userData.add(`u${winnerID}.chess.wins`, 1);
            userData.add(`u${winnerID}.chess.total`, 1);
            userData.add(`u${loserID}.chess.losses`, 1);
            userData.add(`u${loserID}.chess.total`, 1);
            
            userData.delete(`u${winnerID}.chess.playing`);
            userData.delete(`u${loserID}.chess.playing`);
            
            let match2 = chessData.get("match")
            var removeValue = inGameInfo.id;
  
            match2[removeValue].chess = chess
            match2[removeValue].fen = chess.fen();
            match2[removeValue].moves = chess.pgn();
            match2[removeValue].winner = winner;
            match2[removeValue].turn = loser;
            
        
            chessData.delete("match");
          
            for (element of match2) {
              chessData.push("match", element)
            }
            
            var EloRank = require('elo-rank');
            var elo = new EloRank(40);
            
            var playerA = 1500;
            var playerB = 1500;
            var old1 = 1500;
            var old2 = 1500;
            
            if (userData.has(`u${winnerID}.chess.elo`)) {
                playerA = userData.get(`u${winnerID}.chess.elo`);
                old1 = playerA;
            }
            if (userData.has(`u${loserID}.chess.elo`)) {
                playerB = userData.get(`u${loserID}.chess.elo`);
                old2 = playerB;
            }
             
            //Gets expected score for first parameter
            var expectedScoreA = elo.getExpected(playerA, playerB);
            var expectedScoreB = elo.getExpected(playerB, playerA);
             
            //update score, 1 if won 0 if lost
            playerA = elo.updateRating(expectedScoreA, 1, playerA);
            playerB = elo.updateRating(expectedScoreB, 0, playerB);
            
            userData.set(`u${winnerID}.chess.elo`, playerA);
            userData.set(`u${loserID}.chess.elo`, playerB)
            message.channel.send(`**Checkmate!**\n${winner} (${winnerUser}) wins!\n\n**New ratings:**\n${winnerUser} | ${old1} -> ${playerA}\n${loserUser} | ${old2} -> ${playerB}`);
            return;
        }
        
    }
    
    if (command == "moves") {
        let chess = new ch.Chess();
        chess.load(match[inGameInfo.id].fen);
        var move1 = args[1];
        
        if (!move1) {
            message.channel.send(`Available moves:\n${chess.moves()}`)
        }
        
        if (move1) {
            message.channel.send(`Available moves for square "${move1}":\n${chess.moves({square: `${move1}`})}`)
        }
            
    }
    
  
  
  
  
  
  
  
   if (command == "resign") {
        if (!inGame) return message.channel.send("ur not currently in a game!");
        //console.log(inGameInfo)
        //console.log(match[inGameInfo.id])
        let chess = new ch.Chess();
        chess.load(match[inGameInfo.id].fen)
        var player1 = match[inGameInfo.id].p1
        var player2 = match[inGameInfo.id].p2
        var colour = chess.turn();
        
  
        //console.log(moves)
        //console.log(loadM)
        //console.log(move1)
        //console.log(move2)
       
       if (message.author.id == player1) {
         var loser = "white";
         var loserID = message.author.id
         var winner = "black";
         var winnerID = player2;
       }
       else {
         var loser = "black";
         var loserID = message.author.id;
         var winner = "white";
         var winnerID = player1;
       }
            var winnerUser = client.users.get(winnerID);
            var loserUser = client.users.get(loserID);
            
            userData.push(`u${winnerID}.chess.history`, inGameInfo.id);
            userData.push(`u${loserID}.chess.history`, inGameInfo.id);
            
            userData.add(`u${winnerID}.chess.wins`, 1);
            userData.add(`u${winnerID}.chess.total`, 1);
            userData.add(`u${loserID}.chess.losses`, 1);
            userData.add(`u${loserID}.chess.total`, 1);
            
            userData.delete(`u${winnerID}.chess.playing`);
            userData.delete(`u${loserID}.chess.playing`);
            
            let match2 = chessData.get("match")
            var removeValue = inGameInfo.id;
  
            match2[removeValue].chess = chess
            match2[removeValue].fen = chess.fen();
            match2[removeValue].moves = chess.pgn();
            match2[removeValue].winner = winner;
            match2[removeValue].turn = loser;
            
        
            chessData.delete("match");
          
            for (element of match2) {
              chessData.push("match", element)
            }
            
            var EloRank = require('elo-rank');
            var elo = new EloRank(40);
            
            var playerA = 1500;
            var playerB = 1500;
            var old1 = 1500;
            var old2 = 1500;
            
            if (userData.has(`u${winnerID}.chess.elo`)) {
                playerA = userData.get(`u${winnerID}.chess.elo`);
                old1 = playerA;
            }
            if (userData.has(`u${loserID}.chess.elo`)) {
                playerB = userData.get(`u${loserID}.chess.elo`);
                old2 = playerB;
            }
             
            //Gets expected score for first parameter
            var expectedScoreA = elo.getExpected(playerA, playerB);
            var expectedScoreB = elo.getExpected(playerB, playerA);
             
            //update score, 1 if won 0 if lost
            playerA = elo.updateRating(expectedScoreA, 1, playerA);
            playerB = elo.updateRating(expectedScoreB, 0, playerB);
            
            userData.set(`u${winnerID}.chess.elo`, playerA);
            userData.set(`u${loserID}.chess.elo`, playerB)
            message.channel.send(`**${loser} resigned!**\n${winner} (${winnerUser}) wins!\n\n**New ratings:**\n${winnerUser} | ${old1} -> ${playerA}\n${loserUser} | ${old2} -> ${playerB}`);
        
  }
  
  
  if (command == "lb" || command == "leaderboard" || command == "top") {
    var array1 = userData.all();
    var tempData1;
    var tempData2;
    var array2 = [];
    var array3 = [];
    var array35 = [];
    var array4 = [];
    var indices = [];
    let i = 0;
    let y = 0;
    for (element of array1) {
      if (userData.has(`${element.ID}.chess.elo`)) {
        tempData1 = element.ID.replace("u", "");
        array2[i] = tempData1;
        tempData2 = element.data.chess.elo;
        array3[i] = tempData2;
        array35[i] = tempData2;
        array4[i] = tempData2;
        i++
      }
    }
    
    array4.sort((a, b) => b - a);
    
    indices[0] = array3.indexOf(array4[0])
    array3[indices[0]] = "no"
    
    indices[1] = array3.indexOf(array4[1])
    array3[indices[1]] = "no"
    
    indices[2] = array3.indexOf(array4[2])
    array3[indices[2]] = "no"
    
    
  
  const firstUser = client.users.get(array2[indices[0]]);
  const secondUser = client.users.get(array2[indices[1]]);
  const thirdUser = client.users.get(array2[indices[2]]);
  
  const Top = new Discord.RichEmbed()
    .setTitle("**Astolfo Chess Leaderboard**")
    .setImage(firstUser.avatarURL)
    .setColor("#de1073")
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setFooter("Astolfo.js")
    .setTimestamp()
    .setDescription(`1. ${firstUser.tag} | ${array35[indices[0]]}\n2. ${secondUser.tag} | ${array35[indices[1]]}\n3. ${thirdUser.tag} | ${array35[indices[2]]}`)
    
  message.channel.send(Top)
  }
  
  






  //runTests();
};
module.exports.help = {
    name: "chess",
    aliases: ["c","ch"],
    category: "Fun",
};