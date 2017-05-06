//GLOBAL VARIABLES
//player variables
var player01Lives = 5;
var player02Lives = 5;
var speed01 = 8;
var speed02 = 8;
var gainLives = 1000;

//music variables
var splashMusic;

//option variables
var pushedStart = false;
var multiPlayer = false;

//parallax variables
var parallax01;
var parallax02;
var parallax03;

//----------------------------------------//

//GLOBAL FUNCTIONS
//go to another state (fade out effect)
function fadeOutState(fadeScreen, state, music) {
        game.time.events.add(500, function() {
            game.add.tween(fadeScreen).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
            music.fadeOut(1250);
        }, this);

        game.time.events.add(2500, function() {
            game.state.start(state);
        }, this);
}

//arrive to a new state (fade in effect)
function fadeInState(fadeScreen, music) {
    game.input.enabled = true;
    game.add.tween(fadeScreen).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
    game.time.events.add(1250, function() {
        music.fadeIn(3000);
        }, this);
}

//add the parallax background
function addParallax(screen01, screen03, screen02) {
    parallax01 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage(screen01).height,
        this.game.width,
        this.game.cache.getImage(screen01).height,
        screen01);
    parallax03 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage(screen03).height,
        this.game.width,
        this.game.cache.getImage(screen03).height,
        screen03);
    parallax02 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage(screen02).height - 100,
        this.game.width,
        this.game.cache.getImage(screen02).height,
        screen02);
}

//blinking text in menus
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

//disable all keys
function disableKeys() {
    game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    game.input.keyboard.removeKey(Phaser.Keyboard.S);
    game.input.keyboard.removeKey(Phaser.Keyboard.W);
}

//----------------------------------------//

//BOOT STATE
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