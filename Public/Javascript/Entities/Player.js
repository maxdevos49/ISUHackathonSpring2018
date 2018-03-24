Player = function(game, playerName, playerId, initialX, initialY) {
	Phaser.Sprite.call(this, game, initialX, initialY, 'player');

	this.scale.setTo(1.5, 1.5)

	this.playerName = playerName;
	this.playerId = playerId;
	this.direction = "up";
	this.moving = false;
	this.curMoveSpeed = "normal";
	this.movementSpeeds = {
		"normal":4,
		"sprint":6,
		"crawl":2
	}
	this.hasChanged = false;
	game.add.existing(this);

	this.animations.add('stand',[0], 0, true);
	this.animations.add('walkDown',[0,1], 0, true);
	this.animations.add('walkUp',[2,3], 0, true);
	this.animations.add('walkLeft',[6,7], 0, true);
	this.animations.add('walkRight',[4,5], 0, true);


}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
	
	if (this.moving) {
		switch (this.direction) {
			case "left":
				this.x -= this.movementSpeeds[this.curMoveSpeed];
				this.animations.play('walkLeft',8, false);
				break;
			case "right":
				this.x += this.movementSpeeds[this.curMoveSpeed];
				this.animations.play('walkRight',8, false);
				break;
			case "up":
				this.y -= this.movementSpeeds[this.curMoveSpeed];
				this.animations.play('walkUp',8, false);
				break;
			case "down":
				this.y += this.movementSpeeds[this.curMoveSpeed];
				this.animations.play('walkDown',8, false);
				break;
		} 
	} else {
		switch (this.direction) {
			case "left":
			this.animations.play('walkLeft', 100, false);
			this.animations.stop(null, true);
			this.animations.frame = 6;
			break;
			case "right":
			this.animations.play('walkRight', 100, false);
			this.animations.stop(null, true);
			this.animations.frame = 4;
			break;
			case "up":
			this.animations.play('walkUp', 100, false);
			this.animations.stop(null, true);
			this.animations.frame = 2;
			break;
			case "down":
			this.animations.play('walkDown', 100, false);
			this.animations.stop(null, true);
			this.animations.frame = 0;
			break;
		}
	}
}

Player.prototype.getData = function() {
	return {
		"x" : this.x,
		"y" : this.y,
		"playerName" : this.playerName,
		"playerId" : this.playerId,
		"direction" : this.direction,
		"moving" : this.moving,
		"curMoveSpeed" : this.curMoveSpeed
	}
}

Player.prototype.unpackData = function(data) {
	this.x = data.x;
	this.y = data.y;
	this.playerName = data.playerName;
	this.playerId = data.playerId;
	this.direction = data.direction;
	this.moving = data.moving;
	this.curMoveSpeed = data.curMoveSpeed;
}