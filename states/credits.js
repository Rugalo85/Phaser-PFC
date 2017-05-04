var creditState = {
    create: function() {
        //PARALLAX
        this.parallax01 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('parallaxMenu01').height,
            this.game.width,
            this.game.cache.getImage('parallaxCredits01').height,
            'parallaxCredits01');
        /*this.parallax02 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('parallaxMenu02').height,
            this.game.width,
            this.game.cache.getImage('parallaxMenu02').height,
            'parallaxMenu02');*/
        this.parallax03 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('parallaxCredits03').height,
            this.game.width,
            this.game.cache.getImage('parallaxCredits03').height,
            'parallaxCredits03');

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
        fadeToBlack = game.add.tileSprite(0, 0, 1280, 720, 'fadeToBlack');
        game.add.tween(fadeToBlack).to({alpha: 0}, 750, Phaser.Easing.Linear.None, true);
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
        this.parallax01.tilePosition.x -= 0.2;
       /*this.parallax02.tilePosition.x -= 0.7;*/
        this.parallax03.tilePosition.x -= 1;
                
        if(game.input.keyboard.isDown(Phaser.Keyboard.B)) {
            game.time.events.add(500, function() {    
                game.add.tween(fadeToBlack).to({alpha: 1}, 750, Phaser.Easing.Linear.None, true);
            }, this); 
            
            game.time.events.add(1500, function() {
                game.state.start('menu');
            }, this); 
        }   
    },

}
