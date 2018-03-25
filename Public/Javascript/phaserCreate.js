//jshint unused:false
/*global Player:false, game:false, userId, Phaser:false, id:false, joinGame:false,myUsername: false, connectedCount:false, console:false,obstacleData:false, mapData:false*/
var player;
var otherPlayers = [];
var allSprites = [];
var stand;
var walkDown;
var walkUp;
var walkLeft;
var walkRight;
var cursorKeys;
var spaceKeyStroke;
var wKey;
var aKey;
var sKey;
var dKey;
var shiftKey;
var map;
var layer;
var pad1;
var bmpText;
var usernameTxtBox;
var healthBar;
var staminaBar;
var serverStatus;
var OnlineUsersTxt;
var hud;
var graves = [];
var floor;
var healthImg;
var staminaImg;
var deathBar;
var obstacles;
var type;

function create() {
	"use strict";

    game.cache.addTilemap('dynamicMap', null, mapData, Phaser.Tilemap.CSV);

    map = game.add.tilemap('dynamicMap', 20, 20);

    map.addTilesetImage('tiles', 'tiles', 20, 20);

    layer = map.createLayer(0);
    layer.scale.set(1.40);
    layer.resizeWorld();
    //layer.debug = true;

    for (let i = 0; i < 100; i++){

    	console.log(obstacleData[i].x);

    	if(obstacleData[i].type === 0){
    		type = "Boulder";
    	}else if(obstacleData[i].type === 1){
    		type = "Bush";
    	}else if(obstacleData[i].type === 2){
    		type = "PineTree";
    	}else if(obstacleData[i].type === 3){
     		type = "OakTree";

    	}

    	obstacles = game.add.sprite(obstacleData[i].x,obstacleData[i].y,type);
    	obstacles.scale.set(2,2);
    	game.world.bringToTop(obstacles);

    	//layer.addChild(obstacles);
    }


    //map.setCollision(4);

	game.physics.startSystem(Phaser.Physics.ARCADE);

	player = new Player(game, true, myUsername, id, 400, 300);
	bmpText = game.add.bitmapText(0, -25, 'carrier_command',myUsername,5);
	bmpText.anchor.x = 0.5;
	player.addChild(bmpText);

	player.body.collideWorldBounds = true;

	allSprites.push(player);
	game.physics.enable([player], Phaser.Physics.ARCADE);
	game.camera.follow(player);
	//player.animations.play('walk', [0],0, true);

	//game.physics.startSystem(Phaser.Physics.BOX2D);

	cursorKeys = game.input.keyboard.createCursorKeys();
	spaceKeyStroke = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
	dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
	shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

	game.input.gamepad.start();
    pad1 = game.input.gamepad.pad1;

	//Checks if controller is supported, active, and connected
	// if (game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad1.connected) {
	// 	controllerConnected = true;
	// } else {
	// 	controllerConnected = false;
	// }

	hud = game.add.group();


		//add health bar, online users, and UserName
	usernameTxtBox = game.add.bitmapText(0, 0, 'carrier_command',"Username: " +  myUsername,10);
	healthBar = game.add.bitmapText(0, 15, 'carrier_command',"Health: ", 10);
	staminaBar = game.add.bitmapText(0, 30, 'carrier_command', "Stamina: ", 10);
	deathBar = game.add.bitmapText(0, 45, 'carrier_command', "Deaths: ", 10);

	serverStatus = game.add.bitmapText(550,0,'carrier_command', "serverStatus: ",10);
	OnlineUsersTxt = game.add.bitmapText(550,15, 'carrier_command', "Players: " + connectedCount, 10);

	healthImg = game.add.image(90, 0, 'health');
	healthImg.width = 200;
	healthImg.height = 10;

	staminaImg = game.add.image(90, 0, 'stamina');
	staminaImg.width = 200;
	staminaImg.height = 10;

	healthBar.addChild(healthImg);
	staminaBar.addChild(staminaImg);

	hud.add(usernameTxtBox);
	hud.add(deathBar);
	hud.add(healthBar);
	hud.add(staminaBar);
	hud.add(serverStatus);
	hud.add(OnlineUsersTxt);

	hud.fixedToCamera = true;


	//var splashscreen = game.add.sprite(0,0,'bricks');


	joinGame();

}
