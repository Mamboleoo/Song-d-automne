var express = require("express"),
	app = express(),
	server = require("http").createServer(app),
	io = require("socket.io").listen(server);

app.use(express.static(__dirname + "/"));

//number of player when the server is launched
var numberPlayers = 0;
//var id for everyplayer
var id = 0;
var newPlayer = {};

var connectedPlayers = [];
var lol = [6,651256,132132,1456,23,651,321,65,15,21,651,321,23];

io.sockets.on("connection", function(socket){

	//When someone connects, number of players increase
	numberPlayers++;
	//Set for the new player
	newPlayer = {
		"id" 	: id,
		"name" 	: "Player"+numberPlayers,
		"room"	: "bedroom_1",
		"floor" : "a"
	};
	connectedPlayers.push(newPlayer);
	id++;

	//create the player
	socket.set("player", newPlayer);
	// Send notification
	socket.get("player", function(error, player){
		socket.broadcast.emit("new player", player);
	});

	socket.on("send msg", function(data){
		socket.get("player", function(error, player){
			io.sockets.emit("get msg", player.name, data);
		});
	});

	socket.on("player move", function(newVal, oldVal, actualFloor){
		socket.get("player", function(error, player){
			for (var i=0, j = connectedPlayers.length;i<j;i++){
				if(connectedPlayers[i].name == player.name){
					connectedPlayers[i].room = newVal;
					connectedPlayers[i].floor = actualFloor;
				}
			};
			socket.broadcast.emit("player move", player, newVal, oldVal, actualFloor);
		});
	});

	socket.on("disconnect", function(){
		socket.get("player", function(error, player){
			for(var i = 0, j = connectedPlayers.length;i<j;i++){
				if(connectedPlayers[i].name == player.name){
					var deleteItem = i;
					i = j;
				}
			}
			connectedPlayers.splice(deleteItem,1);
			io.sockets.emit("player disconnect", deleteItem);
		});
	});

	socket.emit("connexion", connectedPlayers, newPlayer.name);
	console.log(connectedPlayers);

});

server.listen(8080);
