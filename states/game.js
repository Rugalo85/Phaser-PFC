//VARIABLES
//players
var player01;
var player02;
//scores
var scorePlayer01 = 0;
var scorePlayer02 = 0;
//shoots
var bulletsPlayer01;
var bulletsPlayer02;
var enemyBullets;
//enemies
var enemies01;
var enemies02;
var enemies03;
var enemies03Timer;
//HUD
var heart;
var player01Text;
var player01LivesText;
var player01ScoreText;
var player02Text;
var player02LivesText;
var player02ScoreText;

var gameState = {
    create: function() {
        game.input.enabled = true;
        addParallax('parallaxMenu01', 'parallaxMenu03', 'parallaxMenu02');
        
        //PLAYER 01 spaceship
        player01 = game.add.sprite(115, 300, 'player01');
        game.physics.enable(player01, Phaser.Physics.ARCADE);
        player01.anchor.setTo(0.5, 0.5);
        player01.scale.setTo(0.7, 0.7);        

        //PLAYER 01 HUD
        player01Text = game.add.text(20, 20, 'PLAYER1', {font: '20px PrStart', fill: '#fff' });
        heart = game.add.sprite(175, 20, 'heart');
        heart.scale.setTo(0.035, 0.035);
        player01LivesText = game.add.text(200, 20, 'x' + livesPlayer01,  {font: '20px PrStart', fill: '#fff' });
        player01ScoreText = game.add.text(275 , 20, 'Score:' + scorePlayer01, {font: '20px PrStart', fill: '#fff' });
        
        //IF multiPlayer variable has been pressed, add a second player
        if (multiPlayer == true) {
            this.addPlayer02();
        } else {
            //IF NOT, add an in-game option to add it when the second player press a button
            var pushStart02 = game.add.text(750, 20, 'PLAYER 2 PRESS P TO START', {font: '20px PrStart', fill: '#fff' });
            //PUSH START PLAYER 02
            blinkingText(pushStart02, 500);
                        
            pKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
            pKey.onDown.addOnce(function() {
                                    timer.stop();
                                    pushStart02.kill(); 
                                    multiPlayer = true;
                                    this.addPlayer02();
                                    }, this);
        }

        //Bullet group
        bulletsPlayer01 = game.add.group();
        bulletsPlayer01.enableBody = true;
        bulletsPlayer01.physicsBodyType = Phaser.Physics.ARCADE;
        bulletsPlayer01.createMultiple(30, 'bullet01');
        bulletsPlayer01.setAll('anchor.x', 0);
        bulletsPlayer01.setAll('anchor.y', 0.5); 
        bulletsPlayer01.setAll('outOfBoundsKill', true);
        bulletsPlayer01.setAll('checkWorldBounds', true);
        
        bulletsPlayer02 = game.add.group();
        bulletsPlayer02.enableBody = true;
        bulletsPlayer02.physicsBodyType = Phaser.Physics.ARCADE;
        bulletsPlayer02.createMultiple(30, 'bullet02');
        bulletsPlayer02.setAll('anchor.x', 0);
        bulletsPlayer02.setAll('anchor.y', 0.5); 
        bulletsPlayer02.setAll('outOfBoundsKill', true);
        bulletsPlayer02.setAll('checkWorldBounds', true);
        
        //First enemies - straigth line
        enemies01 = game.add.group();
        this.createEnemiesGroup(enemies01, 'enemy01', 0.6, 0.5);
        //this.deployEnemies01();
        
        //Second enemies - diagonal
        enemies02 = game.add.group();//First enemies - straigth lineroup();
        this.createEnemiesGroup(enemies02, 'enemy02', 0.7, 0.6);
        this.deployEnemies02();
        
        //Third enemies - squadron
        enemies03 = game.add.group();
        this.createEnemiesGroup(enemies03, 'enemy03', 0.7, 0.7);
        enemies03.setAll('outOfBoundsKill', false);
        //this.deployEnemies03();
    

        //Basic item
        points = game.add.sprite(500, 200, 'item01');
        game.physics.enable(points);
        points.scale.setTo(0.01, 0.01);
        
        //SFX
        upSound = game.add.audio('1up');
        coinSound = game.add.audio('coin');
        shootSound = game.add.audio('shoot');
        playerExplosion = game.add.audio('player_explosion');
        enemyExplosion = game.add.audio('enemy_explosion');
    },

    update: function() {
        //parallax images movement
        parallax01.tilePosition.x -= 0.2;
        parallax02.tilePosition.x -= 0.7;
        parallax03.tilePosition.x -= 1;
        
        //collisions between elements
        game.physics.arcade.overlap(player01, points, this.collectPoints, null, this);
        game.physics.arcade.overlap(player01, enemies01, this.killPlayer, null, this);
        game.physics.arcade.overlap(player01, enemies02, this.killPlayer, null, this);
        game.physics.arcade.overlap(player01, enemies03, this.killPlayer, null, this);
        
        game.physics.arcade.overlap(player02, points, this.collectPoints, null, this);
        game.physics.arcade.overlap(player02, enemies01, this.killPlayer, null, this);
        game.physics.arcade.overlap(player02, enemies02, this.killPlayer, null, this);
        game.physics.arcade.overlap(player02, enemies03, this.killPlayer, null, this);
        
        game.physics.arcade.overlap(bulletsPlayer01, enemies01, this.killEnemy01, null, this);
        game.physics.arcade.overlap(bulletsPlayer01, enemies02, this.killEnemy01, null, this);
        game.physics.arcade.overlap(bulletsPlayer01, enemies03, this.killEnemy01, null, this);
        
        game.physics.arcade.overlap(bulletsPlayer02, enemies01, this.killEnemy02, null, this);
        game.physics.arcade.overlap(bulletsPlayer02, enemies02, this.killEnemy02, null, this);
        game.physics.arcade.overlap(bulletsPlayer02, enemies03, this.killEnemy02, null, this);
        //player movement
        movePlayer(player01, speedPlayer01, Phaser.Keyboard.W, Phaser.Keyboard.S, Phaser.Keyboard.A, Phaser.Keyboard.D, Phaser.Keyboard.SPACEBAR, this.player01Shoot);
        if (multiPlayer == true) {
            movePlayer(player02, speedPlayer02, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.NUMPAD_0, this.player02Shoot);
        }
        this.checkScore();
        
    },
    
    //SEE HITBOXES
    /*render: function() {
        for (var i = 0; i < enemies01.length; i++) {
            game.debug.body(enemies01.children[i]);
        }
        for (var i = 0; i < enemies02.length; i++) {
            game.debug.body(enemies02.children[i]);
        }
        for (var i = 0; i < enemies03.length; i++) {
            game.debug.body(enemies03.children[i]);
        }
        
        game.debug.body(player01);
    },*/
    
    //PLAYER FUNCTIONS
    //Add the second player
    addPlayer02: function() {
        player02 = game.add.sprite(115, 400, 'player02');
        game.physics.enable(player02, Phaser.Physics.ARCADE);
        player02.anchor.setTo(0.5, 0.5);
        player02.scale.setTo(0.7, 0.7); 

        //HUD        
        player02Text = game.add.text(800, 20, 'PLAYER2', {font: '20px PrStart', fill: '#fff' });
        heart = game.add.sprite(955, 20, 'heart');
        heart.scale.setTo(0.035, 0.035);
        player02LivesText = game.add.text(980, 20, 'x' + livesPlayer02,  {font: '20px PrStart', fill: '#fff' });
        player02ScoreText = game.add.text(1055 , 20, 'Score:' + scorePlayer02, {font: '20px PrStart', fill: '#fff' }); 
    },

    player01Shoot: function() {
        //Grab the first bullet we can from the pool
        var bullet01 = bulletsPlayer01.getFirstExists(false);
        
        if (player01.alive) {
            if (bullet01) {
                bullet01.reset(player01.x + 50, player01.y + 20 );
                bullet01.body.velocity.x =  800;
            }
            shootSound.play();
        }
    },
    
    player02Shoot: function() {
        //Grab the first bullet we can from the pool
        var bullet02 = bulletsPlayer02.getFirstExists(false);
        
        if (player02.alive) {
            if (bullet02) {
                bullet02.reset(player02.x + 50, player02.y + 20 );
                bullet02.body.velocity.x =  800;
            }
            shootSound.play();
        }
    },
    
    //Remove lives from player
    killPlayer: function(player, enemy) {
        if (player == player01) {
            livesPlayer01--;
            player01LivesText.text = 'x' + livesPlayer01;
            player01.kill();
        } else if (player == player02) {
            livesPlayer02--;
            player02LivesText.text = 'x' + livesPlayer02;
            player02.kill();
        }
        playerExplosion.play();
        playerExplosion.volume = 0.3;
        
        return false;
    },
    
    //ENEMY FUNCTIONS
    //Function to create the enemies groups
    createEnemiesGroup: function(groupName, enemyName, scaleX, scaleY) {
        groupName.enableBody = true;
        groupName.physicsBodyType = Phaser.Physics.ARCADE;
        groupName.createMultiple(30, enemyName);
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

    //First enemies - straigth line
    deployEnemies01: function() {
        var minEnemySpacing = 300;
        var maxEnemySpacing = 3000;
        var enemySpeed = -20;
        
        var enemy = enemies01.getFirstExists(false);
        if (enemy) {
            enemy.reset(game.width, game.rnd.integerInRange(90, 650));
            enemy.body.velocity.x = enemySpeed;
            enemy.body.drag.x = -1000;

        }
        // Send another enemy
        game.time.events.add(game.rnd.integerInRange(minEnemySpacing, maxEnemySpacing), this.deployEnemies01, this);
    },
    
    //Second enemies - diagonal
    deployEnemies02: function() {
        var minEnemySpacing = 300;
        var maxEnemySpacing = 3000;
        var enemySpeed = -350;
        
        var enemy = enemies02.getFirstExists(false);
        if (enemy) {
            enemy.reset(game.width, game.rnd.integerInRange(90, 650));
            enemy.body.velocity.x = enemySpeed;
            enemy.body.velocity.y = game.rnd.integerInRange(-75, 75);
        }

        // Send another enemy
        game.time.events.add(game.rnd.integerInRange(minEnemySpacing, maxEnemySpacing), this.deployEnemies02, this);
    },
    
    //Third enemies - squadron
    deployEnemies03: function() {
        var startingY = game.rnd.integerInRange(90, 650);
        var horizontalSpeed = -180;
        var spread = 60;
        var frequency = 70;
        var horizontalSpacing = 75;
        var numEnemiesInWave = 5;
        var timeBetweenWaves = 3000;

        //Launch wave
        for (var i=0; i < numEnemiesInWave; i++) {
            var enemy = enemies03.getFirstExists(false);
            if (enemy) {
                enemy.startingY = startingY;
                enemy.reset(game.width + horizontalSpacing * i, startingY);
                enemy.body.velocity.x = horizontalSpeed;

                //Update function for each enemy
                enemy.update = function() {
                    //Wave movement
                    this.body.y = this.startingY + Math.sin((this.x) / frequency) * spread;

                    //Kill enemies once they go off screen
                    if (this.x < -100) {
                        this.kill();
                    }
                };
            }
        }
        //Send another wave soon
        enemies03Timer = game.time.events.add(timeBetweenWaves, this.deployEnemies03, this);
        },
    
    //Kill enemies function
    killEnemy01: function(enemy, bullets) {
        scorePlayer01 += 100;
        player01ScoreText.text = 'Score: ' + scorePlayer01;

        enemy.kill();
        bullets.kill();
        enemyExplosion.volume = 0.3;
        enemyExplosion.play();
        
        return false;
    },
    
    killEnemy02: function(enemy, bullets) {
        scorePlayer02 += 100;
        player02ScoreText.text = 'Score: ' + scorePlayer02;

        enemy.kill();
        bullets.kill();
        enemyExplosion.volume = 0.3;
        enemyExplosion.play();
        
        return false;
    },
    
    //ITEM FUNCTIONS
    //Gain points
    collectPoints: function(player, points) {
        //Delete the item once the player grabs it
        points.kill();
        
        if (player == player01) {
            scorePlayer01 += 500;
            player01ScoreText.text = 'Score: ' + scorePlayer01;
        } else if (player == player02) {
            scorePlayer02 += 500;
            player02ScoreText.text = 'Score: ' + scorePlayer02;
        }
        //Add the points to the score and update it
        coinSound.play();
    },

    //Add lives to the player
    checkScore: function() {
        if (scorePlayer01 >= gainLivesPlayer01) {
            livesPlayer01 += 1;
            player01LivesText.text = 'x' + livesPlayer01;
            upSound.play();
            gainLivesPlayer01 += 1000; 
        } else if (scorePlayer02 >= gainLivesPlayer02) {
            livesPlayer02 += 1;
            player02LivesText.text = 'x' + livesPlayer02;
            upSound.play();
            gainLivesPlayer02 += 1000; 
        }
    },
    
    //Change the shooting style
    collectPowerUps: function(player, powerUp) {
        
    },
    
}
