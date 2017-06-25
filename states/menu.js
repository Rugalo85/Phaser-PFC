/////////////////////
//-MAIN MENU STATE-//
/////////////////////

//TEXT
var pushStart;
var textMainMenu;
var textSubMenu;
var gameMode = false;

//OTHER
var timer;

var menuState = {
    create: function() {
        //RESET MULTIPLAYER AND GAMEMODE VARIABLE
        multiplayer = false;
        gameMode = false;
        console.log(gameDifficulty);
        console.log(userLogged);
        //MENU THEME
        mainMenuTheme = game.add.audio('mainMenuTheme');
        mainMenuTheme.volume = 0.2;
        mainMenuTheme.play();
        mainMenuTheme.loop = true;

        //MENU SOUNDS
        this.selectSound = game.add.audio('select');
        this.selectSound.volume = 0.2;
        this.selectedSound = game.add.audio('selected');
        this.selectedSound.volume = 0.2;
        this.backSound = game.add.audio('back');
        this.backSound.volume = 0.2;
        this.gameStart = game.add.audio('gameStart');
        this.gameStart.volume = 0.2;
        
        //PARALLAX
        addParallax('parallaxMenu01', 'parallaxMenu02', 'parallaxMenu03', 'parallaxMenu04', 100);
        
        //GAME TITLE
        logo = game.add.sprite(game.width/2, game.height/2 - 100, 'mainMenuLogo');
        logo.anchor.setTo(0.5, 0.5);  
 
        //mute button
        muteButtonOff = game.add.sprite(game.width - 30, 30, 'muteOff');
        muteButtonOff.anchor.setTo(0.5, 0.5);
        muteButtonOff.scale.setTo(0.5, 0.5);
        muteButtonOff.inputEnabled = true;
        muteButtonOff.input.useHandCursor = true;  
        muteSoundButtons(muteButtonOff);
        
        //back button
        backToEditor = game.add.button(70, 35, 'editorButton', function() {  window.location.replace("http://zephyrus.sytes.net");}, this);
        backToEditor.anchor.setTo(0.5, 0.5);
        backToEditor.scale.setTo(1, 0.8);

        //controls info
        controlsInfo = game.add.text(game.width/2, 30, 'W up, S down / SPACEBAR intro / M mute', {font: '12px PrStart', fill: '#ffffff'});
        controlsInfo.anchor.setTo(0.5, 0.5);
        
        //MAIN MENU
        //press ENTER to open the menu
        if (pushedStart == false) {            
            pushStart = game.add.text(game.width/2, 460, 'Press SPACEBAR to start', {font: '20px PrStart', fill: '#ffffff'});
            pushStart.anchor.setTo(0.5, 0.5);
            
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
            enterKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            enterKey.onDown.addOnce(function() {
                                            this.selectedSound.play();
                                            this.deployMainMenu();
                                            this.menuNavigation();
                                            }, this);
            
        } else {
            this.deployMainMenu();
            this.menuNavigation();
            fadeInScreen = game.add.tileSprite(0, 0, 1280, 720, 'fadeScreen');
            fadeInScreen.alpha = 1;
            game.add.tween(fadeInScreen).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
        }
    },

    update: function() {
        //parallax images movement
        parallax01.tilePosition.x -= 0.1;
        parallax02.tilePosition.x -= 0.15;
        parallax03.tilePosition.x -= 0.3 ;
        parallax04.tilePosition.x -= 0.5;
    },
    
    menuNavigation: function() {
        //Selection arrows
        this.arrow = game.add.sprite(535, 410, 'arrow');
        this.arrow.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.arrow);
        this.arrow.animations.add('down');
        
        //MENU NAVIGATION
        //Keyboard
        down = game.input.keyboard.addKey(Phaser.Keyboard.S);
        down.onDown.add(function() {
            this.arrow.animations.play('down', 30, false);
            this.selectSound.play();
            this.arrow.y += 30;
            if(this.arrow.y > 500) {
                this.arrow.animations.stop();
                this.arrow.y = 500;
                this.selectSound.pause();
            } else if (this.arrow.y > 470 && subMenu == true) {
                this.arrow.animations.stop();
                this.arrow.y = 470;
                this.selectSound.pause();
            }
        }, this);
        
        up = game.input.keyboard.addKey(Phaser.Keyboard.W );
        up.onDown.add(function() {
            this.arrow.animations.play('down', 30, false);
            this.selectSound.play();
            this.arrow.y -= 30;
            if(this.arrow.y < 410) {
                this.arrow.animations.stop();
                this.arrow.y = 410;
                this.selectSound.pause();
            }
        }, this);
        
        intro = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        intro.onDown.add(function() {
            if (this.arrow.y == 410) {
                //NEW GAME
                if (subMenu == false) {
                    textMainMenu.removeAll(true);
                    this.deploySubMenu();
                    this.selectedSound.play();
                    gameMode = false;
                    console.log(gameMode);
                //01 PLAYER GAME
                } else {
                    this.arrow.animations.play('down', 60, true);
                    blinkingText(this.singleText, 150);
                    fadeOutState(fadeOffScreen, 'game', mainMenuTheme);
                    this.gameStart.play();
                    disableKeys();
                    subMenu = false;
                    console.log(gameMode);
                }
                
            } else if (this.arrow.y == 440) {
                //CUSTOM GAME
                if (subMenu == false) {
                    textMainMenu.removeAll(true);
                    this.deploySubMenu();
                    this.selectedSound.play();
                    this.arrow.y = 410;
                    gameMode = true;
                    if (userLogged == "guest") {
                        gameMode = false;
                    }
                    console.log(gameMode);
                //02 PLAYER GAME
                } else {
                    this.arrow.animations.play('down', 60, true);
                    multiPlayer = true;
                    blinkingText(this.multiText, 150);
                    fadeOutState(fadeOffScreen, 'game', mainMenuTheme);
                    this.gameStart.play();
                    disableKeys();
                    subMenu = false;
                     console.log(gameMode);
                }
                
            } else if (this.arrow.y == 470) {
                //SCORES
                if (subMenu == false) {
                    this.arrow.animations.play('down', 60, true);
                    blinkingText(this.scoresText, 150);
                    fadeOutState(fadeOffScreen, 'scores', mainMenuTheme);
                    this.selectedSound.play();
                    disableKeys();
                    subMenu = false;
                //BACK TO MAIN MENU
                } else {
                    textSubMenu.removeAll(true);
                    this.deployMainMenu();
                    this.arrow.y = 410;
                    this.backSound.play();
                    subMenu = false;
                    gameMode = false;
                    console.log(gameMode);
                }

            } else if (this.arrow.y == 500 && textMainMenu.exists == true) {
                //CREDITS
                this.arrow.animations.play('down', 60, true);
                blinkingText(this.creditText, 150);
                fadeOutState(fadeOffScreen, 'credits', mainMenuTheme);
                this.selectedSound.play();
                disableKeys();
                subMenu = false;
            }
        }, this);
                
        fadeOffScreen = game.add.tileSprite(0, 0, 1280, 720, 'fadeScreen');
        fadeOffScreen.alpha = 0;
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
        
        this.gameText = game.add.text(game.width/2 - 75, 403, 'New Game', {font: '20px PrStart', fill: '#ffffff'}, textMainMenu);
        
        this.customText = game.add.text(game.width/2 - 75, 433, 'Custom Game', {font: '20px PrStart', fill: '#ffffff'}, textMainMenu);
        
        this.scoresText = game.add.text(game.width/2 - 75, 463, 'Scores', {font: '20px PrStart', fill: '#ffffff'}, textMainMenu);
        
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
        
        this.singleText = game.add.text(game.width/2 - 75, 403, '1 Player Game', {font: '20px PrStart', fill: '#ffffff'}, textSubMenu);
        
        this.multiText = game.add.text(game.width/2 - 75, 433, '2 Player Game', {font: '20px PrStart', fill: '#ffffff'}, textSubMenu);
        
        this.backText = game.add.text(game.width/2 - 75, 463  , '<- Return', {font: '20px PrStart', fill: '#ffffff'}, textSubMenu);
        
        fadeOffScreen = game.add.tileSprite(0, 0, 1280, 720, 'fadeScreen');
        fadeOffScreen.alpha = 0;
       
    },
}