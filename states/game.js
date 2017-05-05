//VARIABLES
var player01;
var player02;

var score01 = 0;
var score02 = 0;

var bullets;
var enemyBullets;

var enemies01;
var enemies02;
var enemies03;
var enemies03Timer;

var heart;
var player01Text;
var lives01Text;
var score01Text;
var player02Text;
var lives02Text;
var score02Text;

var gameState = {
    create: function() {
        game.input.enabled = true;
        //creacion de fondo y cambio de altura-achura por el lienzo del juego
        this.parallax01 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('parallaxMenu01').height,
            this.game.width,
            this.game.cache.getImage('parallaxMenu01').height,
            'parallaxMenu01');
        /*this.parallax02 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('parallaxMenu02').height,
            this.game.width,
            this.game.cache.getImage('parallaxMenu02').height,
            'parallaxMenu02');*/
        this.parallax03 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('parallaxMenu03').height,
            this.game.width,
            this.game.cache.getImage('parallaxMenu03').height,
            'parallaxMenu03');
        
        //creacion de la nave y cambio de la escala
        player01 = game.add.sprite(115, 300, 'player01');
        game.physics.enable(player01, Phaser.Physics.ARCADE);
        player01.anchor.setTo(0.5, 0.5);
        player01.scale.setTo(0.7, 0.7);        

        //HUD
        player01Text = game.add.text(20, 20, 'PLAYER1', {font: '20px PrStart', fill: '#fff' });
        heart = game.add.sprite(175, 20, 'heart');
        heart.scale.setTo(0.035, 0.035);
        lives01Text = game.add.text(200, 20, 'x' + player01Lives,  {font: '20px PrStart', fill: '#fff' });
        score01Text = game.add.text(275 , 20, 'Score:' + score01, {font: '20px PrStart', fill: '#fff' });
        
        if (multiPlayer == true) {
            this.addPlayer02();            
        } else {
            var pushStart02 = game.add.text(750, 20, 'PLAYER 2 PRESS P TO START', {font: '20px PrStart', fill: '#fff' });
            
            var blinkText = game.time.events.add(0, function() {
                                        timer = game.time.create(false);	
                                        timer.loop(500, function() {
                                            if (pushStart02.exists) {
                                                pushStart02.kill();
                                            } else {
                                                pushStart02.revive();	
                                            }}, this);
                                        timer.start();
                                    }, this);
            
            pKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
            pKey.onDown.addOnce(function() {
                                    timer.stop();
                                    pushStart02.kill(); 
                                    multiPlayer = true;
                                    this.addPlayer02();
                                    }, this);
        }

        //creacion del grupo de disparos
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet');
        bullets.setAll('anchor.x', 0);
        bullets.setAll('anchor.y', 0.5); 
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);

        //creacion del grupo de enemigos que van en linea recta
        enemies01 = game.add.group();
        this.createEnemiesGroup(enemies01, 'enemy01', 0.6, 0.5);
        this.deployEnemies01();
        
        enemies02 = game.add.group();
        this.createEnemiesGroup(enemies02, 'enemy02', 0.7, 0.6);
        this.deployEnemies02();
        
        enemies03 = game.add.group();
        this.createEnemiesGroup(enemies03, 'enemy03', 0.7, 0.7);
        enemies03.setAll('outOfBoundsKill', false);
        this.deployEnemies03();
    

        //creacion del item y cambio de la escala
        points = game.add.sprite(500, 200, 'item01');
        game.physics.enable(points);
        points.scale.setTo(0.01, 0.01);
        
        //creacion de sonidos
        upSound = game.add.audio('1up');
        coinSound = game.add.audio('coin');
        shootSound = game.add.audio('shoot');
        playerExplosion = game.add.audio('player_explosion');
        enemyExplosion = game.add.audio('enemy_explosion');
    },

    update: function() {
        //parallax images movement
        this.parallax01.tilePosition.x -= 0.2;
        /*this.parallax02.tilePosition.x -= 0.7;*/
        this.parallax03.tilePosition.x -= 1;
        //choques entre elementos
        game.physics.arcade.overlap(player01, points, this.collectPoints, null, this);
        game.physics.arcade.overlap(player01, enemies01, this.killPlayer, null, this);
        game.physics.arcade.overlap(player01, enemies02, this.killPlayer, null, this);
        game.physics.arcade.overlap(player01, enemies03, this.killPlayer, null, this);
        
        game.physics.arcade.overlap(player02, points, this.collectPoints, null, this);
        game.physics.arcade.overlap(player02, enemies01, this.killPlayer, null, this);
        game.physics.arcade.overlap(player02, enemies02, this.killPlayer, null, this);
        game.physics.arcade.overlap(player02, enemies03, this.killPlayer, null, this);
        
        game.physics.arcade.overlap(bullets, enemies01, this.killEnemy, null, this);
        game.physics.arcade.overlap(bullets, enemies02, this.killEnemy, null, this);
        game.physics.arcade.overlap(bullets, enemies03, this.killEnemy, null, this);
        
        
        //movimiento del jugador
        this.movePlayer(player01, speed01);
        if (multiPlayer == true) {
            this.movePlayer(player02, speed02);
        }
        this.checkScore();
    },
    
    //FUNCION PARA VER LOS HITBOXES
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
    //Funcion para mover a la nave en un espacio limitado
    addPlayer02: function() {
        player02 = game.add.sprite(115, 400, 'player02');
        game.physics.enable(player02, Phaser.Physics.ARCADE);
        player02.anchor.setTo(0.5, 0.5);
        player02.scale.setTo(0.7, 0.7); 

        //HUD        
        player02Text = game.add.text(800, 20, 'PLAYER2', {font: '20px PrStart', fill: '#fff' });
        heart = game.add.sprite(955, 20, 'heart');
        heart.scale.setTo(0.035, 0.035);
        lives02Text = game.add.text(980, 20, 'x' + player02Lives,  {font: '20px PrStart', fill: '#fff' });
        score02Text = game.add.text(1055 , 20, 'Score:' + score02, {font: '20px PrStart', fill: '#fff' }); 
    },
    
    movePlayer: function(player, speed) {
        //derecha
        if(player == player01) {
            if(game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                player.x += speed;
            //izquierda
            } else if(game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                player.x -= speed;
            }
            //arriba
            if(game.input.keyboard.isDown(Phaser.Keyboard.W)) {
                player.y -= speed;
            //abajo
            } else if(game.input.keyboard.isDown(Phaser.Keyboard.S)) {
                player.y += speed;
            }
            
            shootKey01 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            shootKey01.onDown.add(this.standardShoot, this);
            
        } else if (player == player02) {
            if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                player.x += speed;
            //izquierda
            } else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                player.x -= speed;
            }
            //arriba
            if(game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                player.y -= speed;
            //abajo
            } else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                player.y += speed;
            }
            
            shootKey02 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0);
            shootKey02.onDown.add(this.standardShoot, this);
        }
        
        
        //choque del jugador con limites de pantalla
        if (player.x < 100) {
            player.x = 100;
        } else if (player.x > 1150) {
            player.x = 1150;
        }
        
        if (player.y < 90) {
            player.y = 90;
        } else if (player.y > 650) {
            player.y = 650;
        }
    },
    
    standardShoot: function() {
        //Grab the first bullet we can from the pool
        var bullet = bullets.getFirstExists(false);
        
        if (player01.alive) {
            if (bullet) {
                bullet.reset(player01.x + 50, player01.y + 20 );
                bullet.body.velocity.x =  800;
            }
            shootSound.play();
        }
    },
    
    //funcion para restar vidas al jugador
    killPlayer: function(player, enemy) {
        player01Lives--;
        lives01Text.text = 'x' + player01Lives;
        player.kill();
        
        playerExplosion.play();
        playerExplosion.volume = 0.3;
        
        return false;
    },
    
    //ENEMY FUNCTIONS
    
    createEnemiesGroup: function(groupName, enemyName, scaleX, scaleY) {
        //creacion del grupo de enemigos que van en linea recta
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

    //funcion para crear los enemigos
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
    
    //funcion para sumar vidas al jugador
    killEnemy: function(enemy, bullets) {
        score01 += 100;
        score01Text.text = 'Score: ' + score01;
        enemy.kill();
        bullets.kill();
        
        enemyExplosion.volume = 0.3;
        enemyExplosion.play();
        
        return false;
    },

    //ITEM FUNCTIONS
    //funcion para recolectar puntos de items
    collectPoints: function(player, points) {
        //borra el item de la pantalla
        points.kill();

        //suma y actualiza la puntuacion
        score01 += 500;
        score01Text.text = 'Score: ' + score01;
        coinSound.play();
    },

    //funcion para sumar vidas al jugador
    checkScore: function() {
        if (score01 >= gainLives) {
            player01Lives += 1;
            lives01Text.text = 'x' + player01Lives;
            upSound.play();
            
            gainLives += 1000; 
        }
    },
    
    //cambia el estilo de disparo
    collectPowerUps: function(player, powerUp) {
        
    },
    
}
