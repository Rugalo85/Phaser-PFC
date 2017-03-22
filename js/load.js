var loadState = {

    preload: function() {
        //texto de carga
        var loadingBar = game.add.text(80,150, 'loading...', {font: '30px Courier', fill: '#ffffff'});

        //carga de fondo
        game.load.image('space-test', 'assets/backgrounds/space-test.gif');

        //carga de nave
        game.load.image('ship-test', 'assets/sprites/ship-test.png');

        //carga de item
        game.load.image('points-test', 'assets/sprites/item-test.png');

        //carga de enemigo
        game.load.image('enemy-test', 'assets/sprites/enemy-test.png');
    },

    create: function() {
        //cargamos el segundo state, MENU
        game.state.start('menu');
    }


}
