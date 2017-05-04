//GLOBAL GAME VARIABLES
var multiPlayer = false;
var playerLives = 5;
var speed = 8;
var gainLives = 1000;

//TEXT
var pushStart;
var gameText;
var optionText;
var creditText;

//SPRITES
var arrow;
var fadeToBlack;

//SOUND
var selectSound;
var selectedSound;
var splashMu
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
        
        //FADEtoblack background
        fadeToBlack = game.add.tileSprite(0, 0, 1280, 720, 'fadeToBlack');
        fadeToBlack.alpha = 0;
        
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
            spaceKey.onDown.addOnce(this.deployMainMenu, this);
            pushStart.events.onInputDown.add(this.deployMainMenu, this);
        } else {
            
            this.deployMainMenu();
        }
        
    },

    update: function() {
        fadeToBlack = game.add.tileSprite(0, 0, 1280, 720, 'fadeToBlack');
        fadeToBlack.alpha = 0;
        
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
        selectedSound.play();
        
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
                this.goToState('game', gameText );
                selectedSound.play();
               // splashMusic.stop();
            } else if (this.arrow.y == 460) {
                this.goToState('options', optionText);
                selectedSound.play();
              //  splashMusic.stop();
            } else if (this.arrow.y == 490) {
                this.goToState('credits', creditText);
                selectedSound.play();
               // splashMusic.stop();
            }
        }, this);
        
        
        gameText.events.onInputDown.add(function() {
                                                this.goToState('game');
                                                selectedSound.play();           
                                            }, this);
        
        gameText.events.onInputOver.add(function() {
                                                this.arrow.y = 430;
                                                selectSound.play();             
                                            }, this);
        
        optionText.events.onInputDown.add(function() {
                                               this.goToState('options', optionText);
                                                selectedSound.play();           
                                            }, this);
        
        optionText.events.onInputOver.add(function() {
                                                this.arrow.y = 460;
                                                selectSound.play();             
                                            }, this);
                
        creditText.events.onInputDown.add(function() {
                                                this.goToState('credits', creditText);
                                                selectedSound.play();           
                                            }, this);
        
        creditText.events.onInputOver.add(function() {
                                                this.arrow.y = 490;
                                                selectSound.play();            
                                            }, this);
    },

    goToState: function(state, text) {
        game.time.events.add(0, function() {
            timer = game.time.create(false);	
            timer.loop(150, function() {
                if (text.exists) {
                    text.kill();
                } else {
                    text.revive();	
                }}, this);
            timer.start();
        }, this);
        
        game.time.events.add(500, function() {    
            game.add.tween(fadeToBlack).to({alpha: 1}, 750, Phaser.Easing.Linear.None, true);
        }, this); 
        
        game.time.events.add(1500, function() {
            game.state.start(state);
        }, this); 
},
    
}


