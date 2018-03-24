/*global cursors:false, player:false, userId:false, socket:false*/
//jshint unused:false

function update() {
	"use strict";
	// Controls for player
	var direction = "NONE";


	if (game.input.gamepad.supported) {
		console.log("gamepad supported");
	}
	if (game.input.gamepad.active) {
		console.log("gamepad active");
	}
	if (controller1.connected) {
		console.log("gamepad connected");
	}


	//Checks if controller is supported, active, and connected
	if (controllerConnected) {

		if (controller1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || controller1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
			direction = "left";
		}
		if (controller1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || controller1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
			direction = "right";
		}

		if (controller1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || controller1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) {
			direction = "up";
		}
		if (controller1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || controller1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
			direction = "down";
		}

	} else {

		if (cursorKeys.left.isDown) {
			direction = "left";
		}

		if (cursorKeys.right.isDown) {
			direction = "right";
		}
		if (cursorKeys.up.isDown) {
			direction = "up";
		}

		if (cursorKeys.down.isDown) {
			direction = "down";
		}

		if (spaceKey.isDown) {
			player.stab();
		}
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
