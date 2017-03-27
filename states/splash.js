var splashState = {

    create: function() {
        //backgound colour
        game.stage.backgroundColor = "#FFFFFF";

        //music
        var music = game.add.audio('splashScreenTheme');

        //logos
        var ceedcvLogo = game.add.sprite(game.width/2, game.height/2, 'ceedcv-logo');
        ceedcvLogo.anchor.setTo(0.5, 0.5);
        ceedcvLogo.alpha = 0;

        var rubenLogo = game.add.sprite(game.width/2, game.height/2, 'ruben-logo');
        rubenLogo.scale.setTo(0.5, 0.5);
        rubenLogo.anchor.setTo(0.5, 0.5);
        rubenLogo.alpha = 0;

        //beginning of the fade-in and fade-out events
        music.volume = 0.5;
        music.play();
        //CEEDCV logo
        game.time.events.add(500, function() {
            game.add.tween(ceedcvLogo).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
        }, this);
        game.time.events.add(2500, function() {
            game.add.tween(ceedcvLogo).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
        }, this);

        //RUBEN logo
        game.time.events.add(4000, function() {
            game.add.tween(rubenLogo).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
        }, this);
        game.time.events.add(7000, function() {
            game.add.tween(rubenLogo).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
        }, this);

        //MENU state
        game.time.events.add(9000, function() { this.start() }, this);

        //pressing the SPACE BAR skips the splash screen
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.addOnce(this.start, this);
    },

    start: function() {
        //loading fourth state, MAIN MENU
        game.state.start('menu');
    }
}
