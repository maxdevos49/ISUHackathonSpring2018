/*global require:false, console:false, __dirname: false, document:false, window: false, Selector: false*/
// jshint esversion: 6 
/*jslint node:true*/
"use strict";
//Paint server for testing

//require server components
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const ip = require('ip');



//let the server listen on port 80
server.listen(8080);

//tell console the server is running
console.log(`Hackathon 2! IP is ${ip.address()}:8080`);

//tell where to find page depended info. css/javascript/images/audio/and other stuff
app.use(express.static('Public'));

//do this on a connection from the client
app.get('/', (req, res) => {

  //respond with this for the client
    res.sendFile(__dirname + '/index.html');
    console.log("Connection!");

});

app.get('/index.html', (req, res) => {

  //respond with this for the client
    res.sendFile(__dirname + '/index.html');
    console.log("Connection!");


});


//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/Socket IO CODE\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

//init variables
var users = {};
var nextClientId = 0;
var curGraveId = 0;
var graves = [];

//process socket request
io.on("connection", function(socket){//this runs on first connection

  //give client a socket id
  users[nextClientId] = {};
  users[nextClientId].socketId = socket.id;

  console.log("new connection with Id: " + nextClientId);
  socket.emit("idAssign", {"id" : nextClientId});
  nextClientId++;

  socket.on("addUser", function(userData) {
    console.log("Adding user to game with id: " + userData.id);
    var clientId = userData.id;
    users[clientId].data = userData
    // Send new user data to all sockets
    io.sockets.emit("addUsers", [userData]);
    // Send all connected users to the new user
    var userDatas = [];
    for (var key in Object.keys(users)) {
      if ((key == null) || (users[key] == null)) {
        continue;  
      }
      userDatas.push(users[key].data);
    }
    socket.emit("addUsers", userDatas);
    socket.emit("addGraves", graves);

  });

  socket.on("sendGrave", function(data) {
    
    io.sockets.emit("sendGraves", data);

  });

  socket.on("userDataUpdate", function(userData) {
    //console.log("Updating for user with id: " + userData.id);
    users[userData.id].data = userData;
    io.sockets.emit("updateUser", userData);
  });
  
  socket.on("nextGraveId", function() {
    curGraveId++;
    socket.emit("nextGraveId", curGraveId);
  });

  socket.on("disconnect", function() {
    console.log("User disconnected")
    var remainingUsers = {};
    for (var id in Object.keys(users)) {
      console.log(id);
      if ((id == null) || (users[id] == null)) {
        continue;
      } else if (users[id].socketId == socket.id) {
        io.sockets.emit("removeUser", {"id" : id})
      } else {
        remainingUsers[id] = users[id];
      }
    }
    users = remainingUsers;
    console.log(remainingUsers);
  });

  socket.on("getMap", function(){
  	socket.emit("sendMap",{
  		"map":mapData,
  		"obstacle":obstacleData});
  });

});



var mapData = '';

for (var y = 0; y < 128; y++)
{
	for (var x = 0; x < 128; x++)
	{
	    var randomNum = Math.floor(Math.random() * 100) ;


		if ((x === 0) && (y === 0)) {             //Top left fence
			mapData += '6';
		} else if ((x === 0) && (y === 127)) {    //Bottom left fence
			mapData += '8';
		} else if ((x === 127) && (y === 0)) {    //Top right fence
			mapData += '5';
		} else if ((x === 127) && (y === 127)) {  //Bottom right fence
			mapData += '7';
		} else if((y === 0) || (y === 127)) {     //Top and Bottom fence
			mapData += '9';
		} else if ((x === 0) || (x === 127)) {    //Left and Right fence
			mapData += '3';
		} else if(randomNum < 80) {
	    	mapData += '1';
	    } else if(randomNum < 85) {
	    	mapData += '2';
	    } else if(randomNum < 95) {
	    	mapData += '0';
	    } else if(randomNum <= 100) {
	    	mapData += '4';
	    }

	    if (x < 127)
	    {
	        mapData += ',';
	    }
	}

	if (y < 127)
	{
	    mapData += "\n";
	}
}

var obstacleData = [];

for (var i = 0; i < 133; i++)
{
	
	var randomNumx = (Math.floor(Math.random() * 126) + 1) * 30;
	var randomNumy = (Math.floor(Math.random() * 126) + 1) * 30;
	var randomNumtype = Math.floor(Math.random() * 4);

	obstacleData[i] = {
		"x": randomNumx,
		"y": randomNumy,
		"type": randomNumtype
	};

}

var potionData = [];

function getPotions(){

	for (var i = 0; i < 10; i++)
	{

		var randomNumx = (Math.floor(Math.random() * 126) + 1) * 30;
		var randomNumy = (Math.floor(Math.random() * 126) + 1) * 30;
		var randomNumtype = Math.floor(Math.random() * 2);

		potionData[i] = {
			"x": randomNumx,
			"y": randomNumy,
			"type": randomNumtype
		};

	}

	io.sockets.emit("addPotions", potionData);

}


setInterval(getPotions, 10000);


