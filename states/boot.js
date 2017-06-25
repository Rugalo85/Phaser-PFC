/////////////////////
//--- BOOT STATE---//
/////////////////////

//GLOBAL VARIABLES
//Music variables
var splashMusic;
var counterUP01 = 0;
var counterDOWN01 = 0;
var counterUP02 = 0;
var counterDOWN02 = 0;

//Options variables
var pushedStart = false;
var multiPlayer = false;
var freePlayer01 = false;
var freePlayer02 = false;
var subMenu = false;

//Parallax variables
var parallax01;
var parallax02;
var parallax03;
var parallax04;

var muteButton;
var gameDifficulty = localStorage.getItem('gameDifficulty');
var userLogged = localStorage.getItem('userLogged');

//----------------------------------------//

//GLOBAL FUNCTIONS
//Go to another state (fade out effect)
function fadeOutState(fadeScreen, state, music) {
        game.time.events.add(500, function() {
            game.add.tween(fadeScreen).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
            music.fadeOut(1250);
        }, this);

        game.time.events.add(2500, function() {
            game.state.start(state);
        }, this);
}

//Arrive from another state (fade in effect)
function fadeInState(fadeScreen, music) {
    game.input.enabled = true;
    game.add.tween(fadeScreen).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
    game.time.events.add(1250, function() {
        music.fadeIn(3000);
        }, this);
}

//Add the background images for the parallax composition
function addParallax(screen01, screen02, screen03, screen04, offset) {
    parallax01 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage(screen01).height,
        this.game.width,
        this.game.cache.getImage(screen01).height,
        screen01);
    parallax02 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage(screen02).height,
        this.game.width,
        this.game.cache.getImage(screen02).height,
        screen02); 
    parallax03 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage(screen03).height,
        this.game.width,
        this.game.cache.getImage(screen03).height,
        screen03);
    parallax04 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage(screen04).height - offset,
        this.game.width,
        this.game.cache.getImage(screen04).height,
        screen04); 
}

//Blinking text in selected text
function blinkingText(text, blinkTime) {
    game.time.events.add(0, function() {
        timer = game.time.create(false);	
        timer.loop(blinkTime, function() {
            if (text.exists) {
                text.kill();
            } else {
                text.revive();	
            }}, this);
        timer.start();
    }, this);
}

//Disable keys
function disableKeys() {
    game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    game.input.keyboard.removeKey(Phaser.Keyboard.S);
    game.input.keyboard.removeKey(Phaser.Keyboard.W);
}

