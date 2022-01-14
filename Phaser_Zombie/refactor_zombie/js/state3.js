zombieWorld.state3 = function () {};

var centerX,
    centerY,
    zombie, cutie, speed = 8,
    level3Data,
    platform,
    bgimage, spike, saw;

zombieWorld.state3.prototype = {
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 750;

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.RUNNING_SPEED = 180;
        this.JUMPING_SPEED = 550;
    },

    preload: function () {
        this.game.load.audio('jump', 'assets/music/jump.wav');
        this.game.load.audio('music', 'assets/music/winter.wav');
        this.game.load.audio('hurt', 'assets/music/hurtZ.wav');
        this.game.load.audio('pain', 'assets/music/pain.ogg');

        // basic stuff for json
        this.load.image('ground', 'assets/images/winter/ground.png');
        this.load.image('platform', 'assets/images/winter/platform.png');
        this.load.image('platform2', 'assets/images/winter/platform2.png');

        // background and background objects
        this.load.image('BG', 'assets/images/winter/BG.png');

        this.game.load.image('tree', 'assets/images/winter/bg_objects/Tree_1.png');
        this.game.load.image('tree2', 'assets/images/winter/bg_objects/Tree_2.png');
        this.game.load.image('igloo', 'assets/images/winter/bg_objects/Igloo.png');
        this.game.load.image('SnowMan', 'assets/images/winter/bg_objects/SnowMan.png');
        this.game.load.image('crys', 'assets/images/winter/bg_objects/Crystal.png');
        this.game.load.image('IceBox', 'assets/images/winter/bg_objects/IceBox.png');
        this.game.load.image('stone', 'assets/images/winter/bg_objects/stone.png');

        // saw, sawGenerator, obstacles 
        this.load.image('saw', 'assets/images/saw.png');
        this.load.image('goal', 'assets/images/cementery/bg_objects/skull.png');

        this.load.image('spike', 'assets/images/obstacles_for_zombie/pinkcrystal.png', 100, 100);

        // spritesheets: cutie & zombie
        this.game.load.spritesheet('cutie', 'assets/images/cutieSpritesheet.png', 415, 455);
        this.load.spritesheet('zombie', 'assets/images/player_spritesheet.png', 405, 515);


        this.load.text('level3', 'assets/data/level3.json');
    },

    create: function () {

        this.game.stage.backgroundColor = '#000000';
        var BG = this.game.add.sprite(0, 0, 'BG');
        BG.height = game.height;

        //music
        music = game.add.audio('music');
        music.play('', 0, 1, true);
        
        hurt = game.add.audio('hurt');
        pain = game.add.audio('pain');

        // background objects
        this.bgimage = this.add.sprite(-10, 680, 'tree');
        this.bgimage = this.add.sprite(1195, 575, 'tree2');
        //this.bgimage = this.add.sprite(250, 540, 'tree');
        this.bgimage = this.add.sprite(850, 125, 'tree2');

        this.bgimage = this.add.sprite(1050, 680, 'crys');
        this.bgimage = this.add.sprite(670, 380, 'crys');

        this.bgimage = this.add.sprite(1160, 160, 'crys');
        this.bgimage = this.add.sprite(1080, 325, 'igloo');
        this.bgimage = this.add.sprite(120, 360, 'SnowMan');
        this.bgimage = this.add.sprite(670, 578, 'stone');
        this.bgimage = this.add.sprite(730, 585, 'crys');

        this.bgimage = this.add.sprite(350, 285, 'IceBox');
        this.bgimage = this.add.sprite(300, 260, 'crys');

        this.sawGenerator = this.add.sprite(440, 113, 'goal');
        this.sawGenerator.scale.setTo(0.3, 0.3);

        this.ground = this.add.sprite(0, 950, 'ground');
        this.ground.scale.setTo(3.9, 1);
        this.game.physics.arcade.enable(this.ground);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;

        //parse the file
        this.level3Data = JSON.parse(this.game.cache.getText('level3'));

        this.platforms = this.add.group();
        this.platforms.enableBody = true;

        this.level3Data.platform1.forEach(function (element) {
            this.platforms.create(element.x, element.y, 'platform');
        }, this);

        this.level3Data.platform2.forEach(function (element) {
            this.platforms.create(element.x, element.y, 'platform2');
        }, this);

        this.platforms.setAll('body.immovable', true);
        this.platforms.setAll('body.allowGravity', false);

        //obstacles
        this.spikes = this.add.group();
        this.spikes.enableBody = true;

        var spike;
        this.level3Data.obstacleData.forEach(function (element) {
            spike = this.spikes.create(element.x, element.y, 'spike');
        }, this);

        this.spikes.setAll('body.immovable', true);
        this.spikes.setAll('body.allowGravity', false);

        //create zombie
        this.zombie = this.add.sprite(this.level3Data.zombieStart.x, this.level3Data.zombieStart.y, 'zombie', 3);
        this.zombie.anchor.setTo(0.1, 0.1);
        this.zombie.scale.setTo(0.2, 0.2);
        this.zombie.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.game.physics.arcade.enable(this.zombie);
        this.zombie.customParams = {};
        this.zombie.body.bounce.y = 0.2;
        this.zombie.body.collideWorldBounds = true;

        this.game.camera.follow(this.zombie);


        //create cutie
        this.cutie = this.game.add.sprite(150, 12, 'cutie');
        this.cutie.anchor.setTo(0.2, 0.2);
        this.cutie.scale.setTo(0.2, 0.2);
        this.game.physics.enable(this.cutie);
        this.cutie.customParams = {};
        this.cutie.body.collideWorldBounds = true;
        this.cutie.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

        //saws
        this.saws = this.add.group();
        this.saws.enableBody = true;

        this.createSaw();
        this.sawCreator = this.game.time.events.loop(Phaser.Timer.SECOND * this.level3Data.sawFrequency, this.createSaw, this);

    },

    update: function () {
        this.game.physics.arcade.collide(this.zombie, this.ground);
        this.game.physics.arcade.collide(this.cutie, this.platforms);
        this.game.physics.arcade.collide(this.zombie, this.platforms);

        this.game.physics.arcade.collide(this.saws, this.ground);
        this.game.physics.arcade.collide(this.saws, this.platforms);

        this.game.physics.arcade.overlap(this.zombie, this.spikes, this.killZombie);
        this.game.physics.arcade.overlap(this.zombie, this.saws, this.killZombie);
        this.game.physics.arcade.overlap(this.zombie, this.cutie, this.win);

        this.zombie.body.velocity.x = 0;
        if (this.cursors.right.isDown) {
            this.zombie.body.velocity.x = this.RUNNING_SPEED;
            this.zombie.scale.setTo(0.2, 0.2);
            this.zombie.animations.play('walk', 15, true);
        } else if (this.cursors.left.isDown) {
            this.zombie.body.velocity.x = -this.RUNNING_SPEED;
            this.zombie.scale.setTo(-0.2, 0.2);
            this.zombie.animations.play('walk', 15, true);
        } else {
            this.zombie.animations.stop('walk');
            // this.zombie.animation.play('idle',15, true);
            this.zombie.frame = 0;

        }
        if (this.cursors.up.isDown && this.zombie.body.touching.down) {
            this.zombie.body.velocity.y = -this.JUMPING_SPEED;
            var snd = this.add.audio('jump');
            snd.play();
        }
        this.cutie.animations.play('idle', 7, true);

        this.saws.forEach(function (sawElement) {
            if (sawElement.x < 10 && sawElement.y > 10) {
                sawElement.kill();
            }
        }, this);

    },
    killZombie: function (zombie, spike) {
        hurt.play('', 0, 0.3, false);
        music.stop();
        console.log('start from the beginning');
        game.state.start('state3');
    },
    createSaw: function () {
        var saw = this.saws.getFirstExists(false);

        if (!saw) {
            saw = this.saws.create(0, 0, 'saw');
        }

        saw.body.collideWorldBounds = true;
        saw.body.bounce.set(1, 0.2);

        saw.reset(this.sawGenerator.x, this.sawGenerator.y);
        saw.body.velocity.x = this.level3Data.sawSpeed;
    },
    win: function (zombie, cutie) {
        pain.play('', 0, 0.3, false);
        music.stop();
        game.state.start('state4');
    }
};
