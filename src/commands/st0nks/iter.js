


const db = require('betterqdb');
const userData = new db.table('user');
const marketData = new db.table('market');

const { RichEmbed } = require('discord.js');
const Discord = require('discord.js')
const eco = require('discord-economy');




module.exports.run = async (client, message, args) => {


//this is the code, you can see that I added myself 2 offers.
//when I run it, it will print our offers
//you seeing this?
// so how do we differentiate between the two att1's?
//Is that what you meant?
//oh
//wow 
  const testData = new db.table('test');
    testData.delete("Offers")
 

    ////
    testData.push("Offers", {att1 : 3, att2 : 5})
    testData.push("Offers", {att1 : 10, att2 : 10})


    testData.push("Offers", {att1 : 3, att2 : 5})
    testData.push("Offers", {att1 : 5, att2 : 7})

    
    console.log(testData.get("Offers"))


    //Delete second element


    var indexToRemove = 1
    var myArray = testData.get("Offers")
    myArray.splice(indexToRemove, 1)
    testData.delete("Offers")
    console.log()
    console.log(myArray)
    console.log()

    
    for (element of myArray) {
      testData.push("Offers", element)
    }



    console.log()
    var testArray = testData.all()
    console.log(testData.get("Offers"))


    console.log()
    console.log()
    console.log()
    console.log()
    //Ierates over users
    console.log("PRINT WHOLE ARRAY")
    console.log(testArray)
      
      let elem = testArray[0]
        
        console.log(elem)
        console.log(`Offers from: ${elem.ID}`)

        console.log(elem.data)
          //Iterates over offers from that user

          /////
          for (listing of elem.data) {
            console.log(listing)
            console.log(`Selling ${listing.att1} for ${listing.att2}`)

          }
      
}






module.exports.help = {
  name: "iter",
  aliases: "aaaaa",
  category: "st0nks market",
};