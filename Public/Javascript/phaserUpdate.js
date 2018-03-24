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

	player.direction = direction;

	if (direction == "NONE") {

		player.moving = false;

	} else {

		player.moving = true;

	}

	var clientData = {
		"clientId" : userId,
		"player" : player.getData()
	};

	socket.emit("serverRecievePlayerData", clientData);

}