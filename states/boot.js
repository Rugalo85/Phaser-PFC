var bootState = {
    preload: function () {
        //loading bar sprite
        game.load.image('progressBar', 'assets/sprites/progressbar.png');
    },

    create: function() {
        //physics system start
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //fullscreen everytime
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //screen bounderies
        game.world.setBounds(0, 0, 1280, 720);

        //background colour
        game.stage.backgroundColor = '#3498db';

        //second state load, LOAD
        game.state.start('load');
    }
};
