

zombieWorld.credits = function () {};
zombieWorld.credits.prototype = {
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 700
    },
    preload: function () {
        this.game.load.image('BG', 'assets/images/credits.png');
        this.game.load.image('notes', 'assets/images/btn/credits1.png');
        this.game.load.image('quit', 'assets/images/btn/quit.png');
        this.game.load.image('start', 'assets/images/btn/start1.png');

    },
    create: function () {
        this.add.button(850, 770, 'start', this.startAgain, this);
        this.add.button(1150, 770, 'quit', this.quitGame, this);

        var menu = this.game.add.sprite(0, 0, 'BG');
        var notes = this.game.add.sprite(15,100, 'notes');

        var start = this.game.add.sprite(850, 770, 'start');
        var quit = this.game.add.sprite(1150, 770, 'quit');
    },
    startAgain: function () {
        music.stop();
        game.state.start('state0');
    },
    quitGame: function () {
        this.game.destroy();
    }
};
