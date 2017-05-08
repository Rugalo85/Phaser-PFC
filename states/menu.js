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
        addParallax('parallaxMenu01', 'parallaxMenu03', 'parallaxMenu02');
        
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
            splashMusic.fadeIn('menu', 0, 0.1);
            this.deployMainMenu();
            fadeInScreen = game.add.tileSprite(0, 0, 1280, 720, 'fadeScreen');
            fadeInScreen.alpha = 1;
            
            fadeInState(fadeInScreen, splashMusic);
        }
    },

    update: function() {
        //parallax images movement
        parallax01.tilePosition.x -= 0.1;
        parallax02.tilePosition.x -= 0.8;
        parallax03.tilePosition.x -= 0.5;
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
        var textGroup = game.add.group();
        textGroup.setAll('anchor.x', 0);
        textGroup.setAll('anchor.y', 0.5);
        textGroup.setAll('inputEnabled', true);
        textGroup.setAll('useHandCursor', true);    
        gameText = game.add.text(game.width/2 - 75, 423, 'New Game', {font: '20px PrStart', fill: '#ffffff'}, textGroup);
        optionText = game.add.text(game.width/2 - 75, 453, 'Options', {font: '20px PrStart', fill: '#ffffff'}, textGroup);
        creditText = game.add.text(game.width/2 - 75, 483  , 'Credits', {font: '20px PrStart', fill: '#ffffff'}, textGroup);

        fadeOffScreen = game.add.tileSprite(0, 0, 1280, 720, 'fadeScreen');
        fadeOffScreen.alpha = 0;
        
        //MENU NAVIGATION
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
                blinkingText(gameText, 150);
                fadeOutState(fadeOffScreen, 'game', splashMusic);
                selectedSound.play();
                disableKeys();
                game.input.enabled = false;
                
            } else if (this.arrow.y == 460) {
                blinkingText(optionText, 150);
                fadeOutState(fadeOffScreen, 'options', splashMusic);
                selectedSound.play();
                disableKeys();
                game.input.enabled = false;
                
            } else if (this.arrow.y == 490) {
                blinkingText(creditText, 150);
                fadeOutState(fadeOffScreen, 'credits', splashMusic);
                selectedSound.play();
                disableKeys();
                game.input.enabled = false;
            }
        }, this);
        
        //Mouse 
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