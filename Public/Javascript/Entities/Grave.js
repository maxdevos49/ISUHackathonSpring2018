Grave = function(game, xPos, yPos) {

	Phaser.Sprite.call(this, game, xPos, yPos, 'grave');
	game.physics.enable([this], Phaser.Physics.ARCADE);

	this.xPos = xPos;
	this.yPos = yPos;
	this.body.immovable = true;
	this.scale.setTo(2.5, 2.5);

	game.add.existing(this);		

}

Grave.prototype = Object.create(Phaser.Sprite.prototype);
Grave.prototype.constructor = Grave;

Grave.prototype.update = function() {
	game.physics.arcade.collide(player, this);
	for (var i = 0; i < otherPlayers.length; i++) {
		game.physics.arcade.collide(otherPlayers[i], this);
	}
}

Grave.prototype.getData = function() {
	return {
		"xPos":this.xPos,
		"yPos":this.yPos
	}
}

Grave.prototype.unpackData = function(data) {
	this.xPos = data.xPos;
	this.yPos = data.yPos;
}