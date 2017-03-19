//Variable game que contiene el canvas donde se despliega el juego
var game = new Phaser.Game(1280, 720, Phaser.AUTO, '');

//Adición de los diferentes states
game.state.add('load', loadState);
//game.state.add('logo', logoState);
game.state.add('menu', menuState);
game.state.add('game', gameState);
//game.state.add('gameover', gameoverState);

//cargamos el primer state, LOAD
game.state.start('load');
