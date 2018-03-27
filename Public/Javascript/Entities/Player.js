/*global Phaser:false, Player:false*/
Player = function(game, isAlly, playerName, playerId, initialX, initialY) {
	"use strict";
	Phaser.Sprite.call(this, game, initialX, initialY, ((isAlly) ? 'player-ally' : 'player-enemy'));
	game.physics.enable([this], Phaser.Physics.ARCADE);
	this.enableBody = true;

	this.scale.setTo(2, 2);
	this.anchor.setTo(0.5,0.5);

	this.isAlly = isAlly;
	this.playerName = playerName;
	this.playerId = playerId;
	this.direction = "up";
	this.moving = false;
	this.curMoveSpeed = "normal";
	this.movementSpeeds = {
		"normal":150,
		"sprint":260
	};

	var playerNametag;
	playerNametag = game.add.bitmapText(0, -25, 'carrier_command', playerName ,5);
 	playerNametag.anchor.x = 0.5;
 	this.addChild(playerNametag);

	this.health = 100;
	this.stamina = 100;
	this.requiredStaminaToStartRunning = 0;
	this.deaths = 0;

	this.isStabbing = false;
	this.isInCooldown = false;
	this.stabTimer = 0;
	this.cooldownTimer = 0;
	this.stabCooldown = 30;
	this.stabDuration = 25;

	this.hasBeenStabbed = false;
	this.knockbackDirection = "up";
	this.knockbackForce = 0;
	this.recoveryForce = 30;

	this.deathMessage = game.add.bitmapText(0, 0, 'carrier_command', "Wasted" , 35);
	this.deathMessage.tint = 0xff0000;
   	this.deathMessage.anchor.x = 0.5;
   	this.addChild(this.deathMessage);
   	this.deathMessage.visible = false;

   	this.deathMessageTime = 200;
   	this.curDeathTime = 0;

	game.add.existing(this);

	this.sword = game.add.sprite(0, 0, "sword");
	game.physics.enable([this.sword], Phaser.Physics.ARCADE);
	this.sword.anchor.setTo(0.5, 0.5);
	this.sword.enableBody = true;

	this.sword.damage = 20;
	this.sword.knockbackForce = 800;

	this.animations.add('walkDown',['down1', 'down2'], 0, true);
	this.animations.add('walkUp', ['up1', 'up2'], 0, true);
	this.animations.add('walkLeft', ['left1', 'left2'], 0, true);
	this.animations.add('walkRight', ['right1', 'right2'], 0, true);
	this.animations.add('stabUp', ['up1', 'stabUp', 'up1', 'stabUp', 'up1'], 0, true);
	this.animations.add('stabDown', ['down1', 'stabDown', 'down1', 'stabkdown'], 'down1', 0, true);
	this.animations.add('stabRight', ['right1', 'stabRight', 'right1', 'stabRight'], 'right1', 0, true);
	this.animations.add('stabLeft', ['left1', 'stabLeft', 'left1', 'stabLeft', 'left1'], 0, true);

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.stab = function() {
	"use strict";
	if (!this.isInCooldown && !this.isStabbing) {
		this.isStabbing = true;
	}
};

Player.prototype.setPace = function(sprint) {
	"use strict";
	if (sprint && this.stamina > this.requiredStaminaToStartRunning) {
		this.curMoveSpeed = "sprint";
		//x.play('sprinting');
	} else {
		this.curMoveSpeed = "normal";
		//fx.play('walking');
	}
};

Player.prototype.isDead = function() {
	"use strict";
	return this.health <= 0;
};

Player.prototype.onHit = function(weapon, attackerId) {
	"use strict";
	console.log("Ouch");

	if (!this.hasBeenStabbed) {

		this.health -= weapon.damage;

		if (this.isDead()) {
			// Give player points!
			playerDeath();

		}

		this.hasBeenStabbed = true;
		this.knockbackForce = weapon.knockbackForce;

		// Find direction from of sword from player
		var dx = weapon.x - this.x;
		var dy = weapon.y = this.y;
		var angle = Math.atan2(dy, dx);
		if (angle > 45 && angle <= 135) {
			this.knockbackDirection = "up";
		} else if (angle > 135 && angle <= 225) {
			this.knockbackDirection = "left";
		} else if (angle > 225 && angle <= 315) {
			this.knockbackDirection = "down";
		} else {
			this.knockbackDirection = "right";
		}

	}

};

Player.prototype.update = function() {
	"use strict";

	this.sword.x = this.x;
	this.sword.y = this.y;

	// Don't allow any other inputs if you are being knocked back
	if (this.hasBeenStabbed) {
		switch (this.knockbackDirection) {
			case "up":
				this.body.velocity.y = this.knockbackForce;
				break;
			case "left":
				this.body.velocity.x = -this.knockbackForce;
				break;
			case "down":
				this.body.velocity.y = this.knockbackForce;
				break;
			case "right":
				this.body.velocity.x = this.knockbackForce;
				break;
		}

		this.knockbackForce -= this.recoveryForce;
		if (this.knockbackForce < 0) {
			this.hasBeenStabbed = false;
		}

	} else {

	if (this.curMoveSpeed == "sprint" && this.stamina > 0) {
		console.log(this.stamina);
	} else if (this.curMoveSpeed == "sprint") {
		this.curMoveSpeed = "normal";
	}

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

	if (this.isStabbing) {
		switch (this.direction) {
			case "left":
				this.sword.body.setSize(-40,-10, 0, 11);
				break;
			case "right":
				this.sword.body.setSize(40,10, 0, 8);
				break;
			case "up":
				this.sword.body.setSize(10,-40, -14,-20);
				break;
			case "down":
				this.sword.body.setSize(10,40, 6,20);
				break;
		}
	}

	if (this.isStabbing) {
		this.body.setSize(0,0,0,0);
	} else if (this.direction == "left" || this.direction == "right") {
		this.body.setSize(13, 31, 2, 4);
	} else {
		this.body.setSize(21, 31, 5, 4);
	}

	if (this.moving && !this.isStabbing) {
		switch (this.direction) {
			case "left":
				this.body.velocity.x = -this.movementSpeeds[this.curMoveSpeed];
				this.body.velocity.y = 0;
				this.animations.play('walkLeft',8, false);
				break;
			case "right":
				this.body.velocity.x = this.movementSpeeds[this.curMoveSpeed];
				this.body.velocity.y = 0;
				this.animations.play('walkRight',8, false);
				break;
			case "up":
				this.body.velocity.y = -this.movementSpeeds[this.curMoveSpeed];
				this.body.velocity.x = 0;
				this.animations.play('walkUp',8, false);
				break;
			case "down":
				this.body.velocity.y = this.movementSpeeds[this.curMoveSpeed];
				this.body.velocity.x = 0;
				this.animations.play('walkDown',8, false);
				break;
		}
	} else {
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
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
};

Player.prototype.getData = function() {
	"use strict";
	return {
		"x" : this.x,
		"y" : this.y,
		"playerName" : this.playerName,
		"playerId" : this.playerId,
		"direction" : this.direction,
		"moving" : this.moving,
		"curMoveSpeed" : this.curMoveSpeed,
		"isStabbing" : this.isStabbing,
		"hasBeenStabbed" : this.hasBeenStabbed,
		"health" : this.health
	};
};

Player.prototype.unpackData = function(data) {
	"use strict";
	this.x = data.x;
	this.y = data.y;
	this.playerName = data.playerName;
	this.playerId = data.playerId;
	this.direction = data.direction;
	this.moving = data.moving;
	this.curMoveSpeed = data.curMoveSpeed;
	if (data.isStabbing) {
		this.stab();
	}
	this.hasBeenStabbed = data.hasBeenStabbed;
	this.health = data.health;
};
