var zombieWorld = {};

zombieWorld.state0 = function () {};
zombieWorld.state0.prototype = {
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 700
    },
    preload: function () {
        this.game.load.audio('music', 'assets/music/mm.mp3');
        this.game.load.image('menu', 'assets/images/menuStart.png');
        this.game.load.image('start', 'assets/images/btn/start.png');

    },
    create: function () {
        //this.add.button(0, 0, 'menu', this.startGame, this);
        this.add.button(742, 670, 'start', this.startGame, this);
        //music
        music = game.add.audio('music');
        music.play('', 0, 0.3, true);
        var menu = this.game.add.sprite(0, 0, 'menu');
        var start = this.game.add.sprite(742, 670, 'start');


    },
    startGame: function () {
        music.stop();
        // Change the state to the actual game.
        this.state.start('state1');
    }
};
