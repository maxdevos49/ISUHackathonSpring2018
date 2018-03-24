//jshint unused:false
/*global Player:false, game:false, userId, Phaser:false, id:false, joinGame:false*/
var player;
var otherPlayers = [];
var stand;
var walkDown;
var walkUp;
var walkLeft;
var walkRight;
var cursorKeys;
var spaceKeyStroke;
var map;
var layer;
var pad1;
// var controllerConnected;

function create() {
	"use strict";

	var mapData = '';

	for (var y = 0; y < 128; y++)
    {
        for (var x = 0; x < 128; x++)
        {
            mapData += '0';

            if (x < 127)
            {
                mapData += ',';
            }
        }

        if (y < 127)
        {
            mapData += "\n";
        }
    }

    game.cache.addTilemap('dynamicMap', null, mapData, Phaser.Tilemap.CSV);

    map = game.add.tilemap('dynamicMap', 20, 20);

    map.addTilesetImage('tiles', 'tiles', 20, 20);

    layer = map.createLayer(0);

    layer.resizeWorld();

    map.setCollisionBetween(54, 83);

	game.physics.startSystem(Phaser.Physics.ARCADE);

	player = new Player(game, true, myUsername, id, 400, 300);
	game.physics.enable([player], Phaser.Physics.ARCADE);
	game.camera.follow(player);
	//player.animations.play('walk', [0],0, true);

	//game.physics.startSystem(Phaser.Physics.BOX2D);

	cursorKeys = game.input.keyboard.createCursorKeys();
	spaceKeyStroke = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	game.input.gamepad.start();
    pad1 = game.input.gamepad.pad1;

	//Checks if controller is supported, active, and connected
	// if (game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad1.connected) {
	// 	controllerConnected = true;
	// } else {
	// 	controllerConnected = false;
	// }


	joinGame();

}
