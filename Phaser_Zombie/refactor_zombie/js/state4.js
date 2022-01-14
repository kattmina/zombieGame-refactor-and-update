zombieWorld.state4 = function () {};
zombieWorld.state4.prototype = {
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;

    },
    preload: function () {
        this.game.load.audio('music', 'assets/music/mw.wav');
        this.game.load.image('win', 'assets/ending.png');
        this.game.load.image('credits', 'assets/images/btn/credits.png');
        this.game.load.image('quit', 'assets/images/btn/quit.png');
        this.game.load.image('start', 'assets/images/btn/start1.png');
        this.game.load.image('lol', 'assets/images/lol.png');
        
        //this.load.audio('bgMusic', ['assets/audio/win.mp3']);
    },
    create: function () {
        
        this.add.button(850, 470, 'start', this.restartGame, this);
        this.add.button(850, 620, 'credits', this.credits, this);
        this.add.button(850, 770, 'quit', this.quitGame, this);
        //music
        music = game.add.audio('music');
        music.play('', 0, 0.3, true);

        var win = this.game.add.sprite(0, 0, 'win');

        var start = this.game.add.sprite(850, 470, 'start');
        var credits = this.game.add.sprite(850, 620, 'credits');
        var quit = this.game.add.sprite(850, 770, 'quit');
        var lol = this.game.add.sprite(420,120, 'lol');


        //var bgMusic = this.game.add.audio('bgMusic', 1, false);

    },

    // Change the state to the actual game.
    restartGame: function () {
        music.stop();
        this.state.start('state0');
    },
    credits: function () {
        this.state.start('credits');
    },
    quitGame: function () {
        this.game.destroy();
    }

};
