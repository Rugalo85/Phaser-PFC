//VARIABLES
//players
var player01;
var player02;
var player01Weapon;
var player02Weapon;

//scores
var scorePlayer01;
var scorePlayer02;

//shoots
var bulletsPlayer01;
var bulletsPlayer02;
var bulletsPowerUp01;
var bulletsPowerUp02;
var bulletsPowerUp03;
var bulletsEnemy;
var bullets01Boss;
var bullets02Boss;
var bullets03Boss;
var explosions;
var bulletTimer01 = 0;
var bulletTimer02 = 0;

//enemies
var enemies01;
var enemies02;
var enemy02FiringDelay;
var enemy02BulletSpeed;
var enemies03;
var enemies04;
var enemies03Timer;
var enemiesDefeated;
var boss01;
var boss01Speed;
var boss01BulletSpeed01;
var boss01BulletSpeed02;
var boss01BulletSpeed03;
var boss01FiringDelay01;
var boss01FiringDelay02;
var boss01FiringDelay03;
var bossDeployed;
var bossAlive;

//items
var points;
var powerUp01;
var powerUp02;
var powerUp03;

//HUD
var player01HUD;
var player02HUD;
var textPauseMenu;

var player01Text;
var player01LivesText;
var player01ScoreText;
var player02Text;
var player02LivesText;
var player02ScoreText;

var winOrLose = false;

