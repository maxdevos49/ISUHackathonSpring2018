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
var userData = [];
var num_Id = [];
var nextClientNum = 0;

//process socket request
io.on("connection", function(socket){//this runs on first connection

  //give client a socket id
  num_Id[nextClientNum] = socket.id;

  //create a object of the user info
  //user[client] = new userInfo(socket.id, nextClientNum);

  //alert the console of a new user
  console.log("new connection with index: " + nextClientNum);

  //reply for initial connection
  socket.emit("connReply", user[nextClientNum]);


  //this is recieved from a newly connected client
  socket.on("loadOtherUsers", function(data){

    //user[data.clientNum].clientUserName = data.clientUserName;

    //this is sent after a new client is connected and tells all the other clients to add there info
    io.sockets.emit("loadOtherUsers", user);

  });

  socket.on

  //run this when someone disconnects
  socket.on("disconnect", function(){

    var rmIndex;
    //loop through all the user objects
    for (var i = 0; i < num_Id.length ;i++ ){

      //check for the disconnected users object
      if (num_Id[i] == socket.id){

        //save the disconnecting users index
        var rmIndex = i;
      }
    }

    //remove the disconnecting users object
    delete user[rmIndex];
    console.log("Disconnection with index: " + rmIndex);

    //alert other clients of the disconnect
    io.sockets.emit("userDisconnect", {
      id: rmIndex
    });

  });

  //increment this once per connection for client index/clientNum
  nextClientNum++;
});
