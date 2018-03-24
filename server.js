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
      console.log(key); 
      console.log("giving new client user data for user: " + users[key].data.id);
      userDatas.push(users[key].data);
    }
    socket.emit("addUsers", userDatas);

  });

  socket.on("userDataUpdate", function(userData) {
    //console.log("Updating for user with id: " + userData.id);
    users[userData.id].data = userData;
    io.sockets.emit("updateUser", userData);
  });

  socket.on("disconnect", function() {
    console.log("User disconnected")
    var remainingUsers = {};
    for (var id in Object.keys(users)) {
      console.log(id);
      if (users[id].socketId == socket.id) {
        io.sockets.emit("removeUser", {"id" : id})
        break;
      } else {
        remainingUsers[id] = users[id];
      }
    }
    users = remainingUsers;
  });

  // //create a object of the user info
  // //user[client] = new userInfo(socket.id, nextClientId);

  // //alert the console of a new user
  // console.log("new connection with index: " + nextClientId);

  // //reply for initial connection
  // socket.emit("connReply", nextClientId);

  // //this is recieved from a newly connected client
  // socket.on("addUser", function(data){

  //   //this is sent after a new client is connected and tells all the other clients to add there info
  //   io.sockets.emit("addUser", data);

  // });

  // socket.on("getUsers", function() {
  //   socket.emit("recieveUsers", userData);
  // }); 

  // //run this when someone disconnects
  // socket.on("disconnect", function() {

  //   var rmIndex;
  //   //loop through all the user objects
  //   for (var i = 0; i < num_Id.length ;i++ ){

  //     //check for the disconnected users object
  //     if (num_Id[i] == socket.id){

  //       //save the disconnecting users index
  //       var rmIndex = i;
  //     }
  //   }

  //   //remove the disconnecting users object
  //   //delete user[rmIndex];
  //   console.log("Disconnection with index: " + rmIndex);

  //   delete userData[i];

  //   //alert other clients of the disconnect
  //   io.sockets.emit("userDisconnect", {
  //     id: rmIndex
  //   });

  // });

  // socket.on("serverRecievePlayerData", function(data) {
  //   userData[data.clientId] = data;

  //   io.sockets.emit("clientRecievePlayerData", data);

  // });

  // //increment this once per connection for client index/clientNum
  // nextClientId++;
});
