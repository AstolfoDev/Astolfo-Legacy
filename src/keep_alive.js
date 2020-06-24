var http = require('http');

http.createServer(function (req, res) {
  res.write("Bot online.");
  res.end();
 
}).listen(8080);

 