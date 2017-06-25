/////////////////////
//---SCORE STATE---//
/////////////////////

var scoreState = {
    preload: function() {
        //Load the scores in case they are accesde directly
        game.load.json('scoresUpdated', './assets/json/scores.json');
    },
    
    create: function() {
        //Reset the multiplayer variable
        multiplayer = false;

        //JSON with scores
        var scoresTable = game.cache.getJSON('scoresUpdated');

        //Parallax background
        addParallax('parallaxStage01', 'parallaxStage02', 'parallaxStage03', 'parallaxStage04', 0);

        //Logo
        scoresLogo = game.add.sprite(game.width/2, game.height/2 - 225, 'scoresLogo');
        scoresLogo.anchor.setTo(0.5, 0.5); 
        
        //Mute button
        muteButtonOff = game.add.sprite(game.width - 30, 30, 'muteOff');
        muteButtonOff.anchor.setTo(0.5, 0.5);
        muteButtonOff.scale.setTo(0.5, 0.5);
        muteButtonOff.inputEnabled = true;
        muteButtonOff.input.useHandCursor = true; 
        muteSoundButtons(muteButtonOff);

        //Controls info
        controlsInfo = game.add.text(game.width/2, 30, 'B back', {font: '12px PrStart', fill: '#ffffff'});
        controlsInfo.anchor.setTo(0.5, 0.5);

        //Table
        rankNumberTable = game.add.text(game.width/2 - 225, 225, 'PLACE', {font: '24px PrStart', fill: '#ffffff'});
        rankNumberTable.anchor.setTo(0.5, 0.5);

        playerNameTable = game.add.text(game.width/2 - 90, 225, 'PLAYER', {font: '24px PrStart', fill: '#ffffff'});
        playerNameTable.anchor.setTo(0, 0.5);

        playerScoreTable = game.add.text(game.width/2 + 225, 225, 'SCORE', {font: '24px PrStart', fill: '#ffffff'});
        playerScoreTable.anchor.setTo(0.5, 0.5);

        //Print the scores with a loop
        for(var i = 0; i < scoresTable.length; i++) {
            number = game.add.text(game.width/2 - 225, 265 + (i * 35), i+1, {font: '18px PrStart', fill: '#ffffff'});
            number.anchor.setTo(0.5, 0);

            var obj = scoresTable[i];
            playerNamee = game.add.text(game.width/2 - 90, 265 + (i * 35), obj.playerName, {font: '18px PrStart', fill: '#ffffff'});
            playerScoree = game.add.text(game.width/2 + 175, 265 + (i * 35), obj.playerScore + 'pts', {font: '18px PrStart', fill: '#ffffff'});
        }

        //Fade in screen
        fadeScreen = game.add.tileSprite(0, 0, 1280, 720, 'fadeScreen');
        fadeScreen.alpha = 1;
        this.scoresMusic = game.add.audio('scoresTheme');
        fadeInState(fadeScreen, this.scoresMusic);

        //Fade out screen
        game.time.events.add(30000, function(){
                                    fadeOutState(fadeScreen, 'menu', this.scoresMusic);
                                }, this);
    },

    update: function() {
        //Parallax movement
        parallax01.tilePosition.x -= 0.15;
        parallax02.tilePosition.x -= 0.3;
        parallax03.tilePosition.x -= 0.7;
        parallax04.tilePosition.x -= 1;
        
        //Press B for Main Menu
        if(game.input.keyboard.isDown(Phaser.Keyboard.B)) {
            fadeOutState(fadeScreen, 'menu', this.scoresMusic);
        }
    }
}