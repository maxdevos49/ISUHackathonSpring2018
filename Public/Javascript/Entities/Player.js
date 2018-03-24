Player = function(game, initialX, initialY) {
	Phaser.Sprite.call(this, game, initialX, initialY, 'player');

	this.direction = "up";
	this.moving = false;
	this.curMoveSpeed = "normal";
	this.movementSpeeds = {
		"normal":10,
		"sprint":15,
		"crawl":7
	}
	game.add.existing(this);

}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
	
}

Player.prototype.getData = function() {
	return {
		"x" : this.x,
		"y" : this.y,
		"direction" : this.direction,
		"moving" : moving,
		"curMoveSpeed" : curMoveSpeed
	}
}

Player.prototype.unpackData = function(data) {
	this.x = data.x;
	this.y = data.y;
	this.direction = data.direction;
	this.moving = data.moving;
	this.curMoveSpeed = data.curMoveSpeed;
}