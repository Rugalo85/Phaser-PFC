//LOAD STATE
var loadState = {

    preload: function() {
        //loading text
        var loadingText = game.add.text(game.width/2, 300, 'Loading, please wait...', {font: '20px PrStart', fill: '#000000'});
        loadingText.anchor.setTo(0, 0);

        //loading bar
        var progressBar2 = game.add.sprite(game.width/2, game.height/2, 'progressBar2');
        progressBar2.anchor.setTo(0, 0);
        var progressBar1 = game.add.sprite(game.width/2, game.height/2, 'progressBar1');
        progressBar1.anchor.setTo(0, 0);
        game.load.setPreloadSprite(progressBar2, 0);

        var progressDisplay = 0;
        var ready = false;

        //event to fill the progress bar
        var timerEvt = game.time.events.loop(100, function (){
            if(progressDisplay < 100){
                if(progressDisplay < game.load.progress){
                    loadingText.text = 'Loading, please wait...'+(++progressDisplay)+'%';
                }
            } else {
                game.time.events.remove(timerEvt);
            }
        }, this);

        //background images
        game.load.image('parallaxMenu01', './assets/backgrounds/parallaxMenu01.png');
        game.load.image('parallaxMenu02', '../assets/backgrounds/parallaxMenu02.png');
        game.load.image('parallaxMenu03', './assets/backgrounds/parallaxMenu03.png');
        game.load.image('parallaxOptions01', './assets/backgrounds/parallaxOptions01.png');
        game.load.image('parallaxOptions02', '../assets/backgrounds/parallaxOptions02.png');
        game.load.image('parallaxOptions03', './assets/backgrounds/parallaxOptions03.png');
        game.load.image('parallaxCredits01', './assets/backgrounds/parallaxCredits01.png');
        game.load.image('parallaxCredits02', '../assets/backgrounds/parallaxCredits02.png');
        game.load.image('parallaxCredits03', './assets/backgrounds/parallaxCredits03.png');
        game.load.image('fadeScreen', './assets/backgrounds/fadeToBlack.jpg');
        
        //sprites-logos
        game.load.image('powered-logo', './assets/sprites/powered-logo.png');
        game.load.image('ruben-logo', './assets/sprites/ruben-logo.png');
        game.load.image('mute-button', './assets/sprites/mute.png');
        game.load.image('player01', './assets/sprites/player1.png');
        game.load.image('player02', './assets/sprites/player2.png');
        game.load.image('item01', './assets/sprites/item01.png');
        game.load.image('bullet01', './assets/sprites/bullet.png');
        game.load.image('bullet02', './assets/sprites/bullet.png');
        game.load.image('arrow', './assets/sprites/arrow.png');
        game.load.image('heart', './assets/sprites/heart.png');
        
        //enemies
        game.load.image('enemy01', './assets/sprites/enemy01.png');
        game.load.image('enemy02', './assets/sprites/enemy02.png');
        game.load.image('enemy03', './assets/sprites/enemy03.png');
        game.load.image('enemyBullet', './assets/sprites/enemyBullet.png');
        
        //spritesheets
        game.load.spritesheet('ruben', './assets/spritesheets/ruben-spritesheet.png', 375, 375);
        game.load.atlasJSONHash('trail', './assets/spritesheets/trail.png', './assets/spritesheets/trail.json');

        //sound effects
        game.load.audio('1up', './assets/sfx/1up.wav');
        game.load.audio('pause', './assets/sfx/pause.wav');
        game.load.audio('coin', './assets/sfx/coin.wav');
        game.load.audio('shoot', './assets/sfx/shoot.wav');
        game.load.audio('player_explosion', ['./assets/sfx/player_explosion.ogg', './assets/sfx/player_explosion.mp3']);
        game.load.audio('enemy_explosion', ['./assets/sfx/enemy_explosion.ogg', './assets/sfx/enemy_explosion.mp3']);
        game.load.audio('select', ['./assets/sfx/select.ogg', './assets/sfx/select.mp3']);
        game.load.audio('selected', ['./assets/sfx/selected.ogg', './assets/sfx/selected.mp3']);
        
        
        //music
        game.load.audio('splashScreenTheme', ['./assets/music/Intro.ogg', './assets/music/Intro.mp3']);
        game.load.audio('creditsTheme', ['./assets/music/Credits.ogg', './assets/music/Credits.mp3']);
        //jsons
        game.load.json('credits', './assets/json/credits.json');
    },

    create: function() {
        splashMusic = game.add.audio('splashScreenTheme');
        splashMusic.allowMultiple = true;
        
        game.state.start('splash');
    }
}
