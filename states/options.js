var optionState = {
    create: function() {
        //PARALLAX
        addParallax('parallaxOptions01', 'parallaxOptions03', 'parallaxOptions02');
        this.creditsMusic = game.add.audio('creditsTheme');
        
        var gameTitle = game.add.text(game.width/2, 150, 'Options', {font: '50px PrStart', fill: '#ffffff'});
        gameTitle.anchor.setTo(0.5, 0.5);
        
        fadeScreen = game.add.tileSprite(0, 0, 1280, 720, 'fadeScreen');
        fadeScreen.alpha = 1;
        fadeInState(fadeScreen, this.creditsMusic);
        
    },

    update: function() {
        //parallax images movement
        parallax01.tilePosition.x -= 0.2;
        parallax02.tilePosition.x -= 0.7;
        parallax03.tilePosition.x -= 1;
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.B)) {
            fadeOutState(fadeScreen, 'menu', this.creditsMusic);
        }  
    }   
}