var gameState = {
    create: function() {
        //MISC------------------------//
        //NEW GAME
        if (gameMode == false) {
            difficult = gameDifficulty;
        //CUSTOM GAME
        } else if (gameMode == true) {
            difficult = 'customGame';
        }
        
        console.log(gameMode);

        //GAME VARIABLES (stored inside a JSON file)
        this.newGame = game.cache.getJSON(difficult);

        this.player01Name = this.newGame.player01Name;
        this.player01Lives = this.newGame.player01Lives * 1;
        this.player01Speed = this.newGame.player01Speed * 1;
        this.player01Bullets = this.newGame.player01Bullets * 1;
        this.player01Skin = this.newGame.player01Skin;
        this.gainplayer01Lives = this.newGame.gainplayer01Lives * 1;
        
        this.player02Name = this.newGame.player02Name;
        this.player02Lives = this.newGame.player02Lives * 1;
        this.player02Speed = this.newGame.player02Speed * 1;
        this.player02Bullets = this.newGame.player02Bullets * 1;
        this.player02Skin = this.newGame.player02Skin;
        this.gainplayer02Lives = this.newGame.gainplayer02Lives * 1;

        this.enemy01Spacing = this.newGame.enemy01Spacing * 1;
        this.enemy01Speed = this.newGame.enemy01Speed * 1;

        this.enemy02Spacing = this.newGame.enemy02Spacing * 1;
        this.enemy02Speed = this.newGame.enemy02Speed * 1;
        enemy02BulletSpeed = this.newGame.enemy02BulletSpeed * 1;
        enemy02FiringDelay = this.newGame.enemy02FiringDelay * 1;

        this.enemy03Spacing = this.newGame.enemy03Spacing * 1;
        this.enemy03Speed = this.newGame.enemy03Speed * 1;
        this.numEnemies03InWave = this.newGame.numEnemies03InWave * 1;

        this.enemy04Spacing = this.newGame.enemy04Spacing * 1;
        this.enemy04Speed = this.newGame.enemy04Speed * 1;

        enemiesDefeated = 0;
        this.enemiesToDefeat = this.newGame.enemiesToDefeat * 1;

        this.boss01Shields = this.newGame.boss01Shields * 1;
        boss01Speed = this.newGame.boss01Speed * 1;
        boss01BulletSpeed01 = this.newGame.boss01BulletSpeed01 * 1;
        boss01FiringDelay01 = this.newGame.boss01FiringDelay01 * 1;
        boss01BulletSpeed02 = this.newGame.boss01BulletSpeed02 * 1;
        boss01FiringDelay02 = this.newGame.boss01FiringDelay02 * 1;
        boss01BulletSpeed03 = this.newGame.boss01BulletSpeed02 * 1;
        boss01FiringDelay03 = this.newGame.boss01FiringDelay02 * 1;

        //SET THE SCORES TO 0
        scorePlayer01 = 0;
        scorePlayer02 = 0;

        //STAGE MUSIC
        this.stageMusic = game.add.audio('stageTheme');
        this.boss01Theme = game.add.audio('boss01Theme');
        
        //SFX
        upSound = game.add.audio('1up');
        coinSound = game.add.audio('coin');
        shootSound = game.add.audio('shoot');
        playerBOOM = game.add.audio('player_explosion');
        enemyBOOM = game.add.audio('enemy_explosion');
        pauseSound = game.add.audio('pause');
        selectSound = game.add.audio('select');
        this.selectedSound = game.add.audio('selected');
        playerIntro = game.add.audio('playerIntro');
        backSound = game.add.audio('back');
        missionStartSound = game.add.audio('missionStart');
        powerUpSFX = game.add.audio('powerUpSFX');
        alarm = game.add.audio('alarm');
        warning = game.add.audio('warning');
        stageClear = game.add.audio('stageClear');
        missionFail = game.add.audio('missionFail');
        bossIntro = game.add.audio('bossIntro');
        bossExplosion = game.add.audio('boss_explosion');

        //PARALLAX BACKGROUND
        addParallax('parallaxStage01', 'parallaxStage02', 'parallaxStage03', 'parallaxStage04', 0);
        
        //INTRO TEXT
        var missionStartBar = game.add.sprite(-300, game.height/2 - 200, 'bar');
        missionStartBar.anchor.setTo(0.5,0.5);
        
        var entranceBar = game.add.tween(missionStartBar).to({x:game.width/2}, 750, Phaser.Easing.Linear.None, true);
        
        var missionStartText = game.add.text(1500, game.height/2 - 200, 'MISSION START', {font: '30px PrStart', fill: '#fff' });
        missionStartText.anchor.setTo(0.5,0.5);
        
        var entranceText = game.add.tween(missionStartText).to({x:game.width/2}, 750, Phaser.Easing.Linear.None, true);
        
        game.time.events.add(750, function() {
            missionStartSound.play();
            missionStartSound.volume = 0.7;
        }, this);

        entranceText.onComplete.add(function() {
                        game.time.events.add(2000, function() {
                                    var dispatchText = game.add.tween(missionStartText).to({x:-500},500, Phaser.Easing.Linear.None, true);
                                    var dispatchBar = game.add.tween(missionStartBar).to({x:1600},500, Phaser.Easing.Linear.None, true);
                                    }, this);
                        }, this);
        
    
        //PLAYERS--------------------//
        //PLAYER 01
        this.addPlayer01();
       
        //MULTIPLAYER VIA MAIN MENU - ADD PLAYER 02
        if (multiPlayer == true) {
            this.addPlayer02();
            this.addPlayer02HUD();
        } else {
            //ELSE PUT AN ADVERT TEXT TO THE ADD PLAYER 02
            var pushStart02 = game.add.text(1050, 35, 'PLAYER 2 PRESS KEY "2"', {font: '20px PrStart', fill: '#fff' });
            pushStart02.anchor.set(0.5,0.5);
            
            //PUSH START PLAYER 02
            blinkingText(pushStart02, 500);
                        
            twoKey = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
            twoKey.onDown.addOnce(function() {
                                    timer.stop();
                                    pushStart02.kill(); 
                                    multiPlayer = true;
                                    this.addPlayer02();
                                    this.addPlayer02HUD();
                                    }, this);
        }     
        
        //ENEMIES-----------------------------------//
        //First enemies - straigth line
        enemies01 = game.add.group();
        this.createEnemiesGroup(enemies01, 'enemy01', 1, 1);
        enemies01.callAll('animations.add', 'animations', 'show', [0,1], 60, true);
        enemies01.callAll('play', null, 'show');
        
        //Second enemies - diagonal
        enemies02 = game.add.group();
        this.createEnemiesGroup(enemies02, 'enemy02', 0.8, 0.8);
        enemies02.callAll('animations.add', 'animations', 'up', [0,1], 30, true);
        enemies02.callAll('animations.add', 'animations', 'down', [2,3], 30, true);
        
        //Third enemies - squadron
        enemies03 = game.add.group();
        this.createEnemiesGroup(enemies03, 'enemy03', 2, 2);
        enemies03.callAll('animations.add', 'animations', 'ups', [1, 2], 30, true);
        enemies03.callAll('animations.add', 'animations', 'downs', [1, 0], 30, true);
        enemies03.setAll('outOfBoundsKill', false);

        //Fourth enemies - item carrier
        enemies04 = game.add.group();
        this.createEnemiesGroup(enemies04, 'enemy04', 1.2, 1.2);
        enemies04.callAll('animations.add', 'animations', 'travel', [0, 1, 2, 3, 4, 5, 6, 7], 30, true);
        enemies04.callAll('play', null, 'travel');

        //OBJECTS--------------------------------------//
        //BULLETS PLAYER01
        bulletsPlayer01 = game.add.group();
        this.createItemsGroup(bulletsPlayer01, 'bullet01', 30, 1, 1);

        //BULLETS PLAYER02
        bulletsPlayer02 = game.add.group();
        this.createItemsGroup(bulletsPlayer02, 'bullet02', 30, 1, 1);

        //BULLETS ENEMIES
        bulletsEnemy = game.add.group();
        this.createItemsGroup(bulletsEnemy, 'bulletEnemy', 60, 1, 1);
        bulletsEnemy.callAll('animations.add', 'animations', 'burn', [0,1,2,3,4,5], 10, true);
        bulletsEnemy.callAll('play', null, 'burn');

        bullets01Boss = game.add.group();
        this.createItemsGroup(bullets01Boss, 'bullet01Boss', 60, 1, 1);
        bullets01Boss.callAll('animations.add', 'animations', 'round', [0,1,2,3], 10, true);
        bullets01Boss.callAll('play', null, 'round');

        bullets02Boss = game.add.group();
        this.createItemsGroup(bullets02Boss, 'bullet02Boss', 60, 1, 1);
        bullets02Boss.callAll('animations.add', 'animations', 'burn2', [0,1,2,3,4,5], 10, true);
        bullets02Boss.callAll('play', null, 'burn2');

        bullets03Boss = game.add.group();
        this.createItemsGroup(bullets03Boss, 'bullet03Boss', 60, 1, 1);
        bullets03Boss.callAll('animations.add', 'animations', 'travel', [0,1], 10, true);
        bullets03Boss.callAll('play', null, 'travel');

        //BULLETS POWER UPS 01
        bulletsPowerUp01 = game.add.group();
        this.createItemsGroup(bulletsPowerUp01, 'bulletPowerUp01', 30, 1, 1);
        bulletsPowerUp01.callAll('animations.add', 'animations', 'pUP01', [0,1], 30, true);
        bulletsPowerUp01.callAll('play', null, 'pUP01');

        bulletsPowerUp02 = game.add.group();
        this.createItemsGroup(bulletsPowerUp02, 'bulletPowerUp02', 30, 0.7, 0.7);
        bulletsPowerUp02.callAll('animations.add', 'animations', 'pUP02', [0,1,2,3], 30, true);
        bulletsPowerUp02.callAll('play', null, 'pUP02');

        bulletsPowerUp03 = game.add.group();
        this.createItemsGroup(bulletsPowerUp03, 'bulletPowerUp03', 30, 1, 1);
        bulletsPowerUp03.callAll('animations.add', 'animations', 'pUP03', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], 30, true);
        bulletsPowerUp03.callAll('play', null, 'pUP03');
        
        //BULLETS POWER UPS 02
        bulletsPowerUp04 = game.add.group();
        this.createItemsGroup(bulletsPowerUp04, 'bulletPowerUp01', 30, 1, 1);
        bulletsPowerUp04.callAll('animations.add', 'animations', 'pUP01', [0,1], 30, true);
        bulletsPowerUp04.callAll('play', null, 'pUP01');

        bulletsPowerUp05 = game.add.group();
        this.createItemsGroup(bulletsPowerUp05, 'bulletPowerUp02', 30, 0.7, 0.7);
        bulletsPowerUp05.callAll('animations.add', 'animations', 'pUP02', [0,1,2,3], 30, true);
        bulletsPowerUp05.callAll('play', null, 'pUP02');

        bulletsPowerUp06 = game.add.group();
        this.createItemsGroup(bulletsPowerUp06, 'bulletPowerUp03', 30, 1, 1);
        bulletsPowerUp06.callAll('animations.add', 'animations', 'pUP03', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], 30, true);
        bulletsPowerUp06.callAll('play', null, 'pUP03');

        //EXPLOSIONS
        explosions = game.add.group();
        explosions.enableBody = true;
        explosions.physicsBodyType = Phaser.Physics.ARCADE;
        explosions.createMultiple(30, 'explosion01');
        
        //ITEMS-----------------//
        //Points
        points = game.add.group();
        points.enableBody = true;
        this.createItemsGroup(points, 'points', 5, 1, 1);
        points.callAll('animations.add', 'animations', 'show', [0,1,2,3], 10, true);
        points.callAll('play', null, 'show');
        
        powerUp01 = game.add.group();
        powerUp01.enableBody = true;
        this.createItemsGroup(powerUp01, 'powerUp01', 5, 0.8, 0.8);    
        powerUp01.callAll('animations.add', 'animations', 'first', [0,1,2,3,4,5,6,7], 10, true);
        powerUp01.callAll('play', null, 'first');    
        
        powerUp02 = game.add.group();
        powerUp02.enableBody = true;
        this.createItemsGroup(powerUp02, 'powerUp02', 5, 0.8, 0.8);    
        powerUp02.callAll('animations.add', 'animations', 'second', [0,1,2,3,4,5,6,7], 10, true);
        powerUp02.callAll('play', null, 'second');    
        
        powerUp03 = game.add.group();
        powerUp03.enableBody = true;
        this.createItemsGroup(powerUp03, 'powerUp03', 5, 0.8, 0.8);    
        powerUp03.callAll('animations.add', 'animations', 'third', [0,1,2,3,4,5,6,7], 10, true);
        powerUp03.callAll('play', null, 'third');    
        
        //--HUD
        //PLAYER 01 HUD
        player01HUD = game.add.group();
        player01HUD.setAll('anchor.x', 0.5);
        player01HUD.setAll('anchor.y', 0.5);
        //name
        player01Text = game.add.text(20, 20, this.player01Name, {font: '20px PrStart', fill: '#fff' }, player01HUD);
        //lives
        heart1 = game.add.sprite(190, 20, 'heart');
        player01HUD.add(heart1);
        heart1.scale.setTo(0.035, 0.035);
        //numbers
        player01LivesText = game.add.text(210, 20, 'x' + this.player01Lives,  {font: '20px PrStart', fill: '#fff' }, player01HUD);
        player01ScoreText = game.add.text(275 , 20, 'Score:' + scorePlayer01, {font: '20px PrStart', fill: '#fff' }, player01HUD);
        //info
        controlsPlayer01 = game.add.text(20, 45, 'MOVE: W/A/S/D - SHOOT: G', {font: '10px PrStart', fill: '#ffffff'}, player01HUD);
        
        //PAUSE MENU
        pauseHud = game.add.text(game.width/2, 30, 'P pause', {font: '15px PrStart', fill: '#ffffff'});
        pauseHud.anchor.setTo(0.5, 0.5);
        
        this.pauseNavigation();
        
        pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
        pauseKey.onDown.add(function() {
            if (game.paused == false) {
                this.deployPauseMenu();
            } else {
                game.paused = false;
                this.arrow.kill();
                textPauseMenu.removeAll(true);
            }}, this);

        //INTRO--------------------------------//
        fadeScreen = game.add.tileSprite(0, 0, 1280, 720, 'fadeScreen');
        fadeScreen.alpha = 1;
        fadeInState(fadeScreen, this.stageMusic);    

        boss01 = game.add.sprite(4600, game.height/2, 'boss01');
        boss01.anchor.x = 0.5;
        boss01.anchor.y = 0.5;
        bossDeployed = false;

        //BEGINNING OF ENEMIES WAVES
        game.time.events.add(7000, function() {
            this.deployEnemies01();
        }, this);
        game.time.events.add(15000, function() {
            this.deployEnemies02();
        }, this);
        game.time.events.add(23000, function() {
            this.deployEnemies03();
        }, this);
        game.time.events.add(17000, function() {
            this.deployEnemies04();
        }, this);
    },

    update: function() {
        //PARALLAX MOVEMENT
        parallax01.tilePosition.x -= 0.15;
        parallax02.tilePosition.x -= 0.3;
        parallax03.tilePosition.x -= 0.7;
        parallax04.tilePosition.x -= 1;
        
        //PLAYER COLLISIONS
        if (freePlayer01 == true) {
            game.physics.arcade.overlap(player01, points, this.collectPoints, null, this);
            game.physics.arcade.overlap(player01, enemies01, this.killPlayer, null, this);
            game.physics.arcade.overlap(player01, enemies02, this.killPlayer, null, this);
            game.physics.arcade.overlap(player01, enemies03, this.killPlayer, null, this);
            game.physics.arcade.overlap(player01, enemies04, this.killPlayer, null, this);
            game.physics.arcade.overlap(player01, boss01, this.killPlayer, null, this);
            game.physics.arcade.overlap(bulletsEnemy, player01, this.killPlayer, null, this);
            game.physics.arcade.overlap(bullets01Boss, player01, this.killPlayer, null, this);
            game.physics.arcade.overlap(bullets02Boss, player01, this.killPlayer, null, this);
            game.physics.arcade.overlap(bullets03Boss, player01, this.killPlayer, null, this);
            game.physics.arcade.overlap(player01, bulletsEnemy, this.enemyShoot, null, this);
            game.physics.arcade.overlap(player01, powerUp01, this.collectPowerUp01, null, this);
            game.physics.arcade.overlap(player01, powerUp02, this.collectPowerUp02, null, this);
            game.physics.arcade.overlap(player01, powerUp03, this.collectPowerUp03, null, this);
        }
        
        if (freePlayer02 == true) {
            game.physics.arcade.overlap(player02, points, this.collectPoints, null, this);
            game.physics.arcade.overlap(player02, enemies01, this.killPlayer, null, this);
            game.physics.arcade.overlap(player02, enemies02, this.killPlayer, null, this);
            game.physics.arcade.overlap(player02, enemies03, this.killPlayer, null, this);
            game.physics.arcade.overlap(player02, enemies04, this.killPlayer, null, this);
            game.physics.arcade.overlap(player02, boss01, this.killPlayer, null, this);
            game.physics.arcade.overlap(bulletsEnemy, player02, this.killPlayer, null, this);
            game.physics.arcade.overlap(bullets01Boss, player02, this.killPlayer, null, this);
            game.physics.arcade.overlap(bullets02Boss, player02, this.killPlayer, null, this);
            game.physics.arcade.overlap(bullets03Boss, player02, this.killPlayer, null, this);
            game.physics.arcade.overlap(player02, bulletsEnemy, this.enemyShoot, null, this);
            game.physics.arcade.overlap(player02, powerUp01, this.collectPowerUp01, null, this);
            game.physics.arcade.overlap(player02, powerUp02, this.collectPowerUp02, null, this);
            game.physics.arcade.overlap(player02, powerUp03, this.collectPowerUp03, null, this);
        }
        
        //BULLETS COLLISIONS
        game.physics.arcade.overlap(bulletsPlayer01, enemies01, this.killEnemy01, null, this);
        game.physics.arcade.overlap(bulletsPlayer01, enemies02, this.killEnemy01, null, this);
        game.physics.arcade.overlap(bulletsPlayer01, enemies03, this.killEnemy01, null, this);
        game.physics.arcade.overlap(bulletsPlayer01, enemies04, this.killCargo01, null, this);
        game.physics.arcade.overlap(bulletsPlayer01, boss01, this.killBoss01, null, this);

        game.physics.arcade.overlap(bulletsPowerUp01, enemies01, this.killEnemy01, null, this);
        game.physics.arcade.overlap(bulletsPowerUp01, enemies02, this.killEnemy01, null, this);
        game.physics.arcade.overlap(bulletsPowerUp01, enemies03, this.killEnemy01, null, this);
        game.physics.arcade.overlap(bulletsPowerUp01, enemies04, this.killCargo01, null, this);
        game.physics.arcade.overlap(bulletsPowerUp01, boss01, this.killBoss01, null, this);

        game.physics.arcade.overlap(bulletsPowerUp02, enemies01, this.killEnemy01, null, this);
        game.physics.arcade.overlap(bulletsPowerUp02, enemies02, this.killEnemy01, null, this);
        game.physics.arcade.overlap(bulletsPowerUp02, enemies03, this.killEnemy01, null, this);
        game.physics.arcade.overlap(bulletsPowerUp02, enemies04, this.killCargo01, null, this);
        game.physics.arcade.overlap(bulletsPowerUp02, boss01, this.killBoss01, null, this);

        game.physics.arcade.overlap(bulletsPowerUp03, enemies01, this.killEnemy01, null, this);
        game.physics.arcade.overlap(bulletsPowerUp03, enemies02, this.killEnemy01, null, this);
        game.physics.arcade.overlap(bulletsPowerUp03, enemies03, this.killEnemy01, null, this);
        game.physics.arcade.overlap(bulletsPowerUp03, enemies04, this.killCargo01, null, this);
        game.physics.arcade.overlap(bulletsPowerUp03, boss01, this.killBoss01, null, this);

        game.physics.arcade.overlap(bulletsPlayer02, enemies01, this.killEnemy02, null, this);
        game.physics.arcade.overlap(bulletsPlayer02, enemies02, this.killEnemy02, null, this);
        game.physics.arcade.overlap(bulletsPlayer02, enemies03, this.killEnemy02, null, this);
        game.physics.arcade.overlap(bulletsPlayer02, enemies04, this.killCargo02, null, this);
        game.physics.arcade.overlap(bulletsPlayer02, boss01, this.killBoss02, null, this);

        game.physics.arcade.overlap(bulletsPowerUp04, enemies01, this.killEnemy02, null, this);
        game.physics.arcade.overlap(bulletsPowerUp04, enemies02, this.killEnemy02, null, this);
        game.physics.arcade.overlap(bulletsPowerUp04, enemies03, this.killEnemy02, null, this);
        game.physics.arcade.overlap(bulletsPowerUp04, enemies04, this.killCargo02, null, this);
        game.physics.arcade.overlap(bulletsPowerUp04, boss01, this.killBoss02, null, this);

        game.physics.arcade.overlap(bulletsPowerUp05, enemies01, this.killEnemy02, null, this);
        game.physics.arcade.overlap(bulletsPowerUp05, enemies02, this.killEnemy02, null, this);
        game.physics.arcade.overlap(bulletsPowerUp05, enemies03, this.killEnemy02, null, this);
        game.physics.arcade.overlap(bulletsPowerUp05, enemies04, this.killCargo02, null, this);
        game.physics.arcade.overlap(bulletsPowerUp05, boss01, this.killBoss02, null, this);

        game.physics.arcade.overlap(bulletsPowerUp06, enemies01, this.killEnemy02, null, this);
        game.physics.arcade.overlap(bulletsPowerUp06, enemies02, this.killEnemy02, null, this);
        game.physics.arcade.overlap(bulletsPowerUp06, enemies03, this.killEnemy02, null, this);
        game.physics.arcade.overlap(bulletsPowerUp06, enemies04, this.killCargo02, null, this);
        game.physics.arcade.overlap(bulletsPowerUp06, boss01, this.killBoss02, null, this);

        //PLAYERS MOVEMENT
        movePlayer(player01, this.player01Speed, Phaser.Keyboard.W, Phaser.Keyboard.S, Phaser.Keyboard.A, Phaser.Keyboard.D, Phaser.Keyboard.G, this.player01Shoot, freePlayer01);
        if (multiPlayer == true) {
            movePlayer(player02, this.player02Speed, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.NUMPAD_0, this.player02Shoot, freePlayer02);
        }
        
        //DEPLOY BOSS
        if (enemiesDefeated == this.enemiesToDefeat && bossDeployed == false) {
            bossDeployed = true;
            this.deployBoss01();
        }

        //CHECK SCORES
        this.checkScore();
    },
    
    //PAUSE MENU NAVIGATION----------------------------//
    pauseNavigation: function() {
            //MENU NAVIGATION
            down = game.input.keyboard.addKey(Phaser.Keyboard.S);
            up = game.input.keyboard.addKey(Phaser.Keyboard.W);
            intro = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            down.onDown.add(function() {
                this.arrow.animations.play('abajo', 30, false);
                this.arrow.y += 30;
                if(this.arrow.y > game.height/2 + 10 ) {
                    this.arrow.animations.stop();
                    this.arrow.y = game.height/2 + 10;
                } 
            }, this);

            up.onDown.add(function() {
                this.arrow.animations.play('abajo', 30, false);
                this.arrow.y -= 30;
                if(this.arrow.y < game.height/2 - 50) {
                    this.arrow.animations.stop();
                    this.arrow.y = game.height/2 - 50;
                }
            }, this);

            intro.onDown.add(function() {
                this.arrow.animations.play('abajo', 60, true);
                if (this.arrow.y == game.height/2 - 50) {
                    //RESUME
                    if (game.paused == true) {
                        backSound.play();
                        backSound.volume = 0.2;
                        game.paused = false;
                        textPauseMenu.removeAll(true);
                        this.arrow.kill();
                    }

                } else if (this.arrow.y == game.height/2 - 20) {
                    //RESTART
                    if (game.paused == true) {
                        this.selectedSound.play();
                        this.selectedSound.volume = 0.2;
                        game.paused = false;
                        blinkingText(restartText, 150);
                        fadeOutState(fadeOffScreen, 'game', this.stageMusic);
                        fadeOutState(fadeOffScreen, 'game', this.boss01Theme);
                        multiPlayer = false;
                        freePlayer01 = false;
                        freePlayer02 = false;
                        disableKeys();
                        scorePlayer01 = 0;
                        scorePlayer02 = 0;
                        game.input.keyboard.removeKey(Phaser.Keyboard.P);
                    }

                } else if (this.arrow.y == game.height/2 + 10) {
                    //MAIN MENU
                    if (game.paused == true) {
                        game.paused = false;
                        this.selectedSound.play();
                        this.selectedSound.volume = 0.2;
                        blinkingText(backMainMenuText, 150);
                        fadeOutState(fadeOffScreen, 'menu', this.stageMusic);
                        fadeOutState(fadeOffScreen, 'menu', this.boss01Theme);
                        multiPlayer = false;
                        freePlayer01 = false;
                        freePlayer02 = false;
                        disableKeys();
                        scorePlayer01 = 0;
                        scorePlayer02 = 0;
                        game.input.keyboard.removeKey(Phaser.Keyboard.P);
                    }
                }
            }, this);
    },
    
    //PAUSE MENU HUD--------------------------//
    deployPauseMenu: function() {
        //When the paus button is pressed, we pause the game
        game.paused = true;

        this.arrow = game.add.sprite(game.width/2 - 105 , game.height/2 - 50, 'arrow');
        this.arrow.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.arrow);
        var abajo = this.arrow.animations.add('abajo'); 
        
        // And a label to illustrate which menu item was chosen.
        textPauseMenu = game.add.group();
        textPauseMenu.setAll('assnchor.x', 0);
        textPauseMenu.setAll('anchor.y', 0.5);
        //pause
        pauseLogo = game.add.sprite(game.width/2, game.height/2 - 125, 'pauseLogo');
        pauseLogo.anchor.setTo(0.5, 0.5);  
        textPauseMenu.add(pauseLogo);
        
        //resume
        resumeText = game.add.text(game.width/2 - 80, game.height/2 - 60, 'Resume', {font: '20px PrStart', fill: '#fff' }, textPauseMenu);
        //restart
        restartText = game.add.text(game.width/2 - 80, game.height/2 - 30, 'Restart Mission', {font: '20px PrStart', fill: '#fff' }, textPauseMenu);
        //mainmenu
        backMainMenuText = game.add.text(game.width/2 - 80, game.height/2, 'Main Menu', {font: '20px PrStart', fill: '#fff' }, textPauseMenu);

        fadeOffScreen = game.add.tileSprite(0, 0, 1280, 720, 'fadeScreen');
        fadeOffScreen.alpha = 0;
    },
    
    //PLAYER FUNCTIONS---------------------------//
    //ADD PLAYER01
    addPlayer01: function() {
        //Bullet type
        player01Weapon = this.player01Bullets;

        //Adding the sprite
        player01 = game.add.sprite(-700, 350, 'player01');
        player01.anchor.setTo(0.5, 0.5);

        //Change the player skin color
        if (this.player01Skin == "green") {
            player01.tint = 0x4aba46;
        } else if (this.player01Skin == "yellow") {
            player01.tint = 0xe0da28;
        }
        
        //Creating the animations
        player01.animations.add('down_full', [ 0 ], 5, true);
        player01.animations.add('down_half', [ 1 ], 5, true);
		player01.animations.add('down', [ 2 ], 5, true);
        player01.animations.add('idle_down', [ 3 ], 5, true);
		player01.animations.add('idle', [ 4 ], 5, true);
        player01.animations.add('idle_up', [ 5 ], 5, true);
		player01.animations.add('up', [ 6 ], 5, true);
        player01.animations.add('up_half', [ 7 ], 5, true);
		player01.animations.add('up_full', [ 8 ], 5, true);
        player01.animations.add('up_to_idle', [ 6, 5 ], 10, false);
        player01.animations.add('down_to_idle', [ 2, 3 ], 10, false);
        player01.animations.play('idle');
        
        //Intro
        game.time.events.add(1500, function() {
            playerIntro.play();
            playerIntro.volume = 0.05;
        }, this);
        
        var entrance01 = game.add.tween(player01).to({x:500,y:350},3000, Phaser.Easing.Linear.None, true);
        
        //Removing invincibility and give control to the player
        entrance01.onComplete.add(function() {
            freePlayer01 = true;
            player01.alpha = 0.4;
            game.time.events.add(2000, function() {
                game.physics.enable(player01, Phaser.Physics.ARCADE);
                player01.body.setSize(player01.width * 3 / 4, player01.height * 2 / 4);
                player01.alpha = 1;
            }, this);
        })
    },

    //ADD PLAYER02
    addPlayer02: function() {
        player02Weapon = this.player02Bullets;
        
        player02 = game.add.sprite(-700, 400, 'player02');
        player02.anchor.setTo(0.5, 0.5);

        //Change the player skin color
        if (this.player02Skin == "violet") {
            player02.tint = 0xaa41d3;
        } else if (this.player02Skin == "brown") {
            player02.tint = 0xd3ac41;
        }

        player02.animations.add('down_full', [ 0 ], 5, true);
        player02.animations.add('down_half', [ 1 ], 5, true);
		player02.animations.add('down', [ 2 ], 5, true);
        player02.animations.add('idle_down', [ 3 ], 5, true);
		player02.animations.add('idle', [ 4 ], 5, true);
        player02.animations.add('idle_up', [ 5 ], 5, true);
		player02.animations.add('up', [ 6 ], 5, true);
        player02.animations.add('up_half', [ 7 ], 5, true);
		player02.animations.add('up_full', [ 8 ], 5, true);
        
        player02.animations.add('up_to_idle', [ 6, 5 ], 10, false);
        player02.animations.add('down_to_idle', [ 2, 3 ], 10, false);
        
        player02.animations.play('idle');
        
        game.time.events.add(1500, function() {
            playerIntro.play();
            playerIntro.volume = 0.2;
        }, this);
        
        var entrance02 = game.add.tween(player02).to({x:450,y:400},3000, Phaser.Easing.Linear.None, true);
        
        entrance02.onComplete.add(function() {
            freePlayer02 = true;
            player02.alpha = 0.4;
            game.time.events.add(2000, function() {
                game.physics.enable(player02, Phaser.Physics.ARCADE);
                player02.body.setSize(player02.width * 3 / 4, player02.height * 2 / 4);
                player02.alpha = 1;
            }, this);
        })
    },


    //ADD PLAYER 02 HUD
    addPlayer02HUD: function() {
        //HUD
        player02HUD = game.add.group();
        player02HUD.setAll('anchor.x', 0.5);
        player02HUD.setAll('anchor.y', 0.5);
        
        //name
        player02Text = game.add.text(800, 20, this.player02Name, {font: '20px PrStart', fill: '#fff' }, player02HUD);
        heart2 = game.add.sprite(970, 20, 'heart');
        player02HUD.add(heart2);
        heart2.scale.setTo(0.035, 0.035);
        //numbers
        player02LivesText = game.add.text(990, 20, 'x' + this.player02Lives,  {font: '20px PrStart', fill: '#fff' }, player02HUD);
        player02ScoreText = game.add.text(1055 , 20, 'Score:' + scorePlayer02, {font: '20px PrStart', fill: '#fff' }, player02HUD); 
        //controls
        controlsPlayer02 = game.add.text(800, 45, 'MOVE: ARROW KEYS - SHOOT: NUMPAD 0', {font: '10px PrStart', fill: '#ffffff'}, player02HUD);
    },
    
    //PLAYER01 SHOOTING
    player01Shoot: function() {
        switch(player01Weapon) {
            //STANDARD BULLETS
            case 0:
                if (game.time.now > bulletTimer01) {
                    var speed = 800;
                    var spacing = 200;

                    var bullet = bulletsPlayer01.getFirstExists(false);

                    if (player01.alive) {
                        if (bullet) {
                            bullet.reset(player01.x + 25, player01.y + 15 );
                            bullet.body.velocity.x = speed;
                        }
                    } 
                    bulletTimer01 = game.time.now + spacing;

                    shootSound.volume = 0.15;
                    shootSound.play();
                }
            break;  

            //TRIPLE BULLETS
            case 1:
                if (game.time.now > bulletTimer01) {
                    var speed = 800;
                    var spacing = 350;

                    for (var i = 0; i < 3; i++) {
                        var bullet01 = bulletsPowerUp01.getFirstExists(false);

                        if (player01.alive) {
                            if(bullet01) {
                                //Make bullet come out of tip of ship with right angle
                                var bulletOffset = 20 * Math.sin(game.math.degToRad(player01.angle));
                                bullet01.reset(player01.x + 50, player01.y + 10);

                                //"Spread" angle of 1st and 3rd bullets
                                var spreadAngle;
                                if (i === 0) spreadAngle = -20;
                                if (i === 1) spreadAngle = 0;
                                if (i === 2) spreadAngle = 20;
                                bullet01.angle = player01.angle + spreadAngle;
                                game.physics.arcade.velocityFromAngle(spreadAngle, speed, bullet01.body.velocity);
                                bullet01.body.velocity.x += player01.body.velocity.x;
                            }
                        } 
                    }

                    bulletTimer01 = game.time.now + spacing;

                    shootSound.volume = 0.15;
                    shootSound.play();
                }

            break;  

            //MACHINEGUN BULLETS
            case 2:
                if (game.time.now > bulletTimer01) {
                    var speed = 1200;
                    var spacing = 150;
                    var bullet02 = bulletsPowerUp02.getFirstExists(false);

                    if (player01.alive) {
                        if (bullet02) {
                            bullet02.reset(player01.x + 25, player01.y + 15 );
                            bullet02.body.velocity.x = speed;
                        }

                        bulletTimer01 = game.time.now + spacing;

                        shootSound.volume = 0.15;
                        shootSound.play();
                    } 
                }
            break;  

            //CROSS BULLETS
            case 3:
                if (game.time.now > bulletTimer01) {
                    var speed = 700;
                    var spacing = 300;
                    
                    for (var i = 0; i < 4; i++) {
                        var bullet03 = bulletsPowerUp03.getFirstExists(false);

                        if (player01.alive) {
                            if(bullet03) {
                                bullet03.reset(player01.x + 25, player01.y + 15 );
                                if (i === 0) {
                                    bullet03.body.velocity.x = speed;
                                }
                                if (i === 1) {
                                    bullet03.body.velocity.x = -speed;
                                }
                                if (i === 2) {
                                    bullet03.body.velocity.y = speed;
                                }
                                if (i === 3) {
                                    bullet03.body.velocity.y = -speed;
                                }
                            }
                        } 
                    }
                    bulletTimer01 = game.time.now + spacing;

                    shootSound.volume = 0.15;
                    shootSound.play();
                } 
            break;  
        } 
    },
    
    //PLAYER02 SHOOTING
    player02Shoot: function() {
        switch(player02Weapon) {
            //STANDARD BULLETS
            case 0:
                if (game.time.now > bulletTimer02) {
                    var speed = 800;
                    var spacing = 300;

                    var bullet = bulletsPlayer02.getFirstExists(false);

                    if (player02.alive) {
                        if (bullet) {
                            bullet.reset(player02.x + 25, player02.y + 15 );
                            bullet.body.velocity.x = speed;
                        }
                    } 
                    bulletTimer02 = game.time.now + spacing;

                    shootSound.volume = 0.15;
                    shootSound.play();
                }
            break;  

            //TRIPLE BULLETS
            case 1:
                if (game.time.now > bulletTimer02) {
                    var speed = 800;
                    var spacing = 500;

                    for (var i = 0; i < 3; i++) {
                        var bullet01 = bulletsPowerUp04.getFirstExists(false);

                        if (player02.alive) {

                            if(bullet01) {
                                //Make bullet come out of tip of ship with right angle
                                var bulletOffset = 20 * Math.sin(game.math.degToRad(player02.angle));
                                bullet01.reset(player02.x + 50, player02.y + 10);

                                // "Spread" angle of 1st and 3rd bullets
                                var spreadAngle;
                                if (i === 0) spreadAngle = -20;
                                if (i === 1) spreadAngle = 0;
                                if (i === 2) spreadAngle = 20;
                                bullet01.angle = player02.angle + spreadAngle;
                                game.physics.arcade.velocityFromAngle(spreadAngle, speed, bullet01.body.velocity);
                                bullet01.body.velocity.x += player02.body.velocity.x;
                            }
                        } 
                    }

                    bulletTimer02 = game.time.now + spacing;

                    shootSound.volume = 0.15;
                    shootSound.play();
                }
            break;  

            //MACHINEGUN BULLETS
            case 2:
                if (game.time.now > bulletTimer02) {
                    var speed = 1200;
                    var spacing = 150;
                    var bullet02 = bulletsPowerUp05.getFirstExists(false);

                    if (player02.alive) {
                        if (bullet02) {
                            bullet02.reset(player02.x + 25, player02.y + 15 );
                            bullet02.body.velocity.x = speed;
                        }

                        bulletTimer02 = game.time.now + spacing;

                        shootSound.volume = 0.15;
                        shootSound.play();
                    } 
                }
            break;  

            //CROSS BULLETS
            case 3:
                if (game.time.now > bulletTimer02) {
                    var speed = 700;
                    var spacing = 400;

                    for (var i = 0; i < 4; i++) {
                        var bullet03 = bulletsPowerUp06.getFirstExists(false);

                        if (player02.alive) {
                            if(bullet03) {
                                bullet03.reset(player02.x + 25, player02.y + 15 );
                                if (i === 0) {
                                    bullet03.body.velocity.x = speed;
                                }
                                if (i === 1) {
                                    bullet03.body.velocity.x = -speed;
                                }
                                if (i === 2) {
                                    bullet03.body.velocity.y = speed;
                                }
                                if (i === 3) {
                                    bullet03.body.velocity.y = -speed;
                                }
                            }
                        } 
                    }
                    bulletTimer02 = game.time.now + spacing;

                    shootSound.volume = 0.15;
                    shootSound.play();
                } 
            break;  
        } 
    },

    //REMOVE LIVES
    killPlayer: function(player, enemy) {
        if (player == player01) {
            this.player01Lives--;
            player01LivesText.text = 'x' + this.player01Lives;
            player01.kill();
            
            freePlayer01 = false;

            if (this.player01Lives > 0) {
                this.addPlayer01();
            } 
            
        } else if (player == player02) {
            this.player02Lives--;
            player02LivesText.text = 'x' + this.player02Lives;
            player02.kill();
            
            freePlayer02 = false;

            if (this.player02Lives > 0) {
                this.addPlayer02();
            } 
        }
    
        this.checkLives();

        playerBOOM.play();
        playerBOOM.volume = 0.15;
        
        playerExplosion = game.add.sprite(300, 300, 'explosion02');
        playerExplosion.reset(player.x - 50, player.y - 50);
        playerExplosion.animations.add('playerExplosion');
        playerExplosion.animations.play('playerExplosion', 20, false, true);
        
        return false;
    },
    
    checkLives: function() {
        if (this.player01Lives == 0 && multiPlayer == false) {
            winOrLose = false;
            this.gameOverScreen(winOrLose);
        } else if (this.player01Lives == 0 && multiPlayer == true) {
            player01HUD.removeAll();
            player01GameOver = game.add.text(20, 20, '-' + this.player01Name + '...GAME OVER-', {font: '20px PrStart', fill: '#fff' });
        } else if (this.player02Lives == 0 && multiPlayer == true) {
            player02HUD.removeAll();
            player02GameOver = game.add.text(800, 20, '-' + this.player02Name + '...GAME OVER-', {font: '20px PrStart', fill: '#fff' });
        }  
        
        if (this.player01Lives == 0 && this.player02Lives == 0) {
            this.gameOverScreen(winOrLose);
        }
    },
    
    //ENEMY FUNCTIONS----------------------------------------//
    //CREATE ENEMY GROUPS
    createEnemiesGroup: function(groupName, enemyName, scaleX, scaleY) {
        groupName.enableBody = true;
        groupName.physicsBodyType = Phaser.Physics.ARCADE;
        groupName.createMultiple(70, enemyName);
        groupName.setAll('anchor.x', 0.5);
        groupName.setAll('anchor.y', 0.5);
        groupName.setAll('scale.x', scaleX);
        groupName.setAll('scale.y', scaleY);
        groupName.setAll('outOfBoundsKill', true);
        groupName.setAll('checkWorldBounds', true);        
        groupName.forEach(function(enemy){
            enemy.body.setSize(enemy.width * 3 / 4, enemy.height * 3 / 4);
        });
    },

    //1ST ENEMIES - STRAIGHT
    deployEnemies01: function() {   
        var enemy = enemies01.getFirstExists(false);
        if (enemy) {
            enemy.reset(game.width, game.rnd.integerInRange(90, 650));
            enemy.body.velocity.x = this.enemy01Speed;
            enemy.body.drag.x = -1000;
        }
        //Send another enemy
        game.time.events.add(this.enemy01Spacing, this.deployEnemies01, this);
    },

    //2ND ENEMIES - DIAGONAL
    deployEnemies02: function() {
       
        var enemy = enemies02.getFirstExists(false);
        if (enemy) {
            enemy.bullets = 5;
            enemy.lastShot = 0;
            
            enemy.reset(game.width, game.rnd.integerInRange(90, 650));
            enemy.body.velocity.x = this.enemy02Speed;
            enemy.body.velocity.y = game.rnd.integerInRange(-75, 75);
            
            if (enemy.body.velocity.y > 0) {
                enemy.animations.play('up', 60, true);
            } else {
               enemy.animations.play('down', 60, true);
            }

            enemy.update = function(){
              //Fire
              enemyBullet = bulletsEnemy.getFirstExists(false);
                
              if (enemyBullet && this.alive && this.bullets && this.x > game.width / 8 && game.time.now > enemy02FiringDelay + this.lastShot) {
                    this.lastShot = game.time.now;
                    this.bullets--;
                    enemyBullet.reset(this.x - this.width / 2, this.y);

                    var angle = game.physics.arcade.moveToObject(enemyBullet, player01, enemy02BulletSpeed);
                    enemyBullet.angle = game.math.radToDeg(angle);
                }

              //Kill enemies once they go off screen
              if (this.x > game.width + 200) {
                this.kill();
                this.x = -20;
              }
            };
        }

        //Send another enemy
        game.time.events.add(this.enemy02Spacing, this.deployEnemies02, this);
    },

    //3RD ENEMIES - SQUADRON
    deployEnemies03: function() {
        var startingY = game.rnd.integerInRange(90, 650);

        var spread = 60;
        var frequency = 70;
        var horizontalSpacing = 75;

        //Launch wave
        for (var i=0; i < this.numEnemies03InWave; i++) {
            var enemy = enemies03.getFirstExists(false);
                        
            if (enemy) {
                enemy.startingY = startingY;
                enemy.reset(game.width + horizontalSpacing * i, startingY);
                enemy.body.velocity.x = this.enemy03Speed;
                
                //Update function for each enemy
                enemy.update = function() {
                    //Wave movement
                    this.body.y = this.startingY + Math.sin((this.x) / frequency) * spread;
                                        
                    enemies03.forEach(function(enemy) {
                        var myStartingY = startingY;
                        
                        if (myStartingY > enemy.y) {
                            enemy.animations.play('downs', 2, false);
                        } else if (myStartingY < enemy.y) {
                            enemy.animations.play('ups', 2, false);
                        } 
                        
                    }, this);
                   
                    //Kill enemies once they go off screen
                    if (this.x < -100) {
                        this.kill();
                    }
                };
            }
        }
        
        //Send another wave
        enemies03Timer = game.time.events.add(this.enemy03Spacing, this.deployEnemies03, this);
        },

    //4th ENEMIES - cargo
    deployEnemies04: function() {       
        var enemy = enemies04.getFirstExists(false);
        if (enemy) {
            enemy.reset(game.width, game.rnd.integerInRange(90, 650));
            enemy.body.velocity.x = this.enemy04Speed;
        }
        //Send another enemy
        game.time.events.add(this.enemy04Spacing, this.deployEnemies04, this);
    },

    //5th BOSS 01
    deployBoss01: function() {
        bossAlive = true;
        if (bossDeployed == true) {
            fadeOutMusic = game.add.tween(this.stageMusic).to({volume:0}, 2000).start();

            this.fadeOffScreen02 = game.add.tileSprite(0, 0, 1280, 720, 'whiteScreen');
            this.fadeOffScreen02.alpha = 0;

            this.enemy01Spacing = 2000000;
            this.enemy02Spacing = 2000000;
            this.enemy03Spacing = 2000000;
            this.enemy04Spacing = 30000;

            fadeOutMusic.onComplete.add(function() {
                this.stageMusic.pause();
                alarm.play();
                alarm.volume = 0.03;
                warning.play();
                warning.volume = 0.7;
                this.boss01Theme.play();
            }, this);

            showBoss = game.add.tween(boss01).to({x: 1000}, 8200, Phaser.Easing.Linear.None, true);
            bossIntro.play();
            bossIntro.volume = 0.5;

            boss01.lastShot01 = 0;
            boss01.lastShot02 = 0;
            boss01.lastShot03 = 0;

            showBoss.onComplete.add(function() {
                game.physics.enable(boss01, Phaser.Physics.ARCADE);
                boss01.body.setSize(boss01.width - 50, boss01.height - 50);

                boss01.update = function() {
                    if (boss01.y > player01.y + 50) {
                        boss01.body.velocity.y = -boss01Speed;
                    } else if (boss01.y < player01.y - 50) {
                        boss01.body.velocity.y = boss01Speed;
                    } else {
                        boss01.body.velocity.y = 0;
                    }

                    if (boss01.y < 200) {
                        boss01.y = 200;
                    } else if (boss01.y > 575) {
                        boss01.y = 575;
                    }

                  //Fire 01
                  bossBullet01 = bullets01Boss.getFirstExists(false);
                  if (bossBullet01 && bossAlive == true && this.x > game.width / 8 && game.time.now > boss01FiringDelay01 + this.lastShot01) {
                        this.lastShot01 = game.time.now;
                        bossBullet01.reset(this.x - this.width / 2, this.y);

                        var angle2 = game.physics.arcade.moveToObject(bossBullet01, player01, boss01BulletSpeed01);
                        bossBullet01.angle2 = game.math.radToDeg(angle2);
                    }

                //Fire 02
                  bossBullet02 = bullets02Boss.getFirstExists(false);
                  if (bossBullet02 && bossAlive == true && this.x > game.width / 8 && game.time.now > boss01FiringDelay02 + this.lastShot02) {
                        this.lastShot02 = game.time.now;
                        bossBullet02.reset(this.x - 130, this.y - 100);

                        var angle3 = game.physics.arcade.moveToObject(bossBullet02, player01, boss01BulletSpeed02);
                        bossBullet02.angle3 = game.math.radToDeg(angle2);
                    }

                //Fire 03
                  bossBullet03 = bullets03Boss.getFirstExists(false);
                  if (bossBullet03 && bossAlive == true && this.x > game.width / 8 && game.time.now > boss01FiringDelay03 + this.lastShot03) {
                        this.lastShot03 = game.time.now;
                        bossBullet03.reset(this.x - 100, this.y + 90);

                        bossBullet03.body.velocity.x =- boss01BulletSpeed03;
                    }

                }
            }, this);
        }
    },

    enemyShoot: function(player, bullet) {
        bullet.kill();
        
        if (player == player01) {
            this.player01Lives--;
            player01LivesText.text = 'x' + this.player01Lives;
            player01.kill();
            
            freePlayer01 = false;

            if (this.player01Lives > 0) {
                this.addPlayer01();
            } 
            
        } else if (player == player02) {
            this.player02Lives--;
            player02LivesText.text = 'x' + this.player02Lives;
            player02.kill();
            
            freePlayer02 = false;

            if (this.player02Lives > 0) {
                this.addPlayer02();
            } 
        }
        
        this.checkLives();

        playerBOOM.play();
        playerBOOM.volume = 0.15;
        
        playerExplosion = game.add.sprite(300, 300, 'explosion02');
        playerExplosion.reset(player.x - 50, player.y - 50);
        playerExplosion.animations.add('playerExplosion');
        playerExplosion.animations.play('playerExplosion', 20, false, true);
        
        return false;

    },
    
    //KILL ENEMIES
    //Player01
    killEnemy01: function(bullets, enemy) {
        scorePlayer01 += 25; 
        player01ScoreText.text = 'Score: ' + scorePlayer01;

        enemy.kill();
        bullets.kill();
        
        explosion = explosions.getFirstExists(false);
        explosion.reset(enemy.x - 50, enemy.y - 50);
        explosion.animations.add('bum');
        explosion.animations.play('bum', 20, false, true);
        
        enemyBOOM.volume = 0.15;
        enemyBOOM.play();

        enemiesDefeated += 1;

        console.log(enemiesDefeated);
        return false;
    },
    
    //Player02
    killEnemy02: function(bullets, enemy) {
        scorePlayer02 += 25;
        player02ScoreText.text = 'Score: ' + scorePlayer02;

        enemy.kill();
        bullets.kill();
        
        explosion = explosions.getFirstExists(false);
        explosion.reset(enemy.x - 50, enemy.y - 50);
        explosion.animations.add('bum');
        explosion.animations.play('bum', 30, false, true);

        enemyBOOM.volume = 0.2;
        enemyBOOM.play();
        
        enemiesDefeated += 1;

        return false;
    },

    killCargo01: function(bullets, enemy) {
        scorePlayer01 += 50; 
        player01ScoreText.text = 'Score: ' + scorePlayer01;

        enemy.kill();
        bullets.kill();
        
        chance = game.rnd.integerInRange(0, 11);

        if (chance < 3) {
            this.deployPoints(enemy.x, enemy.y);
        } else if (chance > 3 && chance < 7) {
            this.deployPowerUps01(enemy.x, enemy.y);
        } else if (chance > 7 && chance < 10) {
            this.deployPowerUps02(enemy.x, enemy.y);
        } else {
            this.deployPowerUps03(enemy.x, enemy.y);
        }
        
        explosion = explosions.getFirstExists(false);
        explosion.reset(enemy.x - 50, enemy.y - 50);
        explosion.animations.add('bum');
        explosion.animations.play('bum', 20, false, true);
        
        enemyBOOM.volume = 0.15;
        enemyBOOM.play();

        enemiesDefeated += 1;

        return false;
    },

    killCargo02: function(bullets, enemy) {
        scorePlayer02 += 50; 
        player02ScoreText.text = 'Score: ' + scorePlayer02;

        enemy.kill();
        bullets.kill();
        
        chance = game.rnd.integerInRange(0, 11);

        if (chance < 3) {
            this.deployPoints(enemy.x, enemy.y);
        } else if (chance > 3 && chance < 7) {
            this.deployPowerUps01(enemy.x, enemy.y);
        } else if (chance > 7 && chance < 10) {
            this.deployPowerUps02(enemy.x, enemy.y);
        } else {
            this.deployPowerUps03(enemy.x, enemy.y);
        }
        
        explosion = explosions.getFirstExists(false);
        explosion.reset(enemy.x - 50, enemy.y - 50);
        explosion.animations.add('bum');
        explosion.animations.play('bum', 20, false, true);
        
        enemyBOOM.volume = 0.15;
        enemyBOOM.play();

        enemiesDefeated += 1;

        return false;
    },

    killBoss01: function(bullets, enemy) {
        //Each hit decreases the boss shields
        this.boss01Shields -= 100;

        if (this.boss01Shields < 701 && this.boss01Shields > 501) {
            bullets.tint = 0xffb2b2;
        } else if (this.boss01Shields < 501 && this.boss01Shields > 301) {
            bullets.tint = 0xff7070;
        } else if (this.boss01Shields < 301) {
            bullets.tint = 0xff1c1c;
        }

        enemy.kill();

        explosion = explosions.getFirstExists(false);
        explosion.reset(enemy.x - 50, enemy.y - 50);
        explosion.animations.add('bum');
        explosion.animations.play('bum', 20, false, true);
            
        enemyBOOM.volume = 0.15;
        enemyBOOM.play();

        console.log("BOSS SHIELDS:" + this.boss01Shields);

        if (this.boss01Shields == 0) {
            bossAlive = false;
            scorePlayer01 += 2500; 
            player01ScoreText.text = 'Score: ' + scorePlayer01;

            killedBoss = game.add.tween(bullets).to({y: game.height/2}, 6500, Phaser.Easing.Linear.None, true);
            whiteScreenAppears = game.add.tween(this.fadeOffScreen02).to({alpha:1},6500, Phaser.Easing.Linear.None, true);

            bossExplosion.play();
            bossExplosion.volume = 0.5;

            killedBoss.onComplete.add(function() {
                this.fadeOffScreen02.alpha = 0;
                bullets.kill();
                winOrLose = true;
                this.gameOverScreen(winOrLose);
            }, this);
        }
        return false;
    },

    killBoss02: function(bullets, enemy) {
        //Each hit decreases the boss shields
        this.boss01Shields -= 100;

        if (this.boss01Shields < 701 && this.boss01Shields > 501) {
            bullets.tint = 0xffb2b2;
        } else if (this.boss01Shields < 501 && this.boss01Shields > 301) {
            bullets.tint = 0xff7070;
        } else if (this.boss01Shields < 301) {
            bullets.tint = 0xff1c1c;
        }

        enemy.kill();

        explosion = explosions.getFirstExists(false);
        explosion.reset(enemy.x - 50, enemy.y - 50);
        explosion.animations.add('bum');
        explosion.animations.play('bum', 20, false, true);
            
        enemyBOOM.volume = 0.15;
        enemyBOOM.play();

        console.log("BOSS SHIELDS:" + this.boss01Shields);

        if (this.boss01Shields == 0) {
            bossAlive = false;
            scorePlayer02 += 2500; 
            player02ScoreText.text = 'Score: ' + scorePlayer02;

            killedBoss = game.add.tween(bullets).to({y: game.height/2}, 6500, Phaser.Easing.Linear.None, true);
            whiteScreenAppears = game.add.tween(this.fadeOffScreen02).to({alpha:1},6500, Phaser.Easing.Linear.None, true);

            bossExplosion.play();
            bossExplosion.volume = 0.5;

            killedBoss.onComplete.add(function() {
                this.fadeOffScreen02.alpha = 0;
                bullets.kill();
                winOrLose = true;
                this.gameOverScreen(winOrLose);
            }, this);
        }
        return false;
    },

    //ITEM FUNCTIONS--------------------------------------//
    createItemsGroup: function(groupName, itemName, number, scaleX, scaleY) {
        groupName.enableBody = true;
        groupName.physicsBodyType = Phaser.Physics.ARCADE;
        groupName.createMultiple(number, itemName);
        groupName.setAll('anchor.x', 0.5);
        groupName.setAll('anchor.y', 0.5);
        groupName.setAll('scale.x', scaleX);
        groupName.setAll('scale.y', scaleY);
        groupName.setAll('outOfBoundsKill', true);
        groupName.setAll('checkWorldBounds', true);        
    },

    //GAIN POINTS
    deployPoints:function(x, y) {
        var itemSpeed = -75;
        
        var point = points.getFirstExists(false);
        
        if (point) {
            point.reset(x, y);
            point.body.velocity.x = itemSpeed;
        }
    },

    collectPoints: function(player, points) {
        //Delete the item once the player grabs it
        points.kill();
        if (player == player01) {
            scorePlayer01 += 150;
            player01ScoreText.text = 'Score: ' + scorePlayer01;
        } else if (player == player02) {
            scorePlayer02 += 150;
            player02ScoreText.text = 'Score: ' + scorePlayer02;
        }
        
        floatPoints = game.add.text(points.x, points.y, 150, {font: '10px PrStart', fill: '#ffffff'});
        floatPoints.alpha = 0;
        
        showPoints = game.add.tween(floatPoints).to({x:points.x,y:points.y - 50,alpha: 1},1000, Phaser.Easing.Linear.None, true);    
        
        showPoints.onComplete.add(function() {
                                    floatPoints.kill();
                                    }, this);
        
        //Add the points to the score and update it
        coinSound.play();
        coinSound.volume = 0.5;
    },
    
    deployPowerUps01: function(x, y) {
        var powerUpSpeed = -75;
        
        var power01 = powerUp01.getFirstExists(false);
        
        if (power01) {
            power01.reset(x, y);
            power01.body.velocity.x = powerUpSpeed;
        }
    },
    
    deployPowerUps02: function(x, y) {
        var powerUpSpeed = -75;
        
        var power02 = powerUp02.getFirstExists(false);
        
        if (power02) {
            power02.reset(x, y);
            power02.body.velocity.x = powerUpSpeed;
        }
    },
    
    deployPowerUps03: function(x, y) {
        var powerUpSpeed = -75;
        
        var power03 = powerUp03.getFirstExists(false);
        
        if (power03) {
            power03.reset(x, y);
            power03.body.velocity.x = powerUpSpeed;
        }

    },  
    
    collectPowerUp01: function(player, powerUp) {
        powerUp.kill();

        if (player == player01) {
            player01Weapon = 1;
            scorePlayer01 += 75;
            player01ScoreText.text = 'Score: ' + scorePlayer01;
        } else if (player == player02) {
            player02Weapon = 1;
            scorePlayer02 += 75;
            player02ScoreText.text = 'Score: ' + scorePlayer02;
        }

        floatPowerUp01Text = game.add.text(powerUp.x, powerUp.y, "TRIPLE SHOT" , {font: '10px PrStart', fill: '#ffffff'});
        floatPowerUp01Text.alpha = 0;
        
        showPoints = game.add.tween(floatPowerUp01Text).to({x:powerUp.x,y:powerUp.y - 50,alpha: 1},1000, Phaser.Easing.Linear.None, true);    
        
        showPoints.onComplete.add(function() {
                                    floatPowerUp01Text.kill();
                                    }, this);

        powerUpSFX.play();
        powerUpSFX.volume = 0.2;
    }, 

    collectPowerUp02: function(player, powerUp) {
        powerUp.kill();

        if (player == player01) {
            player01Weapon = 2;
            scorePlayer01 += 75;
            player01ScoreText.text = 'Score: ' + scorePlayer01;
        } else if (player == player02) {
            player02Weapon = 2;
            scorePlayer02 += 75;
            player02ScoreText.text = 'Score: ' + scorePlayer02;
        }

        floatPowerUp02Text = game.add.text(powerUp.x, powerUp.y, "QUICK SHOT" , {font: '10px PrStart', fill: '#ffffff'});
        floatPowerUp02Text.alpha = 0;
        
        showPoints = game.add.tween(floatPowerUp02Text).to({x:powerUp.x,y:powerUp.y - 50,alpha: 1},1000, Phaser.Easing.Linear.None, true);    
        
        showPoints.onComplete.add(function() {
                                    floatPowerUp02Text.kill();
                                    }, this);

        powerUpSFX.play();
        powerUpSFX.volume = 0.7;
    }, 

    collectPowerUp03: function(player, powerUp) {
        powerUp.kill();

        if (player == player01) {
            player01Weapon = 3;
            scorePlayer01 += 75;
            player01ScoreText.text = 'Score: ' + scorePlayer01;
        } else if (player == player02) {
            player02Weapon = 3;
            scorePlayer02 += 75;
            player02ScoreText.text = 'Score: ' + scorePlayer02;
        }

        floatPowerUp03Text = game.add.text(powerUp.x, powerUp.y, "CROSS SHOT" , {font: '10px PrStart', fill: '#ffffff'});
        floatPowerUp03Text.alpha = 0;
        
        showPoints = game.add.tween(floatPowerUp03Text).to({x:powerUp.x,y:powerUp.y - 50,alpha: 1},1000, Phaser.Easing.Linear.None, true);    
        
        showPoints.onComplete.add(function() {
                                    floatPowerUp03Text.kill();
                                    }, this);
        powerUpSFX.play();
        powerUpSFX.volume = 0.7;
    }, 

    //GAIN LIVES
    checkScore: function() {
        if (scorePlayer01 >= this.gainplayer01Lives) {
            this.player01Lives += 1;
            player01LivesText.text = 'x' + this.player01Lives;
            upSound.play();
            upSound.volume = 0.15;
            this.gainplayer01Lives += this.gainplayer01Lives;
            console.log(this.gainplayer01Lives);
        } else if (scorePlayer02 >= this.gainplayer02Lives) {
            this.player02Lives += 1;
            player02LivesText.text = 'x' + this.player02Lives;
            upSound.play();
            upSound.volume = 0.15;
            this.gainplayer02Lives += 1000; 
        }
    },
    
    gameOverScreen: function(winOrLose) {
        //PHASER-INPUT PLUGIN
        game.add.plugin(PhaserInput.Plugin);
        
        game.input.keyboard.removeKey(Phaser.Keyboard.P);
        game.input.keyboard.removeKey(Phaser.Keyboard.TWO);

        if (winOrLose == false) {
            var gameOverTheme = game.add.audio('gameOverTheme');        
            
            var fadeOffScreen01 = game.add.tileSprite(0, 0, 1280, 720, 'fadeScreen');
            fadeOffScreen01.alpha = 0;

            var gameOverText = game.add.text(game.width/2, game.height/2, '-GAME OVER-', {font: '30px PrStart', fill: '#ffffff'});
            gameOverText.anchor.setTo(0.5, 0.5);


            var fadeOutStageMusic = game.add.tween(this.stageMusic).to({volume:0}, 3000).start();
            var fadeOutBossMusic = game.add.tween(this.boss01Theme).to({volume:0}, 3000).start();
            fadeOutStageMusic.onComplete.add(function() {
                                                this.stageMusic.stop();
                                                missionFail.play();
                                            }, this);
            fadeOutBossMusic.onComplete.add(function() {
                                                this.boss01Theme.stop();
                                                missionFail.play();
                                            }, this);
        } else if (winOrLose == true) {
            var gameOverTheme = game.add.audio('stageClearTheme');        
            
            var fadeOffScreen01 = game.add.tileSprite(0, 0, 1280, 720, 'fadeScreen');
            fadeOffScreen01.alpha = 0;

            var gameOverText = game.add.text(game.width/2, game.height/2, '-STAGE CLEAR-', {font: '30px PrStart', fill: '#ffffff'});
            gameOverText.anchor.setTo(0.5, 0.5);

            var fadeOutStageMusic = game.add.tween(this.stageMusic).to({volume:0}, 3000).start();
            var fadeOutBossMusic = game.add.tween(this.boss01Theme).to({volume:0}, 3000).start();
            fadeOutStageMusic.onComplete.add(function() {
                                                this.stageMusic.stop();
                                                stageClear.play();
                                            }, this);
            fadeOutBossMusic.onComplete.add(function() {
                                                this.boss01Theme.stop();
                                                stageClear.play();
                                            }, this);
        }

        var showGameOver = game.add.tween(fadeOffScreen01).to({alpha:1},3000, Phaser.Easing.Linear.None, true);    

        showGameOver.onComplete.add(function() {
            gameOverTheme.fadeIn(4000);
            showText = game.add.tween(gameOverText).to({y:game.height/2 - 200},1000, Phaser.Easing.Linear.None, true); 
            showText.onComplete.add(function() {
                
                var scoresText = game.add.text(game.width/2 , game.height/2 - 145, '-Scores-', {font: '25px PrStart', fill: '#fff'});
                scoresText.anchor.setTo(0.5, 0.5);
                
                var player01Scores = game.add.text(game.width/2, game.height/2 - 105, this.player01Name + ': ' + scorePlayer01 + 'pt.', {font: '20px PrStart', fill: '#fff'});
                player01Scores.anchor.setTo(0.5, 0.5);

                var player01ScoreName = game.add.inputField(game.width/2 - 170, game.height/2 - 80, {
                    font: '20px PrStart',
                    fill: '#002054',
                    fontWeight: 'bold',
                    width: 300,
                    height: 25,
                    padding: 20,
                    borderWidth: 1,
                    borderColor: '#000',
                    borderRadius: 6,
                    placeHolder: 'Enter your name',
                    type: PhaserInput.InputType.text,
                    min: "1",
                    max: "10"
                });

                if (multiPlayer == true) {
                    var player02Scores = game.add.text(game.width/2, game.height/2 + 30, this.player02Name + ': ' + scorePlayer02 + 'pt.', {font: '20px PrStart', fill: '#fff'});
                    player02Scores.anchor.setTo(0.5, 0.5);

                    var player02ScoreName = game.add.inputField(game.width/2 - 170, game.height/2 + 55, {
                        font: '20px PrStart',
                        fill: '#540000',
                        fontWeight: 'bold',
                        width: 300,
                        height: 25,
                        padding: 20,
                        borderWidth: 1,
                        borderColor: '#000',
                        borderRadius: 6,
                        placeHolder: 'Enter your name',
                        type: PhaserInput.InputType.text,
                        min: "1",
                        max: "10"
                    });
                }
                
                var submit = game.add.sprite(game.width / 2, 550, 'submitButton');
                submit.anchor.setTo(0.5, 0.5);
                
                submit.inputEnabled = true;
                submit.input.useHandCursor = true;

                submit.events.onInputDown.add(function() {
                    this.selectedSound.play();
                    this.selectedSound.volume = 0.2;

                    //SEND REQUEST
                    //Open the request
                    var sendScore = new XMLHttpRequest();
                    sendScore.open('POST', './web/scoreSend.php', true);
                    var nm = new FormData();
                    //Values to send
                    var nameVariable01 = player01ScoreName.value;
                    //If name is blank enter a default name
                    if (nameVariable01 == "") {
                        nameVariable01 = "Player 01";
                    } 
                    //If not, send the name entered by the player
                    nm.append("nameVariable01", nameVariable01);
                    nm.append("scorePlayer01", scorePlayer01);
                    //If there is a second player, do the same with him/her
                    if (multiPlayer == true) {
                        var nameVariable02 = player02ScoreName.value;
                        if (nameVariable02 == "") {
                            nameVariable02 = "Player 02";
                        }
                        nm.append("nameVariable02", nameVariable02);
                        nm.append("scorePlayer02", scorePlayer02);
                    }
                    //Send the form
                    sendScore.send(nm);   

                    var fadeOffScreen02 = game.add.tileSprite(0, 0, 1280, 720, 'fadeScreen');
                    fadeOffScreen02.alpha = 0;
                    //Fade to black and go to the scores state
                    fadeOutState(fadeOffScreen02, 'scores', gameOverTheme);

                }, this);

            ;}, this);
            
        ;}, this);
    },
}