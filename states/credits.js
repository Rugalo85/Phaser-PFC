var creditState = {
    create: function() {
        splashMusic.stop();
        this.creditsMusic = game.add.audio('creditsTheme');

        addParallax('parallaxCredits01', 'parallaxCredits03', 'parallaxCredits02');

        var gameTitle = game.add.text(game.width/2, 150, 'Credits', {font: '50px PrStart', fill: '#ffffff'});
        gameTitle.anchor.setTo(0.5, 0.5);
        
        //mute button
        muteButtonOff = game.add.sprite(game.width - 30, 30, 'muteOff');
        muteButtonOff.anchor.setTo(0.5, 0.5);
        muteButtonOff.scale.setTo(0.5, 0.5);
        muteButtonOff.inputEnabled = true;
        muteButtonOff.input.useHandCursor = true; 
        muteSoundButtons(muteButtonOff);

        //controls info
        controlsInfo = game.add.text(game.width/2, 30, 'B back / M mute', {font: '12px PrStart', fill: '#ffffff'});
        controlsInfo.anchor.setTo(0.5, 0.5);
        
        
        var creditsText = game.add.group();
        creditsText.setAll('anchor.x', 0.5);
        creditsText.setAll('anchor.y', 0.5);
    
        
        //var creditsJSON = game.cache.getJSON('credits');
        
        /*var first = game.add.text(game.width/2 - 75, 500, 'Player name: ' + creditsJSON.name, {font: '20px PrStart', fill: '#ffffff'});
        first.anchor.setTo(0, 0.5);
        first.alpha = 0;*/
        
        var creditsJSON = game.cache.getJSON('credits');
        
        for (var i = 0; i < creditsJSON.length; i++){        
            var first = game.add.text(game.width/2 - 75, 500, 'Player name: ' + creditsJSON[i], {font: '20px PrStart', fill: '#ffffff'});
            first.anchor.setTo(0, 0.5);
        }

        /*
        var first = game.add.text(game.width/2 - 75, 350, 'Player name: ' + creditsJSON.player[0], {font: '20px PrStart', fill: '#ffffff'});
        first.anchor.setTo(0, 0.5);
        
        var first = game.add.text(game.width/2 - 75, 380, 'Player age: ' + creditsJSON.player[1], {font: '20px PrStart', fill: '#ffffff'});
        first.anchor.setTo(0, 0.5);
        
        var first = game.add.text(game.width/2 - 75, 410, 'Player height: ' + creditsJSON.player[2], {font: '20px PrStart', fill: '#ffffff'});
        first.anchor.setTo(0, 0.5);
*/
        fadeScreen = game.add.tileSprite(0, 0, 1280, 720, 'fadeScreen');
        fadeScreen.alpha = 1;
        fadeInState(fadeScreen, this.creditsMusic);
        /*
        game.time.events.add(1500, function() {
            game.add.tween(first).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
        }, this);
        game.time.events.add(1500, function() {
                game.add.tween(first).to({y: 150}, 7000, Phaser.Easing.Linear.None, true);
        }, this);
        game.time.events.add(8000, function() {
                game.add.tween(first).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
        }, this);
*/
    },

    update: function() {
        //parallax images movement
        parallax01.tilePosition.x -= 0.1;
        parallax02.tilePosition.x -= 0.8;
        parallax03.tilePosition.x -= 0.5;
                
        if(game.input.keyboard.isDown(Phaser.Keyboard.B)) {
            fadeOutState(fadeScreen, 'menu', this.creditsMusic);
        }   
    },
    
    readJson: function() {
        var creditsJSON = game.cache.getJSON('credits');
        
        creditsJSON.artwork;
            
        for (var i = 0; i < creditsJSON.length; i++){        
            var first = game.add.text(game.width/2 - 75, 500, 'Player name: ' + creditsJSON[i], {font: '20px PrStart', fill: '#ffffff'});
            first.anchor.setTo(0, 0.5);
            first.alpha = 0;

        }
    },
}
