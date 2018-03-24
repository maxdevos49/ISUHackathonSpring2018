// Player = function(game, initialX, initialY) {

// 	Phaser.Sprite.call(this, game, initialX, initialY);

// 	this.anchor.setTo(0.5, 0.5);

// 	this.angle = 0;
// 	this.moving = false;
// 	this.curMoveSpeed = "normal";
// 	this.movementSpeeds = {
// 		"normal":10,
// 		"sprint":15,
// 		"crawl":7
// 	}

// 	game.add.existing(this);

// }

// Player.prototype = Object.create(Phaser.Sprite.prototype);
// Player.prototype.constructor = Player;

// Player.prototype.update = function() {
// 	this.x = Math_cos(this.angle) * this.movementSpeeds[curMoveSpeed];
// 	this.y = Math_sin(this.angle) * this.movementSpeeds[curMoveSpeed];
// }