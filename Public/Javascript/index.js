//linter settings
/*global console:false, io:false, Phaser:false*/
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

	//call socket stuff for start
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
		//emit a request for all of the other users info
		socket.emit("loadOtherUsers", );

	});


	//load new users when they connect
	socket.on("loadOtherUsers", function(data){

		connectedCount +=1;

		// Unpack data

		console.log("A user connected!");
		console.log("There are " + connectedCount + " user online!");
	});

	//remove users when they disconnect
	socket.on("userDisconnect", function(data){
		
		//delete the user here/tell server to save his info

		console.log("user disconnected");

		connectedCount -= 1;

		console.log("There are " + connectedCount + " user online!");

	});

	socket.on("disconnect", function(){

		console.log("connection Lost... reload your page");

	});

	socket.on("clientRecievePlayerData", function(data) {

		//player.unpackData(data);
		//console.log(data);

	});

}