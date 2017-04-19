var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

http.listen('3000');	
console.log("we are connected to Port 3000");

//var app = express();
// Make public a static dir
app.use(express.static("public"));

io.sockets.on('connection', function(socket){
	console.log("I am connected");
	io.sockets.on("new-message", function(msg) {
		console.log(msg);
		io.sockets.emit("receive-message", msg);
	})

	io.sockets.on('test', function(){

	})
//});
});

console.log('io mounted');

//io.sockets.on('connection', function(socket) {
//	console.log("mounted");
//	console.log("we have a connection");
//	socket.on("new-message", function(msg) {
//		console.log(msg);
//		io.emit("receive-message", msg);
//	})
//	socket.on('test', function(){
		
//	})
//});

//app.get("/", function(req, res){
//  res.render("index");
//});