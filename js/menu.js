var menuState = {

    create: function() {
        //creación del fondo de menu
        game.add.image(0, 0, 'main-menu-back');

        //creacion del tema de menu
        music = game.add.audio('mainMenuMusic');
        music.loop = true;
        music.play();

        //creación del titulo
        var gameTitle = game.add.text(game.width/2, 80, 'Zephyrus Project', {font: '50px Arial', fill: '#ffffff'});
        gameTitle.anchor.setTo(0.5, 0.5);

        //creación de la forma de iniciar el juego
        var gameStart = game.add.text(80, game.world.height-80, 'Press the SPACE BAR to start', {font: '25px Arial', fill: '#ffffff'});

        //variable con la tecla W, al presionarla inicia el juego
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.addOnce(this.start, this);
    },

    start: function() {
        //cargamos el tercer state, GAME
        game.state.start('game');
        music.stop();
    }
}
