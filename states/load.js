var loadState = {

    preload: function() {
        //loading text
        var loadingBar = game.add.text(80,150, 'Loading...', {font: '30px Courier', fill: '#ffffff'});
        loadingBar.anchor.setTo(0.5, 0.5);

        //loading bar
        var progressBar = game.add.sprite(game.width/2, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);

        //background images
        game.load.image('parallaxMenu01', '../assets/backgrounds/parallaxMenu01.png');
        game.load.image('parallaxMenu02', '../assets/backgrounds/parallaxMenu02.png');
        game.load.image('parallaxMenu03', '../assets/backgrounds/parallaxMenu03.png');
        game.load.image('main-menu-back', '../assets/backgrounds/main-menu.png');
        game.load.image('stage-back', '../assets/backgrounds/stage-back.gif');

        //sprites-logos
        game.load.image('ceedcv-logo', '../assets/sprites/ceedcv.png');
        game.load.image('ruben-logo', '../assets/sprites/ruben-logo.png');
        game.load.image('player', '../assets/sprites/player.png');
        game.load.image('item01', '../assets/sprites/item01.png');
        game.load.image('enemy01', '../assets/sprites/enemy01.png');

        //sound effects
        game.load.audio('1up', '../assets/sfx/1up.wav');
        game.load.audio('coin', '../assets/sfx/coin.wav');
        game.load.audio('shoot', '../assets/sfx/shoot.wav');

        //music
        game.load.audio('splashScreenTheme', ['../assets/music/intro.ogg', '../assets/music/intro.mp3']);

    },

    create: function() {
        //third state load, SPLASH
        game.state.start('splash');
    }


}
