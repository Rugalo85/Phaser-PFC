//VARIABLES
var space;
var player;
var points;
var livesText;
var scoreText;
//velocidad de la nave
var speed = 8;
//puntuacion
var score = 0;
//vidas
var lives = 3;

var gameState = {
    create: function() {
        //creacion de fondo y cambio de altura-achura por el lienzo del juego
        space = game.add.sprite(0, 0, 'space-test');
        space.height = game.height;
        space.width = game.width;

        //creacion de la nave y cambio de la escala
        player = game.add.sprite(30, 300, 'ship-test');
        player.scale.setTo(0.2, 0.2);

        //creacion del item y cambio de la escala
        points = game.add.sprite(500, 200, 'points-test');
        points.scale.setTo(0.01, 0.01);

        //añadimos fisicas a la nave y a los items, choque con los limites
        game.physics.enable(player);
        game.physics.enable(points);
        player.body.collideWorldBounds = true;

        //HUD
        //vidas
        livesText = game.add.text(10, 10, 'Lives: ' + lives, { fontSize: '20px', fill: '#fff' });

        //puntuacion
        scoreText = game.add.text(100, 10, 'Score: ' + score, { fontSize: '20px', fill: '#fff' });
    },

    update: function() {
        game.physics.arcade.overlap(player, points, this.collectPoints, null, this);

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
    },

    //Funcion para recoger puntos
    collectPoints: function(player, points) {
        //borra el item de puntos de la pantalla
        points.kill();

        //suma y actualiza la puntuacion
        score += 10;
        scoreText.text = 'Score: ' + score;

        if (score == 10) {
            lives += 1;
            livesText.text = 'Lives: ' + lives;
        }
    }
}
