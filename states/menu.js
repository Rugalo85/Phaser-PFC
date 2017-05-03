//GLOBAL GAME VARIABLES
var playerLives = 5;
var speed = 8;
var gainLives = 1000;

//TEXT
var pushStart;
var textMainMenu;
var textNewGame;
var textOptions;
var textCredits;

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
        pushStart = game.add.text(game.width/2, 460, 'Press the SPACE BAR or CLICK', {font: '20px PrStart', fill: '#ffffff'});
        pushStart.anchor.setTo(0.5, 0.5);
        pushStart.inputEnabled = true;
        pushStart.input.useHandCursor = true;

        
        timer = game.time.create(false);	
        timer.loop(500, this.blinkingText, this);
        timer.start();
        
        //pressing the SPACE BAR or click on the text begins the game
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.addOnce(this.deployMainMenu, this);
        pushStart.events.onInputDown.add(this.deployMainMenu, this);
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
        pushStart.kill(); 
        selectedSound.play();
        
        //Selection arrows
        this.arrow = game.add.sprite(540, 430, 'arrow');
        this.arrow.anchor.setTo(0.5, 0.5);
        this.arrow.scale.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.arrow);
        
        //Adding the items of the main menu
        var gameText = game.add.text(game.width/2 - 75, 430, 'New Game', {font: '20px PrStart', fill: '#ffffff'});
        gameText.anchor.setTo(0, 0.5);
        gameText.inputEnabled = true;
        gameText.input.useHandCursor = true;
        
        var optionText = game.add.text(game.width/2 - 75, 460, 'Options', {font: '20px PrStart', fill: '#ffffff'}, textMainMenu);
        optionText.anchor.setTo(0, 0.5);
        optionText.inputEnabled = true;
        optionText.input.useHandCursor = true;
        
        var creditText = game.add.text(game.width/2 - 75, 490, 'Credits', {font: '20px PrStart', fill: '#ffffff'}, textMainMenu);
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
                game.state.start('game');
                selectedSound.play();
            } else if (this.arrow.y == 460) {
                this.deployOptions();
                selectedSound.play();
            } else if (this.arrow.y == 490) {
                game.state.start('credits');
                selectedSound.play();
            }
        }, this);
        
        
        gameText.events.onInputDown.add(function() {
                                                game.state.start('game');
                                                selectedSound.play();           
                                            }, this);
        
        gameText.events.onInputOver.add(function() {
                                                this.arrow.y = 430;
                                                selectSound.play();             
                                            }, this);
        
        optionText.events.onInputDown.add(function() {
                                                this.deployOptions();
                                                selectedSound.play();           
                                            }, this);
        
        optionText.events.onInputOver.add(function() {
                                                this.arrow.y = 460;
                                                selectSound.play();             
                                            }, this);
                
        creditText.events.onInputDown.add(function() {
                                                game.state.start('credits');
                                                selectedSound.play();           
                                            }, this);
        
        creditText.events.onInputOver.add(function() {
                                                this.arrow.y = 490;
                                                selectSound.play();            
                                            }, this);
    },

    blinkingText: function() {
        if (pushStart.exists) {		
            pushStart.kill();	
        } else {		
            pushStart.revive();	
        }
    },
    
    deployNewGame: function() {
        //loading fifth state, GAME
        textMainMenu.removeAll();
        textNewGame = game.add.group();
        
        var originalGameText = game.add.text(game.width/2 - 75, 430, 'Original Game', {font: '20px PrStart', fill: '#ffffff'}, textNewGame);
        originalGameText.anchor.setTo(0, 0.5);
        originalGameText.inputEnabled = true;
        originalGameText.input.useHandCursor = true;
        
        var customizedGameText = game.add.text(game.width/2 - 75, 460, 'Customized Game', {font: '20px PrStart', fill: '#ffffff'}, textNewGame);
        customizedGameText.anchor.setTo(0, 0.5);
        customizedGameText.inputEnabled = true;
        customizedGameText.input.useHandCursor = true;
        
        var backMainMenu = game.add.text(game.width/2 - 75  , 490, '<- Back', {font: '20px PrStart', fill: '#ffffff'}, textNewGame);
        backMainMenu.anchor.setTo(0, 0.5);
        backMainMenu.inputEnabled = true;
        backMainMenu.input.useHandCursor = true;
    },

    deployOptions: function() {
        //loading options state
        textMainMenu.removeAll();
        textOptions = game.add.group();
        
        this.gameText = game.add.text(game.width/2 - 75, 430, 'OPTION1', {font: '20px PrStart', fill: '#ffffff'}, textOptions);
        this.gameText.anchor.setTo(0, 0.5);
        this.gameText.inputEnabled = true;
        this.gameText.input.useHandCursor = true;
        
        this.optionText = game.add.text(game.width/2 - 75, 460, 'OPTION2', {font: '20px PrStart', fill: '#ffffff'}, textOptions);
        this.optionText.anchor.setTo(0, 0.5);
        this.optionText.inputEnabled = true;
        this.optionText.input.useHandCursor = true;

        this.creditText = game.add.text(game.width/2 - 75, 490, 'OPTION3', {font: '20px PrStart', fill: '#ffffff'}, textOptions);
        this.creditText.anchor.setTo(0, 0.5);
        this.creditText.inputEnabled = true;
        this.creditText.input.useHandCursor = true;
    },

    deployCredits: function() {
        //loading credits state
        game.state.start('credits');
        game.splashMusic.stop();
    },

    return: function() {
        //loading options state
        game.state.start('splash');
        game.splashMusic.stop();
    }
}


