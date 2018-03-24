/*global cursors:false, player:false, userId:false, socket:false*/
//jshint unused:false

function update() {
	"use strict";
	// Controls for player
	var direction = "NONE";


		//Controller controls
		if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
			direction = "left";
		}
		else if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
			direction = "right";
		}

		if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) {
			direction = "up";
		}
		else if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
			direction = "down";
		}

		if (pad1.isDown(Phaser.Gamepad.XBOX360_A)) {
			player.stab();
		}


		//Arrow controls
		if (cursorKeys.left.isDown || aKey.isDown) {
			direction = "left";
		}

		if (cursorKeys.right.isDown || dKey.isDown) {
			direction = "right";
		}
		if (cursorKeys.up.isDown || wKey.isDown) {
			direction = "up";
		}

		if (cursorKeys.down.isDown || sKey.isDown) {
			direction = "down";
		}

		if (spaceKeyStroke.isDown) {
			player.stab();
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

	// Z Index
	var allSpritesInCameraSorted = allSprites.filter(sprite => sprite.inCamera)
			.sort(function(sprite1, sprite2) {
				return sprite1.y > sprite2.y;
			});
	for (var i = 0; i < allSpritesInCameraSorted.length; i++) {
		game.world.bringToTop(allSpritesInCameraSorted[i]);
	}

}
