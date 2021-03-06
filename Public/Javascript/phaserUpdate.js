/*global cursors:false, player:false, userId:false, socket:false,pad1:false, Phaser:false,cursorKeys:false,otherPlayers:false,
healthImg:false, staminaImg:false,aKey:false,dKey:false,sKey:false,wKey:false,game:false,id:false,allSprite:false, graves:false, console:false*/
//jshint unused:false

function update() {
	"use strict";
	// Controls for player
	var direction = "NONE";

	//Controller controls
	if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
		direction = "left";
	}

	if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
		direction = "right";
	}

	if ((pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) && (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > -0.5) && (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < 0.5)) {
		direction = "up";
	}

	if ((pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1)  && (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > -0.5) && (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < 0.5)) {
		direction = "down";
	}

	// if (pad1.isDown(Phaser.Gamepad.XBOX360_LEFT_TRIGGER)) {
	// 	player.setPace(true);
	// } else {
	// 	player.setPace(false);
	// }

	if (pad1.isDown(Phaser.Gamepad.XBOX360_A)) {
		player.stab();
	}


	//Arrow and WASD controls
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

	if (shiftKey.isDown) {
		player.setPace(true);
		if(player.stamina > 0){
			player.stamina -= 0.5;
		}

	} else {
		player.setPace(false);
		if(player.stamina < 100){
			player.stamina += 0.5;
		}

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

	for (var i = 0; i < otherPlayers.length; i++) {
		// console.log(otherPlayers[i].sword);
		// var swordX = otherPlayers[i].sword.body.position.x;
		// var swordY = otherPlayers[i].sword.body.position.y;
		// var swordWidth = otherPlayers[i].sword.body.width;
		// var swordHeight = otherPlayers[i].sword.body.height;
		// if (checkOverlap(player, otherPlayers[i].sword)) {
		// 	if (otherPlayers[i].isStabbing) {
		// 		player.onHit(otherPlayers[i].sword);
		// 	}
		// }
		if (otherPlayers[i].isStabbing) {
			game.physics.arcade.collide(player, otherPlayers[i].sword, function(player, sword) {player.onHit(sword, i)});
		}
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
	for (i = 0; i < allSpritesInCameraSorted.length; i++) {
		game.world.bringToTop(allSpritesInCameraSorted[i]);
	}

	// Z Index
	// var allImagesInCameraSorted = allImages.filter(image => image.inCamera)
	// 		.sort(function(image1, image2) {
	// 			return image1.y > image2.y;
	// 		});
	// for (var i = 0; i < allImagesInCameraSorted.length; i++) {
	// 	game.world.bringToTop(allImagesInCameraSorted[i]);
	// }

	OnlineUsersTxt.text = "Players: " + connectedCount;
	serverStatus.text = (connection === true) ? "Server Status: Green" : "Server Status: Red";

	healthBar.text = "Health: " + player.health;
	staminaBar.text = "Stamina: " + player.stamina;
	deathBar.text = "Deaths: " + player.deaths;

	healthImg.width = player.health * 2;
	staminaImg.width = player.stamina * 2;


	for (i = 0; i < obstaclesArray.length; i++){
		game.physics.arcade.collide(player, obstaclesArray[i]);
	}

	for (i = 0; i < newPotion.length; i++){
		game.physics.arcade.collide(player, newPotion[i], function(potionId) {potionHandler(i)});
	}

	game.world.bringToTop(hud);
}

function potionHandler(potionId){

	if(newPotion[potionId].potionType == "sPotion"){
		player.stamina += 50;
	}else{
		player.health = 100;
	}
	

	newPotion[potionId].destroy();

	newPotion.splice(potionId,1);

	console.log(newPotion);
}



function playerDeath() {
	"use strict";
	
	socket.emit("sendGrave", {
		"x": player.x,
		"y": player.y,
	});

	player.deaths += 1;


	player.x = 400;
	player.y = 300;
	player.health = 100;

}
