# ISUHackathonSpring2018
A 2-d multiplayer medival fighting game built in 36 hours
### Game Mechanics
- Upon loading the game a user can enter a custom name
- After hitting start you will be taken to the games map which is surrounded by an unpassable fence and scattered with obstacles such as trees and rocks
- Move with WASD and hit the space bar to swing your sword
- Pressing shift will make you sprint but you only have limited stamina
- If you get hit you will be knocked back and lose some health
- Picking up a stamina (green) or health (red) potion will recharge your player
- If you run out of health your player will die and a grave will forever (Until server restart that is) mark your location
### Running the Game
Run these commands to host a game on localhost:4200
```
npm install
npm serve
```
### Game Technologies
This game was written using the Phaser.io game engine in Javascript. It is backed by a Node.js server which handles the multiplayer game logic. This game is not considered complete but was developed until the HackISU time limit was reached.
