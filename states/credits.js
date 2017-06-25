var t = 1000;

var creditState = {
    create: function() {
        //RESET MULTIPLAYER VARIABLE
        multiplayer = false;
        
        this.creditsMusic = game.add.audio('creditsTheme');

        addParallax('parallaxCredits01', 'parallaxCredits02', 'parallaxCredits03', 'parallaxCredits04', 0);
        
        var moon = game.add.sprite(1100, 125, 'moon');
        moon.anchor.setTo(0.5, 0.5);
        var entrance = game.add.tween(moon).to({x:700,y:50},50000, Phaser.Easing.Linear.None, true);

        creditsLogo = game.add.sprite(game.width/2, game.height/2 - 225, 'creditsLogo');
        creditsLogo.anchor.setTo(0.5, 0.5); 
        
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
            
        var creditos = game.cache.getJSON('credits');

        //Array to store values
        var me = [];
        var music = [];
        var sound = [];
        var resources = [];
        var testers = [];
        var thanks = [];
        
        for (var i = 0; i < 6; i++) {                        
            me[i] = game.add.text(game.width/2, 550, creditos.me[i], {font: '20px PrStart', fill: '#ffffff'});            
            me[i].alpha = 0;
            me[i].anchor.setTo(0.5, 0.5);
            
            music[i] = game.add.text(game.width/2, 550, creditos.music[i], {font: '20px PrStart', fill: '#ffffff'});            
            music[i].alpha = 0;
            music[i].anchor.setTo(0.5, 0.5);
            
            sound[i] = game.add.text(game.width/2, 550, creditos.sound[i], {font: '20px PrStart', fill: '#ffffff'});            
            sound[i].alpha = 0;
            sound[i].anchor.setTo(0.5, 0.5);
            
            resources[i] = game.add.text(game.width/2, 550, creditos.resources[i], {font: '20px PrStart', fill: '#ffffff'});            
            resources[i].alpha = 0;
            resources[i].anchor.setTo(0.5, 0.5);
            
            testers[i] = game.add.text(game.width/2, 550, creditos.testers[i], {font: '20px PrStart', fill: '#ffffff'});            
            testers[i].alpha = 0;
            testers[i].anchor.setTo(0.5, 0.5);            
        }

        this.loopFunction(me);
        this.loopFunction(music);
        this.loopFunction(sound);
        this.loopFunction(resources);
        this.loopFunction(testers);

        fadeScreen = game.add.tileSprite(0, 0, 1280, 720, 'fadeScreen');
        fadeScreen.alpha = 1;
        fadeInState(fadeScreen, this.creditsMusic);
        
        game.time.events.add(47000, function(){
                                    fadeOutState(fadeScreen, 'menu', this.creditsMusic);
                                    t = 1000;
                                }, this);
    },

    update: function() {
        //parallax images movement
        parallax01.tilePosition.x -= 0.1;
        parallax02.tilePosition.x -= 0.15;
        parallax03.tilePosition.x -= 0.25;
        parallax04.tilePosition.x -= 0.4;
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.B)) {
            fadeOutState(fadeScreen, 'menu', this.creditsMusic);
            t = 1000;
        }
    },

    loopFunction: function(item) {    

        item.forEach(function(key) {
            game.time.events.add(1500 + t, function() {
                game.add.tween(key).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
            }, this);
            
            game.time.events.add(1000 + t, function() {
                game.add.tween(key).to({y: 150}, 9000, Phaser.Easing.Linear.None, true);
            }, this);
            
            game.time.events.add(8500 + t, function() {
                game.add.tween(key).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
            }, this);
            t += 1000;
        });
        
        t+=2000;
    }
    
}