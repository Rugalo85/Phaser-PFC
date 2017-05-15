var optionState = {
    create: function() {
        //PARALLAX
        addParallax('parallaxOptions01', 'parallaxOptions03', 'parallaxOptions02');
        this.optionsMusic = game.add.audio('optionsTheme');
        
        var gameTitle = game.add.text(game.width/2, 150, 'Options', {font: '50px PrStart', fill: '#ffffff'});
        gameTitle.anchor.setTo(0.5, 0.5);
        
        //mute button
        muteButtonOff = game.add.sprite(game.width - 30, 30, 'muteOff');
        muteButtonOff.anchor.setTo(0.5, 0.5);
        muteButtonOff.scale.setTo(0.5, 0.5);
        muteButtonOff.inputEnabled = true;
        muteButtonOff.input.useHandCursor = true; 
        muteSoundButtons(muteButtonOff);
        
        //controls info
        controlsInfo = game.add.text(game.width/2, 30, 'W up, S down / SPACEBAR intro / B back /   M mute', {font: '12px PrStart', fill: '#ffffff'});
        controlsInfo.anchor.setTo(0.5, 0.5);
        
        fadeScreen = game.add.tileSprite(0, 0, 1280, 720, 'fadeScreen');
        fadeScreen.alpha = 1;
        fadeInState(fadeScreen, this.optionsMusic);
        
    },

    update: function() {
        //parallax images movement
        parallax01.tilePosition.x -= 0.2;
        parallax02.tilePosition.x -= 0.7;
        parallax03.tilePosition.x -= 1;
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.B)) {
            fadeOutState(fadeScreen, 'menu', this.optionsMusic);
        }  
    }   
}

