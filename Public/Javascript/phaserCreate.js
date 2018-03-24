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
var controller1;
var controllerConnected;

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

	player = new Player(game, true, "default", id, 0, 0);
	game.camera.follow(player);
	//player.animations.play('walk', [0],0, true);

	//game.physics.startSystem(Phaser.Physics.BOX2D);

	cursorKeys = game.input.keyboard.createCursorKeys();
	spaceKeyStroke = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	game.input.gamepad.start();

	// To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.gamepadX, where X = gamepad 1-4
    controller1 = game.input.gamepad.controller1;

	if (game.input.gamepad.supported && game.input.gamepad.active && controller1.connected) {
		controllerConnected = true;
	} else {
		controllerConnected = false;
	}


	joinGame();

}
