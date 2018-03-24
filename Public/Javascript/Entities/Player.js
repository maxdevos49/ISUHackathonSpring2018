Player = function(game, isAlly, playerName, playerId, initialX, initialY) {
	Phaser.Sprite.call(this, game, initialX, initialY, ((isAlly) ? 'player-ally' : 'player-ally'));

	this.scale.setTo(1.5, 1.5);
	this.anchor.setTo(.5,.5);

	this.isAlly = isAlly;
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

	this.isStabbing = false;
	this.isInCooldown = false;
	this.stabTimer = 0;
	this.cooldownTimer = 0;
	this.stabCooldown = 30;
	this.stabDuration = 25;

	game.add.existing(this);

	this.animations.add('walkDown',['down1', 'down2'], 0, true);
	this.animations.add('walkUp', ['up1', 'up2'], 0, true);
	this.animations.add('walkLeft', ['left1', 'left2'], 0, true);
	this.animations.add('walkRight', ['right1', 'right2'], 0, true);
	this.animations.add('stabUp', ['up1', 'stabUp', 'up1', 'stabUp', 'up1'], 0, true);
	this.animations.add('stabDown', ['down1', 'stabDown', 'down1', 'stabkdown'], 'down1', 0, true);
	this.animations.add('stabRight', ['right1', 'stabRight', 'right1', 'stabRight'], 'right1', 0, true);
	this.animations.add('stabLeft', ['left1', 'stabLeft', 'left1', 'stabLeft', 'left1'], 0, true);

}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.stab = function() {
	if (!this.isInCooldown && !this.isStabbing) {
		this.isStabbing = true;
	}
}

Player.prototype.update = function() {
	
	if (this.isStabbing) {
		this.stabTimer++;
		if (this.stabTimer >= this.stabDuration) {
			this.stabTimer = 0;
			this.isStabbing = false;
			this.isInCooldown = true;
		}
	} else if (this.isInCooldown) {
		this.cooldownTimer++;
		if (this.cooldownTimer >= this.stabCooldown) {
			this.cooldownTimer = 0;
			this.isInCooldown = false;
		}
	}

	if (this.moving && !this.isStabbing) {
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
				if (this.isStabbing) {
					this.animations.play("stabLeft", 12, false);
					this.stabbingAnimationStarted = true;
				} else {
					this.animations.play('walkLeft', 100, false);
					this.animations.stop(null, true);
					this.animations.frame = 6;
				}
				break;
			case "right":
				if (this.isStabbing) {
					this.animations.play("stabRight", 12, false);
					this.stabbingAnimationStarted = true;
				} else {
					this.animations.play('walkRight', 100, false);
					this.animations.stop(null, true);
					this.animations.frame = 4;
				}
				break;
			case "up":
				if (this.isStabbing) {
					this.animations.play("stabUp", 12, false);
					this.stabbingAnimationStarted = true;
				} else {
					this.animations.play('walkUp', 100, false);
					this.animations.stop(null, true);
					this.animations.frame = 2;
				}
				break;
			case "down":
				if (this.isStabbing) {
					this.animations.play("stabDown", 12, false);
					this.stabbingAnimationStarted = true;
				} else {
					this.animations.play('walkDown', 100, false);
					this.animations.stop(null, true);
					this.animations.frame = 0;
				}
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