var bootState = {
    preload: function () {
        // Load the image
        game.load.image('progressBar', 'assets/sprites/progressbar-test.png');
    },

    create: function() {
        //arrancamos sistema de fisicas
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //pantalla completa en todo momento
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //limites de la pantalla
        game.world.setBounds(0, 0, 1280, 720);

        // Set some game settings
        game.stage.backgroundColor = '#3498db';

        // Start the load state
        game.state.start('load');
    }
};
