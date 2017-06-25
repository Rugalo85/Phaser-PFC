/////////////////////
//---SPLASH STATE--//
/////////////////////

var splashState = {
    create: function() {
        //Backgound color
        game.stage.backgroundColor = "#FFFFFF";

        //Music - split into 2 tracks (splashscreen and menu)
        splashScreenTheme = game.add.audio('splashScreenTheme');

        //Mute button
        muteButtonOff = game.add.sprite(game.width - 30, 30, 'muteOff');
        muteButtonOff.anchor.setTo(0.5, 0.5);
        muteButtonOff.scale.setTo(0.5, 0.5);
        muteButtonOff.inputEnabled = true;
        muteButtonOff.input.useHandCursor = true;   
        muteSoundButtons(muteButtonOff);
        
        //LOGOS
        //CeedCV
        poweredLogo = game.add.sprite(game.width/2, game.height/2, 'powered-logo');
        poweredLogo.anchor.setTo(0.5, 0.5);
        poweredLogo.scale.setTo(0.85, 0.85);
        poweredLogo.alpha = 0;

        //Author name
        rubenLogo = game.add.sprite(game.width/2, 210, 'ruben-logo');
        rubenLogo.scale.setTo(0.6, 0.7);
        rubenLogo.anchor.setTo(0.5, 0.5);
        rubenLogo.alpha = 0;

        //Presents
        presents = game.add.text(game.width/2, 325, '-PRESENTS-', {font: '20px PrStart', fill: '#000000'});
        presents.anchor.setTo(0.5, 0.5);
        presents.alpha = 0;

        //Author spritesheet
        ruben = game.add.sprite(-175, 350, 'ruben');
        game.physics.arcade.enable(ruben);
        ruben.anchor.setTo(0.5, 0.5);
        ruben.scale.x = -1;

        //ANIMATION
        //Animation begins
        run = ruben.animations.add('run');
        ruben.animations.play('run', 20, true);

        //Beginning of the fade-in and fade-out events
        splashScreenTheme.play();
        splashScreenTheme.volume = 0.2;

        //CeedCV logo
        game.time.events.add(500, function() {
            game.add.tween(poweredLogo.scale).to({x:0.95, y:0.95} , 3000, Phaser.Easing.Linear.None, true);
            game.add.tween(poweredLogo).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);     
        }, this);
        game.time.events.add(2500, function() {
            game.add.tween(poweredLogo).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
        }, this);

        //Author logo
        game.time.events.add(4000, function() {
            ruben.body.velocity.setTo(315, 0);
            game.add.tween(rubenLogo.scale).to({x:0.7, y:0.9} , 4000, Phaser.Easing.Linear.None, true);
            game.add.tween(rubenLogo).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
        }, this);

        //Presents
        game.time.events.add(6450, function() {
            game.add.tween(presents).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
        }, this);

        //Author logo disappears
        game.time.events.add(7000, function() {
            game.add.tween(rubenLogo).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
        }, this);
        game.time.events.add(9150, function() { this.start() }, this);

        //Pressing SPACEBAR skips the splash screen
        intro = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        intro.onDown.addOnce(this.start, this);
    },

    start: function() {
        splashScreenTheme.stop('splash');

        //4th MENU STATE
        game.state.start('menu');
    }
}