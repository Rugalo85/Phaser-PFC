//TEXT
var pushStart;
var textMainMenu;
var textSubMenu;
var subMenu = false;
//SPRITES

//SOUND

//OTHER
var timer;

//CONTROLS
var enterKey;

var menuState = {

    create: function() {
    
        //MENU SOUNDS
        this.selectSound = game.add.audio('select');
        this.selectSound.volume = 0.1;
        this.selectedSound = game.add.audio('selected');
        this.selectedSound.volume = 0.1;
                
        //PARALLAX
        addParallax('parallaxMenu01', 'parallaxMenu03', 'parallaxMenu02');
        
        //GAME TITLE
        var gameTitle = game.add.text(game.width/2, 150, 'Zephyrus Project', {font: '50px PrStart', fill: '#ffffff'});
        gameTitle.anchor.setTo(0.5, 0.5);

        //MAIN MENU
        //press ENTER to open the menu
        if (pushedStart == false) {
            pushStart = game.add.text(game.width/2, 460, 'Press ENTER or CLICK', {font: '20px PrStart', fill: '#ffffff'});
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
            
            //pressing ENTER or click on the text begins the game
            enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            enterKey.onDown.addOnce(function() {
                                            this.selectedSound.play();
                                            this.deployMainMenu();
                                            this.menuNavigation();
                                            }, this);
            
            pushStart.events.onInputDown.add(function() {
                                            this.selectedSound.play();
                                            this.deployMainMenu();
                                            this.menuNavigation();
                                            }, this);
        } else {
            splashMusic.fadeIn('menu', 0, 0.1);
            this.deployMainMenu();
            this.menuNavigation();
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
    
    menuNavigation: function() {
        //Selection arrows
        this.arrow = game.add.sprite(540, 410, 'arrow');
        this.arrow.anchor.setTo(0.5, 0.5);
        this.arrow.scale.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.arrow);
        
        //MENU NAVIGATION
        down = game.input.keyboard.addKey(Phaser.Keyboard.S);
        down.onDown.add(function() {
            this.selectSound.play();
            this.arrow.y += 30;
            if(this.arrow.y > 500) {
                this.arrow.y = 500;
                this.selectSound.pause();
            } else if (this.arrow.y > 470 && subMenu == true) {
                this.arrow.y = 470;
                this.selectSound.pause();
            }
        }, this);
        
        up = game.input.keyboard.addKey(Phaser.Keyboard.W);
        up.onDown.add(function() {
            this.selectSound.play();
            this.arrow.y -= 30;
            if(this.arrow.y < 410) {
                this.arrow.y = 410;
                this.selectSound.pause();
            }
        }, this);
        
        intro = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        intro.onDown.add(function() {
            if (this.arrow.y == 410) {
                //NEW GAME
                if (subMenu == false) {
                    textMainMenu.removeAll(true);
                    this.deploySubMenu();
                    this.selectedSound.play();
                //01 PLAYER GAME
                } else {
                    blinkingText(this.singleText, 150);
                    fadeOutState(fadeOffScreen, 'game', splashMusic);
                    this.selectedSound.play();
                    disableKeys();
                    subMenu = false;
                    game.input.enabled = false;
                }
                
            } else if (this.arrow.y == 440) {
                //CUSTOM GAME
                if (subMenu == false) {
                    textMainMenu.removeAll(true);
                    this.deploySubMenu();
                    this.selectedSound.play();
                    this.arrow.y = 410;
                //02 PLAYER GAME
                } else {
                    multiPlayer = true;
                    blinkingText(this.multiText, 150);
                    fadeOutState(fadeOffScreen, 'game', splashMusic);
                    this.selectedSound.play();
                    disableKeys();
                    subMenu = false;
                    game.input.enabled = false;
                }
                
            } else if (this.arrow.y == 470) {
                //OPTIONS
                if (subMenu == false) {
                    blinkingText(this.optionText, 150);
                    fadeOutState(fadeOffScreen, 'options', splashMusic);
                    this.selectedSound.play();
                    disableKeys();
                    subMenu = false;
                    game.input.enabled = false;
                //BACK TO MAIN MENU
                } else {
                    textSubMenu.removeAll(true);
                    this.deployMainMenu();
                    this.arrow.y = 410;
                    this.selectedSound.play();
                    subMenu = false;
                }

            } else if (this.arrow.y == 500 && textMainMenu.exists == true) {
                //CREDITS
                blinkingText(this.creditText, 150);
                fadeOutState(fadeOffScreen, 'credits', splashMusic);
                this.selectedSound.play();
                disableKeys();
                subMenu = false;
                game.input.enabled = false;
            }
        }, this);
        
        fadeOffScreen = game.add.tileSprite(0, 0, 1280, 720, 'fadeScreen');
        fadeOffScreen.alpha = 0;
        
        /*
        //Mouse 
        gameText.events.onInputDown.add(function() {
                                                blinkingText(gameText);
                                                fadeOutState(fadeOffScreen, 'game', splashMusic);
                                                this.selectedSound.play();
                                                disableKeys();
                                            }, this);
        
        gameText.events.onInputOver.add(function() {
                                                this.arrow.y = 430;
                                                this.selectSound.play();             
                                            }, this);
        
        optionText.events.onInputDown.add(function() {
                                                blinkingText(optionText);
                                                fadeOutState(fadeOffScreen, 'options', splashMusic);
                                                this.selectedSound.play(); 
                                                disableKeys();
                                            }, this);
        
        optionText.events.onInputOver.add(function() {
                                                this.arrow.y = 460;
                                                this.selectSound.play();             
                                            }, this);
        
        creditText.events.onInputDown.add(function() {
                                                blinkingText(creditText);
                                                fadeOutState(fadeOffScreen, 'credits', splashMusic);
                                                this.selectedSound.play();     
                                                disableKeys();
                                            }, this);
        
        creditText.events.onInputOver.add(function() {
                                                this.arrow.y = 490;
                                                this.selectSound.play();            
                                            }, this);
    */
 

        
    },
        
    deployMainMenu: function() {
        //Remove the Push Start text 
        timer.stop();
        pushedStart = true;
        pushStart.kill(); 
        subMenu = false;
               
        //Adding the items of the main menu
        textMainMenu = game.add.group();
        textMainMenu.setAll('anchor.x', 0);
        textMainMenu.setAll('anchor.y', 0.5);
        textMainMenu.setAll('inputEnabled', true);
        textMainMenu.setAll('useHandCursor', true);
        
        this.gameText = game.add.text(game.width/2 - 75, 403, 'New Game', {font: '20px PrStart', fill: '#ffffff'}, textMainMenu);
        this.customText = game.add.text(game.width/2 - 75, 433, 'Custom Game', {font: '20px PrStart', fill: '#ffffff'}, textMainMenu);
        this.optionText = game.add.text(game.width/2 - 75, 463, 'Options', {font: '20px PrStart', fill: '#ffffff'}, textMainMenu);
        this.creditText = game.add.text(game.width/2 - 75, 493  , 'Credits', {font: '20px PrStart', fill: '#ffffff'}, textMainMenu);

        fadeOffScreen = game.add.tileSprite(0, 0, 1280, 720, 'fadeScreen');
        fadeOffScreen.alpha = 0;
        
    },
    
    deploySubMenu: function() {
        timer.stop();
        subMenu = true;
        
        //Adding the items of the main menu
        textSubMenu = game.add.group();
        textSubMenu.setAll('anchor.x', 0);
        textSubMenu.setAll('anchor.y', 0.5);
        textSubMenu.setAll('inputEnabled', true);
        textSubMenu.setAll('useHandCursor', true);
        
        this.singleText = game.add.text(game.width/2 - 75, 403, '1 Player game', {font: '20px PrStart', fill: '#ffffff'}, textSubMenu);
        this.multiText = game.add.text(game.width/2 - 75, 433, '2 Player Game', {font: '20px PrStart', fill: '#ffffff'}, textSubMenu);
        this.backText = game.add.text(game.width/2 - 75, 463  , '<- Return', {font: '20px PrStart', fill: '#ffffff'}, textSubMenu);
        
        fadeOffScreen = game.add.tileSprite(0, 0, 1280, 720, 'fadeScreen');
        fadeOffScreen.alpha = 0;
       
    },
}