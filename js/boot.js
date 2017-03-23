var bootState = {
    preload: function () {
        //carga de barra de cargado
        game.load.image('progressBar', 'assets/sprites/progressbar.png');
    },

    create: function() {
        //arrancamos sistema de fisicas
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //pantalla completa en todo momento
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //limites de la pantalla
        game.world.setBounds(0, 0, 1280, 720);

        //color de fondo de pantalla
        game.stage.backgroundColor = '#3498db';

        //cargamos el primer state, LOAD
        game.state.start('load');
    }
};
