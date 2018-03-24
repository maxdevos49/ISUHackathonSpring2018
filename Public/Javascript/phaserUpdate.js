function update() {
	// Controls for player
	var direction = "NONE";
	if (cursors.left.isDown) {direction = "left";}
	if (cursors.right.isDown) {direction = "right";}
	if (cursors.up.isDown) {direction = "up";}
	if (cursors.down.isDown) {direction = "down";}
	player.direction = direction;
	if (direction == "NONE") {
		player.moving = false;
	} else {
		player.moving = true;
	}

	

}