var optionState = {

    create: function() {
        //PARALLAX
        this.parallax01 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('parallaxMenu01').height,
            this.game.width,
            this.game.cache.getImage('parallaxOptions01').height,
            'parallaxOptions01');
        this.parallax03 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('parallaxOptions03').height,
            this.game.width,
            this.game.cache.getImage('parallaxOptions03').height,
            'parallaxOptions03');
        this.parallax02 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('parallaxMenu02').height - 100,
            this.game.width,
            this.game.cache.getImage('parallaxMenu02').height,
            'parallaxMenu02');

        
        var gameTitle = game.add.text(game.width/2, 150, 'Options', {font: '50px PrStart', fill: '#ffffff'});
        gameTitle.anchor.setTo(0.5, 0.5);

    },

    update: function() {
        //parallax images movement
        this.parallax01.tilePosition.x -= 0.2;
        this.parallax02.tilePosition.x -= 0.7;
        this.parallax03.tilePosition.x -= 1;
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
            game.state.start('menu');
        //abajo
        }   
    }

}
