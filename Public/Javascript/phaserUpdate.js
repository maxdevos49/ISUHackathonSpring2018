/*global cursors:false, player:false, userId:false, socket:false*/
//jshint unused:false

function update() {
	"use strict";
	// Controls for player
	var direction = "NONE";

	if (cursors.left.isDown) {
		direction = "left";
		player.animations.play('walkLeft',8, false);
	}

	if (cursors.right.isDown) {
		direction = "right";
		player.animations.play('walkRight',8, false);
	}
	if (cursors.up.isDown) {
		direction = "up";
		player.animations.play('walkUp',8, false);
	}

	if (cursors.down.isDown) {
		direction = "down";
		player.animations.play('walkDown',8, false);
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