//Players movement and controls
function movePlayer(player, speed, upButton, downButton, leftButton, rightButton, shootButton, shootFunction, freePlayer) {
    if (freePlayer == true) {
        //Player 01
        if (player == player01) {
            //Up
            if(game.input.keyboard.isDown(upButton)) {
                player.y -= speed;
                counterUP01++;
                counterDOWN01 = 0;
                //Animations when move to the top, depending on the counter display the frames
                if (counterUP01 > 19) {
                    player.animations.play('up_full');
                } else if (counterUP01 > 12 && counterUP01 <= 19) {
                    player.animations.play('up_half');
                } else if (counterUP01 > 5 && counterUP01 <= 12) {
                    player.animations.play('up');
                } else {
                    player.animations.play('idle_up');
                }
            //Down
            } else if(game.input.keyboard.isDown(downButton)) {
                player.y += speed;
                counterDOWN01++;
                counterUP01 = 0;
                //Animations when move to the bottom, depending on the counter display the frames
                if (counterDOWN01 > 19) {
                    player.animations.play('down_full');
                } else if (counterDOWN01 > 12 && counterDOWN01 <= 19) {
                    player.animations.play('down_half');
                } else if (counterDOWN01 > 5 && counterDOWN01 <= 12) {
                    player.animations.play('down');
                } else {
                    player.animations.play('idle_down');
                }
            //Animations to go idle when release the keys
            } else {
                if (counterUP01 > 0){
                    player.animations.play('up_to_idle');
                } else if (counterDOWN01 > 0) {
                    player.animations.play('down_to_idle');
                }

                player.events.onAnimationComplete.add(function() {
                player.animations.play('idle');}, this);

                //Reset animation counters
                counterUP01 = 0;
                counterDOWN01 = 0;
            }
            //Left
            if(game.input.keyboard.isDown(leftButton)) {
                player.x -= speed;
            //Right
            } else if(game.input.keyboard.isDown(rightButton)) {
                player.x += speed;
            }

        //Player 02    
        } else {
            //Up
            if(game.input.keyboard.isDown(upButton)) {
                player.y -= speed;
                counterUP02++;
                counterDOWN02 = 0;
                //Animations when move to the top, depending on the counter display the frames
                if (counterUP02 > 19) {
                    player.animations.play('up_full');
                } else if (counterUP02 > 12 && counterUP02 <= 19) {
                    player.animations.play('up_half');
                } else if (counterUP02 > 5 && counterUP02 <= 12) {
                    player.animations.play('up');
                } else {
                    player.animations.play('idle_up');
                }
            //Down
            } else if(game.input.keyboard.isDown(downButton)) {
                player.y += speed;
                counterDOWN02++;
                counterUP02 = 0;
                //Animations when move to the bottom, depending on the counter display the frames
                if (counterDOWN02 > 19) {
                    player.animations.play('down_full');
                } else if (counterDOWN02 > 12 && counterDOWN02 <= 19) {
                    player.animations.play('down_half');
                } else if (counterDOWN02 > 5 && counterDOWN02 <= 12) {
                    player.animations.play('down');
                } else {
                    player.animations.play('idle_down');
                }
            //Animations to go idle when release the keys
            } else {
                if (counterUP02 > 0){
                    player.animations.play('up_to_idle');
                } else if (counterDOWN02 > 0) {
                    player.animations.play('down_to_idle');
                }

                player.events.onAnimationComplete.add(function() {
                player.animations.play('idle');}, this); 

                //Reset animation counters
                counterUP02 = 0;
                counterDOWN02 = 0;
            }

            //Left
            if(game.input.keyboard.isDown(leftButton)) {
                player.x -= speed;
            //Right
            } else if(game.input.keyboard.isDown(rightButton)) {
                player.x += speed;
            }
        }
        
        //Shoot - shootFunction declared inside the GAME STATE
        shootButton = game.input.keyboard.addKey(shootButton);
        shootButton.onDown.add(shootFunction, this);
        
        //The players moves inside an area
        if (player.x < 100) {
            player.x = 100;
        } else if (player.x > 1150) {
            player.x = 1150;
        }

        if (player.y < 90) {
            player.y = 90;
        } else if (player.y > 650) {
            player.y = 650;
        }
    }
}

function muteSound() {
    if (game.sound.mute == false) {
        this.game.sound.mute = true;
    } else if (game.sound.mute == true){
        this.game.sound.mute = false;
    }
}

function muteSoundButtons(button) {
    muteKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
    muteKey.onDown.add(function() {
                                    muteSound();
                                    if (game.sound.mute == true) {
                                        button.loadTexture('muteOn');
                                    } else {
                                        button.loadTexture('muteOff');
                                    }
                                    }, this);

    muteButtonOff.events.onInputDown.add(function() {
                                    muteSound();
                                    if (game.sound.mute == true) {
                                        button.loadTexture('muteOn');
                                    } else {
                                        button.loadTexture('muteOff');
                                    }
                                    }, this);
}
/*
function backToWeb(button) {
    window.location.href("http://http://zephyrus.sytes.net/");
}*/
//----------------------------------------//

//BOOT STATE
var bootState = {
    preload: function () {
        //Loading bar sprite
        game.load.image('progressBar1', 'assets/sprites/progressbar1.png');
        game.load.image('progressBar2', 'assets/sprites/progressbar2.png');
    },

    create: function() {
        //Physics system start
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Keep running even the focus is lost
        game.stage.disableVisibilityChange = true;

        //Fullscreen everytime
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

        //Screen bounderies
        game.world.setBounds(0, 0, 1280, 720);

        //Background colour
        game.stage.backgroundColor = '#ffffff';

        //2nd LOAD STATE
        game.state.start('load');
    }
}