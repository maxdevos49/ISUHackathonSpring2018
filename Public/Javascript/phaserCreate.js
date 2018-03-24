//jshint unused:false
/*global Player:false, game:false, userId, Phaser:false, id:false, joinGame:false*/
var player;
var otherPlayers = [];
var stand;
var walkDown;
var walkUp;
var walkLeft;
var walkRight;
var cursors;
var map;
var layer;

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

	cursors = game.input.keyboard.createCursorKeys();
	joinGame();

}