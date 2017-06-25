/////////////////////
//--- LOAD STATE---//
/////////////////////

var loadState = {
    preload: function() {
        //Loading text
        var loadingText = game.add.text(game.width/2, 300, 'Loading, please wait...', {font: '20px PrStart', fill: '#000000'});
        loadingText.anchor.setTo(0.5, 0.5);

        //Loading bar
        var progressBar2 = game.add.sprite(game.width/2, game.height/2, 'progressBar2');
        progressBar2.anchor.setTo(0.5, 0.5);
        var progressBar1 = game.add.sprite(game.width/2, game.height/2, 'progressBar1');
        progressBar1.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar2, 0);

        var progressDisplay = 0;
        var ready = false;

        //Event to fill the progress bar
        var timerEvt = game.time.events.loop(100, function (){
            if(progressDisplay < 100){
                if(progressDisplay < game.load.progress){
                    loadingText.text = 'Loading, please wait...'+(++progressDisplay)+'%';
                }
            } else {
                game.time.events.remove(timerEvt);
            }
        }, this);

        //BACKGROUND IMAGES
        //Menu
        game.load.image('parallaxMenu01', './assets/backgrounds/parallaxMenu01.jpg');
        game.load.image('parallaxMenu02', './assets/backgrounds/parallaxMenu02.png');
        game.load.image('parallaxMenu03', './assets/backgrounds/parallaxMenu03.png');
        game.load.image('parallaxMenu04', './assets/backgrounds/parallaxMenu04.png');
        //Credits
        game.load.image('parallaxCredits01', './assets/backgrounds/parallaxCredits01.png');
        game.load.image('parallaxCredits02', './assets/backgrounds/parallaxCredits02.png');
        game.load.image('parallaxCredits03', './assets/backgrounds/parallaxCredits03.png');
        game.load.image('parallaxCredits04', './assets/backgrounds/parallaxCredits04.png');
        //Stage
        game.load.image('parallaxStage01', './assets/backgrounds/parallaxStage01.png');
        game.load.image('parallaxStage02', './assets/backgrounds/parallaxStage02.png');
        game.load.image('parallaxStage03', './assets/backgrounds/parallaxStage03.png');
        game.load.image('parallaxStage04', './assets/backgrounds/parallaxStage04.png');
        //Black screen
        game.load.image('fadeScreen', './assets/backgrounds/fadeToBlack.jpg');
        game.load.image('whiteScreen', './assets/backgrounds/fadeToWhite.jpg');

        //SPRITES-SPRITESHEETS
        //Intro
        game.load.image('powered-logo', './assets/sprites/powered-logo.png');
        game.load.image('ruben-logo', './assets/sprites/ruben-logo.png');
        game.load.spritesheet('ruben', './assets/spritesheets/ruben-spritesheet.png', 375, 375);

        //Titles
        game.load.image('mainMenuLogo', './assets/sprites/mainMenuLogo.png');
        game.load.image('creditsLogo', './assets/sprites/creditsLogo.png');
        game.load.image('pauseLogo', './assets/sprites/pauseLogo.png');
        game.load.image('scoresLogo', './assets/sprites/scoresLogo.png');

        //Buttons
        game.load.image('muteOn', './assets/sprites/muteButtonOn.png');
        game.load.image('muteOff', './assets/sprites/muteButtonOff.png');
        game.load.image('submitButton', './assets/sprites/submitButton.png');
        game.load.image('editorButton', './assets/sprites/editorButton.png');
        game.load.spritesheet('arrow', './assets/spritesheets/arrow.png', 42.1, 42);

        //Misc sprites
        game.load.image('heart', './assets/sprites/heart.png');
        game.load.image('moon', './assets/sprites/moon.png');
        game.load.image('bar', './assets/sprites/bar.png');

        //Items
        game.load.spritesheet('points', './assets/spritesheets/points.png', 39, 38);
        game.load.spritesheet('powerUp01', './assets/spritesheets/powerUp01.png', 62.37, 55);
        game.load.spritesheet('powerUp02', './assets/spritesheets/powerUp02.png', 62.37, 55);
        game.load.spritesheet('powerUp03', './assets/spritesheets/powerUp03.png', 62.37, 55);

        //Bullets
        game.load.image('bullet01', './assets/sprites/bullet01.png');
        game.load.image('bullet02', './assets/sprites/bullet02.png');
        game.load.spritesheet('bulletPowerUp01', './assets/spritesheets/bulletPowerUp01.png', 105, 24);
        game.load.spritesheet('bulletPowerUp02', './assets/spritesheets/bulletPowerUp02.png', 68.5, 60);
        game.load.spritesheet('bulletPowerUp03', './assets/spritesheets/bulletPowerUp03.png', 36, 32);
        game.load.spritesheet('bulletEnemy', './assets/spritesheets/bulletEnemy.png', 24, 18);
        game.load.spritesheet('bullet01Boss', './assets/spritesheets/bulletBoss01.png', 40, 32);
        game.load.spritesheet('bullet02Boss', './assets/spritesheets/bulletEnemy.png', 24, 18);
        game.load.spritesheet('bullet03Boss', './assets/spritesheets/bulletBoss03.png', 142, 6);

        //Effects
        game.load.spritesheet('explosion01', './assets/spritesheets/explosion01.png', 104, 96);
        game.load.spritesheet('explosion02', './assets/spritesheets/explosion02.png', 136, 128);

        //Players
        game.load.spritesheet('player01', './assets/spritesheets/player01.png', 133.33, 75);


        game.load.spritesheet('player02', './assets/spritesheets/player02.png', 133.33, 75);

        //Enemies
        game.load.spritesheet('enemy01', './assets/spritesheets/enemy01.png', 160, 52);
        game.load.spritesheet('enemy02', './assets/spritesheets/enemy02.png', 203, 120);
        game.load.spritesheet('enemy03', './assets/spritesheets/enemy03.png', 56, 28);
        game.load.spritesheet('enemy04', './assets/spritesheets/enemy04.png', 90, 60);
        game.load.image('boss01', './assets/spritesheets/boss01.png');

        //SOUND
        //Sfx
        game.load.audio('1up', ['./assets/sfx/1up.ogg', './assets/sfx/1up.mp3']);
        game.load.audio('coin', ['./assets/sfx/coin.ogg', './assets/sfx/coin.mp3']);
        game.load.audio('shoot', ['./assets/sfx/shoot.ogg', './assets/sfx/shoot.mp3']);
        game.load.audio('player_explosion', ['./assets/sfx/player_explosion.ogg', './assets/sfx/player_explosion.mp3']);
        game.load.audio('enemy_explosion', ['./assets/sfx/enemy_explosion.ogg', './assets/sfx/enemy_explosion.mp3']);
        game.load.audio('boss_explosion', ['./assets/sfx/boss_explosion.ogg', './assets/sfx/boss_explosion.mp3']);
        game.load.audio('select', ['./assets/sfx/select.ogg', './assets/sfx/select.mp3']);
        game.load.audio('selected', ['./assets/sfx/selected.ogg', './assets/sfx/selected.mp3']);
        game.load.audio('back', ['./assets/sfx/back.ogg', './assets/sfx/back.mp3']);
        game.load.audio('gameStart', ['./assets/sfx/gameStart.ogg', './assets/sfx/gameStart.mp3']);
        game.load.audio('playerIntro', ['./assets/sfx/playerIntro.ogg', './assets/sfx/playerIntro.mp3']);
        game.load.audio('missionStart', ['./assets/sfx/missionStart.ogg', './assets/sfx/missionStart.mp3']);
        game.load.audio('powerUpSFX', ['./assets/sfx/powerUp.ogg', './assets/sfx/powerUp.mp3']);
        game.load.audio('alarm', ['./assets/sfx/alarm.ogg', './assets/sfx/alarm.mp3']);
        game.load.audio('warning', ['./assets/sfx/warning.ogg', './assets/sfx/warning.mp3']);
        game.load.audio('stageClear', ['./assets/sfx/stageClear.ogg', './assets/sfx/stageClear.mp3']);
        game.load.audio('missionFail', ['./assets/sfx/missionFail.ogg', './assets/sfx/missionFail.mp3']);
        game.load.audio('bossIntro', ['./assets/sfx/bossIntro.ogg', './assets/sfx/bossIntro.mp3']);

        //Music
        game.load.audio('splashScreenTheme', ['./assets/music/Splash.ogg', './assets/music/Splash.mp3']);
        game.load.audio('mainMenuTheme', ['./assets/music/Menu.ogg', './assets/music/Menu.mp3']);
        game.load.audio('creditsTheme', ['./assets/music/Credits.ogg', './assets/music/Credits.mp3']);
        game.load.audio('scoresTheme', ['./assets/music/Scores.ogg', './assets/music/Scores.mp3']);
        game.load.audio('stageTheme', ['./assets/music/Stage01.ogg', './assets/music/Stage01.mp3']);
        game.load.audio('gameOverTheme', ['./assets/music/GameOver.ogg', './assets/music/GameOver.mp3']);
        game.load.audio('boss01Theme', ['./assets/music/Boss01.ogg', './assets/music/Boss01.mp3']);
        game.load.audio('stageClearTheme', ['./assets/music/StageClear.ogg', './assets/music/StageClear.mp3']);

        //JSONs
        game.load.json('credits', './assets/json/credits.json');
        game.load.json('easyMode', './assets/json/easyMode.json');  
        game.load.json('normalMode', './assets/json/normalMode.json');  
        game.load.json('hardMode', './assets/json/hardMode.json');  
        game.load.json('infernoMode', './assets/json/infernoMode.json');
        //IF THE USER IS A GUEST DONT PRELOAD THE CONFIG
        if (userLogged !== "guest") {
            game.load.json('customGame', './assets/json/userConfigs/'+ userLogged + '/userConfig.json');
        }
    },

    create: function() {
        splashMusic = game.add.audio('splashScreenTheme');
        splashMusic.allowMultiple = true;

        //3rd SPLASH STATE
        game.state.start('splash');
    }
}