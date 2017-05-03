

var optionState = {

    create: function() {
        this.game.stage.backgroundColor = '#697e96';
        title = game.add.text(10, 10, 'OPCIONES', { fontSize: '20px', fill: '#fff' });
        backText = game.add.text(100, 100, 'Press Z to go back',  { fontSize: '20px', fill: '#fff' })

    },

    update: function() {
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
            game.state.start('menu');
        //abajo
        }   
    }

}
