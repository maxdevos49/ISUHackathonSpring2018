/*global game:false */
//jshint unused:false

function preload() {
	"use strict";

	//game.load.spritesheet('player-ally', 'Images/WalkingSpriteSheet.png', 31, 37, 8);
	game.load.atlas('player-ally', "Images/AllyPlayerSpriteSheet.png",  'Images/AllyPlayerSpriteSheetAtlas.json');
	game.load.spritesheet('player-enemy', 'Images/WalkingSpriteSheetP2.png', 31, 37, 8);
	game.load.image('tiles', 'Images/tiletest.png');

}