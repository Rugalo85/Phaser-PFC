//TEXT
var pushStart;
var gameText;
var optionText;
var creditText;

//SPRITES
var arrow;

//SOUND
var selectSound;
var selectedSound;

//OTHER
var timer;

//CONTROLS
var spaceKey;

var menuState = {

    create: function() {
        //MENU SOUNDS
        selectSound = game.add.audio('select');
        selectSound.volume = 0.1;
        selectedSound = game.add.audio('selected');
        selectedSound.volume = 0.1;
                
        //PARALLAX
        this.parallax01 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('parallaxMenu01').height,
            this.game.width,
            this.game.cache.getImage('parallaxMenu01').height,
            'parallaxMenu01');
        /*this.parallax02 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('parallaxMenu02').height,
            this.game.width,
            this.game.cache.getImage('parallaxMenu02').height,
            'parallaxMenu02');*/
        this.parallax03 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('parallaxMenu03').height,
            this.game.width,
            this.game.cache.getImage('parallaxMenu03').height,
            'parallaxMenu03');
        
        //GAME TITLE
        var gameTitle = game.add.text(game.width/2, 150, 'Zephyrus Project', {font: '50px PrStart', fill: '#ffffff'});
        gameTitle.anchor.setTo(0.5, 0.5);

        //MAIN MENU
        //press space bar to open the menu
        if (pushedStart == false) {
            pushStart = game.add.text(game.width/2, 460, 'Press the SPACE BAR or CLICK', {font: '20px PrStart', fill: '#ffffff'});
            pushStart.anchor.setTo(0.5, 0.5);
            pushStart.inputEnabled = true;
            pushStart.input.useHandCursor = true;
            
            game.time.events.add(0, function() {
                timer = game.time.create(false);	
                timer.loop(500, function() {
                    if (pushStart.exists) {
                        pushStart.kill();
                    } else {
                        pushStart.revive();	
                    }}, this);
                timer.start();
            }, this);
            
            //pressing the SPACE BAR or click on the text begins the game
            spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            spaceKey.onDown.addOnce(function() {
                                            selectedSound.play();
                                            this.deployMainMenu();
                                            }, this);
            
            pushStart.events.onInputDown.add(function() {
                                            selectedSound.play();
                                            this.deployMainMenu();
                                            }, this);
        } else {
            this.deployMainMenu();
            fadeInScreen = game.add.tileSprite(0, 0, 1280, 720, 'fadeScreen');
            fadeInScreen.alpha = 1;
            
            fadeInState(fadeInScreen, splashMusic);
        }
    },

    update: function() {
        //parallax images movement
        this.parallax01.tilePosition.x -= 0.2;
       /*this.parallax02.tilePosition.x -= 0.7;*/
        this.parallax03.tilePosition.x -= 1;
    },
    
    deployMainMenu: function() {
        //Remove the Push Start text 
        timer.stop();
        pushedStart = true;
        pushStart.kill(); 
       
        //Selection arrows
        this.arrow = game.add.sprite(540, 430, 'arrow');
        this.arrow.anchor.setTo(0.5, 0.5);
        this.arrow.scale.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.arrow);
        
        //Adding the items of the main menu
        gameText = game.add.text(game.width/2 - 75, 430, 'New Game', {font: '20px PrStart', fill: '#ffffff'});
        gameText.anchor.setTo(0, 0.5);
        gameText.inputEnabled = true;
        gameText.input.useHandCursor = true;
        
        optionText = game.add.text(game.width/2 - 75, 460, 'Options', {font: '20px PrStart', fill: '#ffffff'});
        optionText.anchor.setTo(0, 0.5);
        optionText.inputEnabled = true;
        optionText.input.useHandCursor = true;
        
        creditText = game.add.text(game.width/2 - 75, 490, 'Credits', {font: '20px PrStart', fill: '#ffffff'});
        creditText.anchor.setTo(0, 0.5);
        creditText.inputEnabled = true;
        creditText.input.useHandCursor = true;

        fadeOffScreen = game.add.tileSprite(0, 0, 1280, 720, 'fadeScreen');
        fadeOffScreen.alpha = 0;
        
        //Menu navigation
        down = game.input.keyboard.addKey(Phaser.Keyboard.S);
        down.onDown.add(function() {
            selectSound.play();
            this.arrow.y += 30;
            if(this.arrow.y > 490) {
                this.arrow.y = 490;
                selectSound.pause();
            }   
        }, this);
        
        up = game.input.keyboard.addKey(Phaser.Keyboard.W);
        up.onDown.add(function() {
            selectSound.play();
            this.arrow.y -= 30;
            if(this.arrow.y < 430) {
                this.arrow.y = 430;
                selectSound.pause();
            }
        }, this);
        
        intro = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        intro.onDown.add(function() {
            if (this.arrow.y == 430) {
                blinkingText(gameText);
                fadeOutState(fadeOffScreen, 'game', splashMusic);
                selectedSound.play();
                disableKeys();
                game.input.enabled = false;
                
            } else if (this.arrow.y == 460) {
                blinkingText(optionText);
                fadeOutState(fadeOffScreen, 'options', splashMusic);
                selectedSound.play();
                disableKeys();
                game.input.enabled = false;
                
            } else if (this.arrow.y == 490) {
                blinkingText(creditText);
                fadeOutState(fadeOffScreen, 'credits', splashMusic);
                selectedSound.play();
                disableKeys();
                game.input.enabled = false;
            }
        }, this);

        gameText.events.onInputDown.add(function() {
                                                blinkingText(gameText);
                                                fadeOutState(fadeOffScreen, 'game', splashMusic);
                                                selectedSound.play();
                                                disableKeys();
                                            }, this);
        
        gameText.events.onInputOver.add(function() {
                                                this.arrow.y = 430;
                                                selectSound.play();             
                                            }, this);
        
        
        
        optionText.events.onInputDown.add(function() {
                                                blinkingText(optionText);
                                                fadeOutState(fadeOffScreen, 'options', splashMusic);
                                                selectedSound.play(); 
             disableKeys();
                                            }, this);
        
        optionText.events.onInputOver.add(function() {
                                                this.arrow.y = 460;
                                                selectSound.play();             
                                            }, this);
                
        
        
        creditText.events.onInputDown.add(function() {
                                                blinkingText(creditText);
                                                fadeOutState(fadeOffScreen, 'credits', splashMusic);
                                                selectedSound.play();     
             disableKeys();
                                            }, this);
        
        creditText.events.onInputOver.add(function() {
                                                this.arrow.y = 490;
                                                selectSound.play();            
                                            }, this);
    },
    
}


