var splashMusic;

var splashState = {

    create: function() {
        //backgound colour
        game.stage.backgroundColor = "#FFFFFF";

        //music - split into 2 tracks (splashscreen and menu)
        splashMusic = game.add.audio('splashScreenTheme');
        splashMusic.allowMultiple = true;
        //music markers /name, start, end/
        splashMusic.addMarker('splash', 0, 8.83);
        splashMusic.addMarker('menu', 8.83, 110);

        //LOGOS
        //CEEDCV - anchor and transparency edited
        var ceedcvLogo = game.add.sprite(game.width/2, game.height/2, 'ceedcv-logo');
        ceedcvLogo.anchor.setTo(0.5, 0.5);
        ceedcvLogo.alpha = 0;

        //RUBEN name - scaled, anchor and transparency edited
        var rubenLogo = game.add.sprite(game.width/2, 210, 'ruben-logo');
        rubenLogo.scale.setTo(0.6, 0.7);
        rubenLogo.anchor.setTo(0.5, 0.5);
        rubenLogo.alpha = 0;

        //PRESENTS text
        var presents = game.add.text(game.width/2, 325, '-PRESENTS-', {font: '20px PrStart', fill: '#000000'});
        presents.anchor.setTo(0.5, 0.5);
        presents.alpha = 0;

        //RUBEN spritesheet - scaled, body enabled and sprite reversed
        var ruben = game.add.sprite(-175, 350, 'ruben');
        game.physics.arcade.enable(ruben);
        ruben.anchor.setTo(0.5, 0.5);
        ruben.scale.x = -1;
        
        //ANIMATION - starts out of the screen
        var run = ruben.animations.add('run');
        var animation = ruben.animations.play('run', 20, true);

        //beginning of the fade-in and fade-out events
        splashMusic.play('splash', 0, 0.1);

        //CEEDCV logo
        game.time.events.add(500, function() {
            game.add.tween(ceedcvLogo.scale).to({x:1.1, y:1.1} , 3000, Phaser.Easing.Linear.None, true);
            game.add.tween(ceedcvLogo).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
        }, this);
        game.time.events.add(2500, function() {
            game.add.tween(ceedcvLogo).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
        }, this);

        //RUBEN logo
        game.time.events.add(4000, function() {
            //animated sprite appears from left to right
            ruben.body.velocity.setTo(315, 0);
            game.add.tween(rubenLogo.scale).to({x:0.7, y:0.9} , 4000, Phaser.Easing.Linear.None, true);
            game.add.tween(rubenLogo).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
        }, this);

        game.time.events.add(6450, function() {
            game.add.tween(presents).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
        }, this);

        game.time.events.add(7000, function() {
            game.add.tween(rubenLogo).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
        }, this);

        //MENU state
        game.time.events.add(9150, function() { this.start() }, this);

        //pressing the SPACE BAR skips the splash screen
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.addOnce(this.start, this);
        //clicking or touching the screen skips the splash screen
        game.input.onDown.add(this.start, this);
    },

    start: function() {
        //loading fourth state, MAIN MENU
        splashMusic.stop('splash');
        game.state.start('menu');
        splashMusic.play('menu', 0, 0.1);
    }
}
