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
	player = new Player(game, "default", userId, 0, 0);

	stand = player.animations.add('stand',[0], 0, true);
	walkDown = player.animations.add('walkDown',[0,1], 0, true);
	walkUp = player.animations.add('walkUp',[2,3], 0, true);
	walkLeft = player.animations.add('walkLeft',[6,7], 0, true);
	walkRight = player.animations.add('walkRight',[4,5], 0, true);
	//player.animations.play('walk', [0],0, true);


	cursors = game.input.keyboard.createCursorKeys();

}