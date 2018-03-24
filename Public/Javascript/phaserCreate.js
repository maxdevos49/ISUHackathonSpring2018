//jshint unused:false
/*global Player:false, game:false, userId*/
var player;
var otherPlayers = [];
var stand;
var walkDown;
var walkUp;
var walkLeft;
var walkRight;
var cursors;

function create() {
	"use strict";
	player = new Player(game, true, "default", id, 0, 0);

	//player.animations.play('walk', [0],0, true);

	//game.physics.startSystem(Phaser.Physics.BOX2D);

	cursors = game.input.keyboard.createCursorKeys();
	joinGame();

}