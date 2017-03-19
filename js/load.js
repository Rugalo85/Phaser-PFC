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

    },

    create: function() {
        //arrancamos sistema de fisicas
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //pantalla completa en todo momento
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //limites de la pantalla
        game.world.setBounds(0, 0, 1280, 720);

        //cargamos el segundo state, MENU
        game.state.start('menu');
    }


}
