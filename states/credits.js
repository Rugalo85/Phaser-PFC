var creditState = {
    create: function() {
        splashMusic.stop();
        this.creditsMusic = game.add.audio('creditsTheme');

        addParallax('parallaxCredits01', 'parallaxCredits03', 'parallaxCredits02');

        var gameTitle = game.add.text(game.width/2, 150, 'Credits', {font: '50px PrStart', fill: '#ffffff'});
        gameTitle.anchor.setTo(0.5, 0.5);
        
        var creditsJSON = game.cache.getJSON('credits');
        
        var first = game.add.text(game.width/2 - 75, 500, 'Fruit: ' + creditsJSON.fruit, {font: '20px PrStart', fill: '#ffffff'});
        first.anchor.setTo(0, 0.5);
        first.alpha = 0;
        /*
        var second = game.add.text(game.width/2 - 75, 460, 'Size: ' + creditsJSON.size, {font: '20px PrStart', fill: '#ffffff'});
        second.anchor.setTo(0, 0.5);
        var third = game.add.text(game.width/2 - 75, 490, 'Size: ' + creditsJSON.color, {font: '20px PrStart', fill: '#ffffff'});
        third.anchor.setTo(0, 0.5);*/
        
        fadeScreen = game.add.tileSprite(0, 0, 1280, 720, 'fadeScreen');
        fadeScreen.alpha = 1;
        fadeInState(fadeScreen, this.creditsMusic);
        
        game.time.events.add(1500, function() {
            game.add.tween(first).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
        }, this);
        game.time.events.add(1500, function() {
                game.add.tween(first).to({y: 150}, 7000, Phaser.Easing.Linear.None, true);
        }, this);
        game.time.events.add(8000, function() {
                game.add.tween(first).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
        }, this);

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
}
