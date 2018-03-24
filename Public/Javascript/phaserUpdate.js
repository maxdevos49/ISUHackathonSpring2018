/*global cursors:false, player:false, userId:false, socket:false*/
//jshint unused:false

function update() {
	"use strict";
	// Controls for player
	var direction = "NONE";

	if (cursors.left.isDown) {
		direction = "left";
	}

	if (cursors.right.isDown) {
		direction = "right";
	}
	if (cursors.up.isDown) {
		direction = "up";
	}

	if (cursors.down.isDown) {
		direction = "down";
	}

	if (direction == "NONE") {
		player.moving = false;
	} else {
		player.direction = direction;
		player.moving = true;
	} 
	
	var clientData = {
		"id" : id,
		"player" : player.getData()
	};
	socket.emit("userDataUpdate", clientData);

}