var game = new Phaser.Game(1500, 1000, Phaser.AUTO);

game.state.add('state0', zombieWorld.state0);
game.state.add('state1', zombieWorld.state1);
game.state.add('state2', zombieWorld.state2);
game.state.add('state3', zombieWorld.state3);
game.state.add('state4', zombieWorld.state4);
game.state.add('credits', zombieWorld.credits);

game.state.start('state0');