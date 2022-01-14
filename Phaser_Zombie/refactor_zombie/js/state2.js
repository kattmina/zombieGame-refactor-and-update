zombieWorld.state2 = function () {};

var centerX,
    centerY,
    zombie, cutie, speed = 8,
    level2Data,
    platform,
    bgimage, spike, saw;

zombieWorld.state2.prototype = {
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
        this.game.load.audio('music', 'assets/music/desert.wav');
        this.game.load.audio('hurt', 'assets/music/hurtZ.wav');
        this.game.load.audio('gig', 'assets/music/bymondfisch89.ogg');

        // basic stuff for json
        this.load.image('crystal', 'assets/images/crystal.png');
        this.load.image('ground', 'assets/images/sands/ground.png');
        this.load.image('platform', 'assets/images/sands/platform.png');
        this.load.image('platform2', 'assets/images/sands/platform2.png');

        // background and background objects
        this.load.image('BG', 'assets/images/sands/BG.png');

        this.game.load.image('tree', 'assets/images/sands/bg_objects/tree.png');
        this.game.load.image('cacti1', 'assets/images/sands/bg_objects/cacti1.png');
        this.game.load.image('cacti2', 'assets/images/sands/bg_objects/cacti3.png');
        this.game.load.image('skel', 'assets/images/sands/bg_objects/skeleton.png');
        this.game.load.image('grass1', 'assets/images/sands/bg_objects/grass1.png');
        this.game.load.image('grass2', 'assets/images/sands/bg_objects/grass2.png');
        this.game.load.image('stone', 'assets/images/sands/bg_objects/stone.png');
        this.game.load.image('bush', 'assets/images/sands/bg_objects/bush2.png');
        this.game.load.image('bush2', 'assets/images/sands/bg_objects/bush1.png');

        // saw, sawGenerator, obstacles 
        this.load.image('saw', 'assets/images/saw.png');
        this.load.image('goal', 'assets/images/cementery/bg_objects/skull.png');

        this.load.image('spike', 'assets/images/obstacles_for_zombie/pinkcacti.png', 100, 100);

        // spritesheets: crystal, cutie & zombie
        this.load.spritesheet('crystal', 'assets/images/crystal.png', 20, 21, 2, 1, 1);
        this.game.load.spritesheet('cutie', 'assets/images/cutieSpritesheet.png', 415, 455);
        this.load.spritesheet('zombie', 'assets/images/player_spritesheet.png', 405, 515);


        this.load.text('level2', 'assets/data/level2.json');
    },

    create: function () {

        this.game.stage.backgroundColor = '#000000';
        var BG = this.game.add.sprite(0, 0, 'BG');
        BG.height = game.height;

        //music
        music = game.add.audio('music');
        music.play('', 0, 0.3, true);

        hurt = game.add.audio('hurt');
        gig = game.add.audio('gig');

        // background objects
        this.bgimage = this.add.sprite(-100, 700, 'tree');
        this.bgimage = this.add.sprite(1050, 540, 'tree');
        //this.bgimage = this.add.sprite(250, 540, 'tree');
        this.bgimage = this.add.sprite(900, -10, 'tree');

        this.bgimage = this.add.sprite(1050, 750, 'skel');
        this.bgimage = this.add.sprite(670, 400, 'grass1');
        this.bgimage = this.add.sprite(750, 400, 'grass1');
        this.bgimage = this.add.sprite(700, 340, 'cacti1');
        this.bgimage = this.add.sprite(760, 380, 'cacti2');
        this.bgimage = this.add.sprite(670, 585, 'stone');
        this.bgimage = this.add.sprite(730, 610, 'grass1');
        this.bgimage = this.add.sprite(300, 290, 'grass1');
        this.bgimage = this.add.sprite(350, 290, 'grass2');
        this.bgimage = this.add.sprite(1000, 855, 'cacti2');
        this.bgimage = this.add.sprite(570, 162, 'bush');
        this.bgimage = this.add.sprite(150, 450, 'bush2');
        this.bgimage = this.add.sprite(100, 430, 'bush2');

        this.sawGenerator = this.add.sprite(440, 113, 'goal');
        this.sawGenerator.scale.setTo(0.3, 0.3);

        this.ground = this.add.sprite(0, 950, 'ground');
        this.ground.scale.setTo(3.9, 1);
        this.game.physics.arcade.enable(this.ground);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;

        //parse the file
        this.level2Data = JSON.parse(this.game.cache.getText('level2'));

        this.platforms = this.add.group();
        this.platforms.enableBody = true;

        this.level2Data.platform1.forEach(function (element) {
            this.platforms.create(element.x, element.y, 'platform');
        }, this);

        this.level2Data.platform2.forEach(function (element) {
            this.platforms.create(element.x, element.y, 'platform2');
        }, this);

        this.platforms.setAll('body.immovable', true);
        this.platforms.setAll('body.allowGravity', false);

        //crystals
        this.crystals = this.add.group();
        this.crystals.enableBody = true;

        var crystal;
        this.level2Data.crystalData.forEach(function (element) {
            crystal = this.crystals.create(element.x, element.y, 'crystal');
            crystal.animations.add('crystal', [0, 1], 4, true);
            crystal.play('crystal');
        }, this);

        this.crystals.setAll('body.allowGravity', false);

        //obstacles
        this.spikes = this.add.group();
        this.spikes.enableBody = true;

        var spike;
        this.level2Data.obstacleData.forEach(function (element) {
            spike = this.spikes.create(element.x, element.y, 'spike');
        }, this);

        this.spikes.setAll('body.immovable', true);
        this.spikes.setAll('body.allowGravity', false);

        //create zombie
        this.zombie = this.add.sprite(this.level2Data.zombieStart.x, this.level2Data.zombieStart.y, 'zombie', 3);
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
        this.sawCreator = this.game.time.events.loop(Phaser.Timer.SECOND * this.level2Data.sawFrequency, this.createSaw, this);

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
        game.state.start('state2');
    },

    createSaw: function () {
        var saw = this.saws.getFirstExists(false);

        if (!saw) {
            saw = this.saws.create(0, 0, 'saw');
        }

        saw.body.collideWorldBounds = true;
        saw.body.bounce.set(1, 0.2);

        saw.reset(this.sawGenerator.x, this.sawGenerator.y);
        saw.body.velocity.x = this.level2Data.sawSpeed;
    },
    win: function (zombie, cutie) {
        gig.play('', 0, 0.8, false);
        music.stop();
        game.state.start('state3');
    }
};
