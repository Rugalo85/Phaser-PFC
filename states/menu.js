var menuState = {

    create: function() {
        //main menu background using parallax effect
        //background colour
        this.game.stage.backgroundColor = '#697e96';

        this.selectSound = game.add.audio('select');
        this.selectSound.volume = 0.1;

        //parallax images
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

        //menu title
        var gameTitle = game.add.text(game.width/2, 150, 'Zephyrus Project', {font: '50px PrStart', fill: '#ffffff'});
        gameTitle.anchor.setTo(0.5, 0.5);

        //menu options
        //press start to open the menu
        this.pushStart = game.add.text(game.width/2, 460, 'Press the SPACE BAR', {font: '20px PrStart', fill: '#ffffff'});
        this.pushStart.anchor.setTo(0.5, 0.5);

        //pressing the SPACE BAR begins the game
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.addOnce(this.deployMenu, this);
    },

    update: function() {
        //parallax images movement
        this.parallax01.tilePosition.x -= 0.2;
       /*this.parallax02.tilePosition.x -= 0.7;*/
        this.parallax03.tilePosition.x -= 1;
        this.moveMenu();
    },

    deployMenu: function() {
        this.pushStart.kill();

        this.arrow = game.add.sprite(540, 425, 'arrow');
        this.arrow.anchor.setTo(0.5, 0.5);
        this.arrow.scale.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.arrow);


        this.gameText = game.add.text(game.width/2, 430, 'New Game', {font: '20px PrStart', fill: '#ffffff'});
        this.gameText.anchor.setTo(0.5, 0.5);

        this.optionText = game.add.text(game.width/2, 460, 'Options', {font: '20px PrStart', fill: '#ffffff'});
        this.optionText.anchor.setTo(0.5, 0.5);

        this.creditText = game.add.text(game.width/2, 490, 'Credits', {font: '20px PrStart', fill: '#ffffff'});
        this.creditText.anchor.setTo(0.5, 0.5);
    },

    moveMenu: function(y) {
        down = game.input.keyboard.isDown(Phaser.Keyboard.S);
        up = game.input.keyboard.isDown(Phaser.Keyboard.W);
        intro = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        left = game.input.keyboard.addKey(Phaser.Keyboard.A);
        right = game.input.keyboard.addKey(Phaser.Keyboard.D);

        if(down) {
            this.selectSound.play();
            this.arrow.y += 30;
            if(this.arrow.y > 490) {
                this.arrow.y = 490;
            }
        } else if (up) {
            this.selectSound.play();
            this.arrow.y -= 30;
            if(this.arrow.y < 425) {
                this.arrow.y = 425;
            }
        }

        /*
function movePlayer(x, y) {  // Because we're adding 32 to the player's position, we need to prevent cases where the user tries to move  // the player mid-move, knocking it off the grid. This is a crude way to do it but it works.
    if (this.arrow.isMoving) {
        return; }
    this.arrow.isMoving = true;  // Tween the player to the next grid space over 250ms, and when done, allow the player to make another move
    game.add.tween(player).to({x: player.x + x * 32, y: player.y + y * 32}, 250, Phaser.Easing.Quadratic.InOut, true).onComplete.add(function() { player.isMoving = false;}, this);}


        */
    },

    start: function() {
        //loading fifth state, GAME
        game.state.start('game');
        game.splashMusic.stop();
    },

    options: function() {

        game.splashMusic.stop();
    },

    credits: function() {

        game.splashMusic.stop();
    },

    return: function() {
        game.state.start('splash');
        game.splashMusic.stop();
    }


}


