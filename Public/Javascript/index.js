//linter settings
/*global console:false, io:false*/
//jshint unused:false


//init variables here
var user = [];
var myClient;
var connectedCount = 0;
var connection = false;
var socket;
// var username;
// var password;
// var message;
// var posted = "";
// var messageCount = 0;
// var classType;

console.log("Loaded this");

var game;

//initial game start here called by html body
function init(){
	"use strict";
	console.log("Loaded that");

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

		//myClient = data.clientNum;

		//user[myClient] = new userInfo(data.clientID, data.clientNum, username);
		//add new user class here



		//emit a request for all of the other users info
		socket.emit("loadOtherUsers", user[myClient]);
	});


	//load new users when they connect
	socket.on("loadOtherUsers", function(data){

		connectedCount = 0;

		for(var i = 0; i < data.length; i++){

			//if (data[i] !== null){

				connectedCount +=1;

			//	if(data[i].clientNum !== myClient){

			//		console.log("Loading user with index "+data[i].clientNum);

					//user[data[i].clientNum] = new userInfo(data[i].clientID, data[i].clientNum, data[i].clientUserName);
	                

	        //        console.log(data[i].clientUserName + " is online!");
					connection = true;
			//	}

			//}

		}

		console.log("There are " + connectedCount + " user online!");
	});

	//remove users when they disconnect
	socket.on("userDisconnect", function(data){
		//delete user[data.id];

		//console.log("user disconnected with index: " + data.id);

		connectedCount -= 1;

		//console.log("There are " + connectedCount + " user online!");

	});

	socket.on("disconnect", function(){

		connection = false;

		console.log("connection Lost... reload your page");

	});



}