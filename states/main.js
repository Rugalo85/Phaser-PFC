/////////////////////
//---MAIN STATE ---//
/////////////////////

//Canvas element where the game is represented
var game = new Phaser.Game(1280, 720, Phaser.AUTO, '');

//Game states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('splash', splashState);
game.state.add('menu', menuState);
game.state.add('game', gameState);
game.state.add('credits', creditState);
game.state.add('scores', scoreState);

//1st BOOT STATE
game.state.start('boot');