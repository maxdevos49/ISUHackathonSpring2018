function render() {
	game.debug.inputInfo(16,16);
	game.debug.body(player);
	game.debug.body(player.sword);
	for (var i = 0; otherPlayers.length; i++) {
		game.debug.body(otherPlayers[i]);
	}

}