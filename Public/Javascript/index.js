//linter settings
/*global console:false, io:false, Phaser:false, player:false, otherPlayers:false */
//jshint unused:false


//init variables here
var id;
var myClient;
var connectedCount = 1;
var socket;

var game;
var cursors;
var myUsername;
var connection = false;
var mapData;
var obstacleData;
var floor;
var newPotion = [];
var type;

//initial game start here called by html body
function init(username){
	"use strict";
	myUsername = username;

	socketSetup();
}

function gameSetup() {
	"use strict";
	//call phaser init here
	game = new Phaser.Game(800, 600, Phaser.CANVAS, 'Medivial Warefare', { preload: preload, create: create, update: update, render: render });
}

function socketSetup(){
	"use strict";

	socket = io.connect({
		reconnection: false
	});

	socket.emit("getMap");

	socket.on("addPotions", function(data){
		//console.log(data[1].x);
		for (var i = 0; i < data.length; i++){

			if(data[0].type == "0"){
				type = "hPotion";
			}else{
				type = "sPotion";
			}

			var potion = game.add.sprite(data[i].x, data[i].y, type);
			potion.scale.set(2,2);
			potion.potionType = type;
			game.world.bringToTop(potion);
			game.physics.arcade.enable([potion], Phaser.Physics.ARCADE);
			newPotion.push(potion);

		}
		

	});

	socket.on("sendMap", function(data){
		mapData = data.map;
		obstacleData = data.obstacle;
	});

	socket.on("idAssign", function(data) {
		id = data.id;
		gameSetup();
		connection = true;
	});

	socket.on("addUsers", function(userDatas) {
		console.log("Adding users");
		for (var i = 0; i < userDatas.length; i++) {
			if (userDatas[i].player.playerId !== id) {
				console.log(userDatas[i]);
				addUser(userDatas[i]);
				connectedCount++;
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

	socket.on("sendGraves", function(data) {
		//console.log("here");
		var newGrave = game.add.sprite(data.x, data.y, 'grave');
		newGrave.scale.set(2,2);
	});

	socket.on("removeUser", function(data) {
		for (var i = 0; i < otherPlayers.length; i++) {
			if (data.id == otherPlayers[i].playerId) {
				console.log("Removing player with id: " + data.id);
				allSprites.splice(allSprites.indexOf(otherPlayers[i]), 1);
				otherPlayers[i].destroy();
				otherPlayers.splice(i, 1);
				connectedCount--;
			}
		}
	});

	socket.on("disconnect", function(data){
		connection = false;
	});

}

function joinGame() {
	// Add self to game
	console.log("Adding self to game with id: " + id);
	socket.emit("addUser", {"id" : id, "player" : player.getData()});
}

function addUser(userData) {
	console.log("Adding player with id: " + userData.player.playerId);
	var newPlayer = new Player(game, false, userData.player.playerName, userData.player.playerId, userData.player.x, userData.player.y);
	newPlayer.unpackData(userData.player);
	allSprites.push(newPlayer);
	otherPlayers.push(newPlayer);
}

function addGraves(data) {
	"use strict";
	//console.log(data);
	//for (var i = 0; i < data.length; i++) {
		//graves.push(new Grave(game, data.xPos, data.yPos, data.id));
	//}

}