var menuState = {

    create: function() {
        //variable titulo
        var gameTitle = game.add.text(80,80, 'Test Game', {font: '50px Arial', fill: '#ffffff'});

        var gameStart = game.add.text(80, game.world.height-80, 'Press W key to start', {font: '25px Arial', fill: '#ffffff'});

        //variable con la tecla W, al presionarla inicia el juego
        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.start, this);
    },

    start: function() {
        //cargamos el tercer state, GAME
        game.state.start('game');
    }

}
