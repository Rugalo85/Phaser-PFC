var pushedStart = false;

function fadeInside() {
    
}



var bootState = {
    preload: function () {
        //loading bar sprite
        game.load.image('progressBar1', 'assets/sprites/progressbar1.png');
        game.load.image('progressBar2', 'assets/sprites/progressbar2.png');
    },

    create: function() {
        //physics system start
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //keep running even the focus is lost
        game.stage.disableVisibilityChange = true;

        //fullscreen everytime
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //screen bounderies
        game.world.setBounds(0, 0, 1280, 720);

        //background colour
        game.stage.backgroundColor = '#ffffff';

        //second state load, LOAD
        game.state.start('load');
    }
};