var loadState = {

    preload: function() {
        //carga texto de cargado
        var loadingBar = game.add.text(80,150, 'loading...', {font: '30px Courier', fill: '#ffffff'});
        loadingBar.anchor.setTo(0.5, 0.5);

        //muestra de la barra de carga
        var progressBar = game.add.sprite(game.width/2, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);

        //carga de fondos
        game.load.image('main-menu-back', 'assets/backgrounds/main-menu-back.png');
        game.load.image('stage-back', 'assets/backgrounds/stage-back.gif');

        //carga de imagenes
        game.load.image('player', 'assets/sprites/player.png');
        game.load.image('item01', 'assets/sprites/item01.png');
        game.load.image('enemy01', 'assets/sprites/enemy01.png');

        //carga de sonidos
        game.load.audio('1up', 'assets/sfx/1up.wav');
        game.load.audio('coin', 'assets/sfx/coin.wav');
        game.load.audio('shoot', 'assets/sfx/shoot.wav');

        //carga de musica
        game.load.audio('mainMenuMusic', 'assets/music/mainMenuMusic.wav');

    },

    create: function() {
        //cargamos el segundo state, MENU
        game.state.start('menu');
    }


}
