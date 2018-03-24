//linter settings
/*global console:false, io:false, Phaser:false, player:false*/
//jshint unused:false


//init variables here
var id;
var myClient;
var connectedCount = 0;
var socket;

var game;
var cursors;

//initial game start here called by html body
function init(){
	"use strict";

	socketSetup();
}

function gameSetup() {
	//call phaser init here
	game = new Phaser.Game(800, 600, Phaser.CANVAS, 'Medivial Warefare', { preload: preload, create: create, update: update, render: render });
}

function socketSetup(){
	"use strict";

	socket = io.connect({
		reconnection: false
	});

	socket.on("idAssign", function(data) {
		console.log("Assigned id: "+ data.id);
		id = data.id;
		gameSetup();
	});

	socket.on("addUsers", function(userDatas) {
		console.log("Adding users");
		console.log(userDatas);
		for (var i = 0; i < userDatas.length; i++) {
			console.log("Should i add? " + userDatas[i].player.playerId);
			if (userDatas[i].player.playerId !== id) {
				console.log(userDatas[i]);
				addUser(userDatas[i]);
			}
		}
	});

	socket.on("updateUser", function(userData) {
		//console.log("updating with data: " + userData);
		for (var i = 0; i < otherPlayers.length; i++) {
			if (userData.id == otherPlayers[i].playerId) {
				otherPlayers[i].unpackData(userData.player);
			}
		}
	});

	socket.on("removeUser", function(data) {
		for (var i = 0; i < otherPlayers.length; i++) {
			if (data.id == otherPlayers[i].playerId) {
				console.log("Removing player with id: " + data.id);
				otherPlayers[i].destroy();
				otherPlayers.splice(i, 1);
			}
		}
	});

	// socket.on("connReply", function(data){
	// 	userId = data;
	// 	gameSetup();
	// });


	// //load new users when they connect
	// socket.on("addUser", function(data){

	// 	connectedCount +=1;

	// 	// Unpack data
	// 	if (data.player.playerId !== userId) {
	// 		addUser(data);
	// 	}

	// 	console.log("A user connected!");
	// 	console.log("There are " + connectedCount + " user online!");
	// });

	// //remove users when they disconnect
	// socket.on("userDisconnect", function(data) {
		
	// 	//delete the user here/tell server to save his info
	// 	connectedCount -= 1;

	// 	for (var i = 0; i < otherPlayers.length; i++) {
	// 		if (otherPlayers[i].playerId === data.id) {
	// 			console.log("Removing " + i);
	// 			otherPlayers.split(i,1);
	// 		}
	// 	}

	// 	console.log("There are " + connectedCount + " user online!");

	// });

	// socket.on("recieveUsers", function(users) {
	// 	for (let user of users) {
	// 		if (user !== null) {
	// 			addUser(user);
	// 		}
	// 	}
	// });

	// socket.on("clientRecievePlayerData", function(data) {

	// 	if(data.clientId !== userId){
	// 		for (let otherPlayer of otherPlayers) {
	// 			if (otherPlayer.playerId == data.player.playerId) {
	// 				otherPlayer.unpackData(data);
	// 			}
	// 		}
	// 	}
		
	// });

	// socket.on("disconnect", function(){

	// 	console.log("connection Lost... reload your page");

	// });

}

function joinGame() {
	// Add self to game
	console.log("Adding self to game with id: " + id);
	socket.emit("addUser", {"id" : id, "player" : player.getData()});
}

function addUser(userData) {
	console.log("Adding player with id: " + userData.player.playerId);
	var newPlayer = new Player(game, userData.player.playerName, userData.player.playerId, userData.player.x, userData.player.y);
	newPlayer.unpackData(userData.player);
	otherPlayers.push(newPlayer);
}