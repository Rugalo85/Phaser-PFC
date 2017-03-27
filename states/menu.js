var menuState = {

    create: function() {
        //main menu background using parallax effect
        //background colour
        this.game.stage.backgroundColor = '#697e96';

        //parallax images
        this.parallax01 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('parallaxMenu01').height,
            this.game.width,
            this.game.cache.getImage('parallaxMenu01').height,
            'parallaxMenu01');
        this.parallax02 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('parallaxMenu02').height,
            this.game.width,
            this.game.cache.getImage('parallaxMenu02').height,
            'parallaxMenu02');
        this.parallax03 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('parallaxMenu03').height,
            this.game.width,
            this.game.cache.getImage('parallaxMenu03').height,
            'parallaxMenu03');
/*
        //menu theme
        var music = game.add.audio('mainMenuMusic');
        music.loop = true;
        music.play();
*/
        //menu title
        var gameTitle = game.add.text(game.width/2, 150, 'Zephyrus Project', {font: '50px press_start', fill: '#ffffff'});
        gameTitle.anchor.setTo(0.5, 0.5);

        //menu options
        //press start to open the menu
        var gameStart = game.add.text(game.width/2, 500, 'Press the SPACE BAR to start', {font: '15px press_start', fill: '#ffffff'});
        gameStart.anchor.setTo(0.5, 0.5);

        //pressing the SPACE BAR begins the game
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.addOnce(this.start, this);
    },

    update: function() {
        //parallax images movement
        this.parallax01.tilePosition.x -= 0.2;
        this.parallax02.tilePosition.x -= 0.7;
        this.parallax03.tilePosition.x -= 1;
    },

    start: function() {
        //loading fifth state, GAME
        game.state.start('game');
        /*
        music.stop();
        */
    }
}

