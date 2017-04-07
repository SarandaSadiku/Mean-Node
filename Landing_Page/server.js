var fs = require('fs'),
    http = require('http'),
    port = 5000;

var server = http.createServer();

server.listen(port, function(){
    console.log("Running on port: ", port);
});
