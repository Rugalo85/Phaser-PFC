//GLOBAL VARIABLES
//player variables
var playerLives = 5;
var speed = 8;
var gainLives = 1000;
//options variables
var pushedStart = false;
var multiPlayer = false;
//--

//GLOBAL FUNCTIONS
//go to another state
function fadeOutState(fadeScreen, state, music) {
        game.time.events.add(500, function() {
            game.add.tween(fadeScreen).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
            music.fadeOut(1250);
        }, this);

        game.time.events.add(2500, function() {
            game.state.start(state);
        }, this);
}

//arrive to a new state
function fadeInState(fadeScreen, music) {
    game.input.enabled = true;
    game.add.tween(fadeScreen).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
    game.time.events.add(1250, function() {
        music.fadeIn(3000);
        }, this);
}

//MENUS
function blinkingText(text) {
    game.time.events.add(0, function() {
        timer = game.time.create(false);	
        timer.loop(150, function() {
            if (text.exists) {
                text.kill();
            } else {
                text.revive();	
            }}, this);
        timer.start();
    }, this);
}

//01 - Keyboard
//disable all keys
function disableKeys() {
    game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    game.input.keyboard.removeKey(Phaser.Keyboard.S);
    game.input.keyboard.removeKey(Phaser.Keyboard.W);
}

//02 - Mouse




//--


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