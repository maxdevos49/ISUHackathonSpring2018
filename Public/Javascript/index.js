//linter settings
/*global console:false, io:false, Phaser:false, player:false*/
//jshint unused:false


//init variables here
var userId;
var myClient;
var connectedCount = 0;
var socket;

var game;
var cursors;

//initial game start here called by html body
function init(){
	"use strict";

	socketSetup();
	//call phaser init here
	game = new Phaser.Game(800, 600, Phaser.CANVAS, 'Medivial Warefare', { preload: preload, create: create, update: update, render: render });

}

function socketSetup(){
	"use strict";

	socket = io.connect({
		reconnection: false
	});

	socket.on("connReply", function(data){
		userId = data;
	});


	//load new users when they connect
	socket.on("addUser", function(data){

		connectedCount +=1;

		// Unpack data
		if (data.playerId !== userId) {
			addUser(data);
		}

		console.log("A user connected!");
		console.log("There are " + connectedCount + " user online!");
	});

	//remove users when they disconnect
	socket.on("userDisconnect", function(data) {
		
		//delete the user here/tell server to save his info

		console.log("user disconnected");

		connectedCount -= 1;

		for (var i = 0; i < otherPlayers.length; i++) {
			if (otherPlayers[i].playerId == data.id) {
				otherPlayers.splice(i, 1);
			}
		}

		console.log("There are " + connectedCount + " user online!");

	});

	socket.on("recieveUsers", function(users) {
		for (let user of users) {
			if (user != null) {
				addUser(user);
			}
		}
	});

	socket.on("clientRecievePlayerData", function(data) {

		if(data.clientId !== userId){
			for (let otherPlayer of otherPlayers) {
				if (otherPlayer.playerId == data.player.playerId) {
					otherPlayer.unpackData(data);
				}
			}
		}
		
	});

	socket.on("disconnect", function(){

		console.log("connection Lost... reload your page");

	});

}

function joinGame() {
	// Add self to game
	socket.emit("getUsers");
	socket.emit("addUser", {"player" : player.getData()});
}

function addUser(userData) {
	var newPlayer = new Player(game, userData.player.playerName, userData.player.playerId, userData.player.x, userData.player.y);
	newPlayer.unpackData(userData.player);
	otherPlayers.push(newPlayer);
}