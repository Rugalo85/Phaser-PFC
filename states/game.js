//VARIABLES
var space;
var player;
var bullets;
var fireButton;
var points;
var enemies;
var livesText;
var scoreText;
var score = 0;



var gameState = {
    create: function() {
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
        player = game.add.sprite(150, 350, 'player');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.anchor.setTo(0.5, 0.5);
        player.scale.setTo(0.2, 0.2);        
        
        //creacion del grupo de disparos
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet');
        bullets.setAll('anchor.x', 0);
        bullets.setAll('anchor.y', 0.5); 
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);       
        
        //creacion del grupo de enemigos
        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
        enemies.createMultiple(1, 'enemy01');
        enemies.setAll('anchor.x', 0.5);
        enemies.setAll('anchor.y', 0.5);
        enemies.setAll('scale.x', 0.5);
        enemies.setAll('scale.y', 0.5);
        enemies.setAll('outOfBoundsKill', true);
        enemies.setAll('checkWorldBounds', true);        
        enemies.forEach(function(enemy){
            enemy.body.setSize(enemy.width * 2 / 3, enemy.height * 2 / 3);
        });

        this.deployEnemies();
        
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

        //HUD
        //vidas
        livesText = game.add.text(10, 10, 'Lives: ' + playerLives, { fontSize: '20px', fill: '#fff' });

        //puntuacion
        scoreText = game.add.text(200, 10, 'Score: ' + score, { fontSize: '20px', fill: '#fff' });
    },

    update: function() {
        //parallax images movement
        this.parallax01.tilePosition.x -= 0.2;
        /*this.parallax02.tilePosition.x -= 0.7;*/
        this.parallax03.tilePosition.x -= 1;
        //choques entre elementos
        game.physics.arcade.overlap(player, points, this.collectPoints, null, this);
        game.physics.arcade.overlap(player, enemies, this.killPlayer, null, this);
        game.physics.arcade.overlap(bullets, enemies, this.killEnemy, null, this);
        
        //movimiento del jugador
        this.movePlayer();
        this.checkScore();
    },
    
    //FUNCION PARA VER LOS HITBOXES
    render: function() {
        for (var i = 0; i < enemies.length; i++) {
            game.debug.body(enemies.children[i]);
        }
        game.debug.body(player);
    },
    
    //PLAYER FUNCTIONS
    //Funcion para mover a la nave en un espacio limitado
    movePlayer: function() {
        //derecha
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            player.x += speed;
        //izquierda
        } else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            player.x -= speed;
        }
        //arriba
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP) || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
            player.y -= speed;
        //abajo
        } else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            player.y += speed;
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
        
        //Disparos
        shootKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        shootKey.onDown.add(this.playerShoot, this);

    },
    
    playerShoot: function() {
        //Grab the first bullet we can from the pool
        var bullet = bullets.getFirstExists(false);
        
        if (player.alive) {
            if (bullet) {
                bullet.reset(player.x + 50, player.y);
                bullet.body.velocity.x =  800;
            }
            shootSound.play();
        }
    },
    
    //funcion para restar vidas al jugador
    killPlayer: function(player, enemy) {
        lives--;
        livesText.text = 'Lives: ' + lives;
        player.kill();
        
        playerExplosion.play();
        playerExplosion.volume = 0.5;
        
        return false;
    },
    
    //ENEMY FUNCTIONS
    //funcion para crear los enemigos
    deployEnemies: function() {
        var MIN_ENEMY_SPACING = 300;
        var MAX_ENEMY_SPACING = 3000;
        var ENEMY_SPEED = 3000;
        
        var enemy = enemies.getFirstExists(false);
        if (enemy) {
            enemy.reset(game.width, game.rnd.integerInRange(90, 650));
            enemy.body.velocity.x = -300;
        }
        //  Send another enemy soon
        game.time.events.add(game.rnd.integerInRange(MIN_ENEMY_SPACING, MAX_ENEMY_SPACING), this.deployEnemies, this);
    },

    //funcion para sumar vidas al jugador
    killEnemy: function(enemy, bullets) {
        score += 100;
        scoreText.text = 'Score: ' + score;
        enemy.kill();
        bullets.kill();
        
        enemyExplosion.volume = 0.5;
        enemyExplosion.play();
        
        return false;
    },

    //ITEM FUNCTIONS
    //funcion para recolectar puntos de items
    collectPoints: function(player, points) {
        //borra el item de la pantalla
        points.kill();

        //suma y actualiza la puntuacion
        score += 500;
        scoreText.text = 'Score: ' + score;
        coinSound.play();
    },

    //funcion para sumar vidas al jugador
    checkScore: function() {
        if (score >= gainLives) {
            playerLives += 1;
            livesText.text = 'Lives: ' + playerLives;
            upSound.play();
            
            gainLives += 1000; 
        }
    }
}
