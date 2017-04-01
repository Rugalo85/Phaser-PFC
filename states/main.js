//variable where the canvas of the game is stored
var game = new Phaser.Game(1280, 720, Phaser.AUTO, '');

//addition of the game states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('splash', splashState);
game.state.add('menu', menuState);
game.state.add('game', gameState);
game.state.add('options', optionState);
game.state.add('credits', creditState);
//game.state.add('gameover', gameoverState);

//first state load, BOOT
game.state.start('boot');
