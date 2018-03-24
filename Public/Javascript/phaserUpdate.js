function phaserUpdate() {
	// Controls for player
	var movement_X = 0;
	var movement_Y = 0;
	if (cursors.left.isDown) { xMovement -= 1; }
	if (cursors.right.isDown) { xMovement += 1; }
	if (cursors.up.isDown) { yMovement += 1; }
	if (cursors.down.isDown) { yMovement -= 1; }
	player.angle = Math.atan2(movement_Y, movement_X) * (180 / Math.PI);

}