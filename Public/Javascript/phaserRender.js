function render() {
	//game.debug.inputInfo(16,16);
	game.debug.body(player);
	for (var i = 0; i < allSprites.length; i++) {
		game.debug.body(allSprites[i].sword);
	}

}