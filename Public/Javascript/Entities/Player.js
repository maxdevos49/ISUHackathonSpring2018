//linter settings
/*global console:false, global Phaser:false*/
//jshint unused:false

class Player {
	constructor(game, initialX, initialY) {
		Phaser.Sprite.call(this, game, initialX, initialY);

		this.anchor.setTo(0.5, 0.5);

		this.angle = 0;
		this.moving = false;
		this.curMoveSpeed = "normal";
		this.movementSpeeds = {
			"normal":10,
			"sprint":15,
			"crawl":7
		}

		game.add.existing(this);
		this.prototype = Object.create(Phaser.Sprite.prototype);
	}

	update() {
		this.x = Math.cos(this.angle) * this.movementSpeeds[this.curMoveSpeed];
		this.y = Math.sin(this.angle) * this.movementSpeeds[this.curMoveSpeed];
	}

	getData() {
		return {
			"x" : this.x,
			"y" : this.y,
			"angle" : this.angle,
			"moving" : moving,
			"curMoveSpeed" : curMoveSpeed
		}
	}

	unpackData(data) {
		this.x = data.x;
		this.y = data.y;
		this.angle = data.angle;
		this.moving = data.moving;
		this.curMoveSpeed = data.curMoveSpeed;
	}

}