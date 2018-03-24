//jshint unused:false
/*global Player:false*/
var player;
var otherPlayers = [];

function create() {
	"use strict";
	player = new Player(game, "default", userId, 0, 0);
	cursors = game.input.keyboard.createCursorKeys();

}