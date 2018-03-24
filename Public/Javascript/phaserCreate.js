//jshint unused:false
/*global Player:false*/
var player;

function create() {
	"use strict";
	player = new Player(game, 0, 0);
	cursors = game.input.keyboard.createCursorKeys();

}