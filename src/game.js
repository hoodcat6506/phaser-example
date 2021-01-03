import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 200},
    },
  },
  scene: {
    preload: preload,
    create: create,
  },
};

const GAME = new Phaser.Game(config);

/**
 * preload
 */
function preload() {
  this.load.image('sky', 'assets/images/skies/space3.png');
  this.load.image('logo', 'assets/images/sprites/phaser3-logo.png');
  this.load.image('blue', 'assets/images/particles/blue.png');
}

/**
 * create
 */
function create() {
  this.add.image(400, 300, 'sky');

  const particles = this.add.particles('blue');

  const emitter = particles.createEmitter({
    speed: 100,
    scale: {start: 1, end: 0},
    blendMode: 'ADD',
  });

  const logo = this.physics.add.image(400, 100, 'logo');

  logo.setVelocity(100, 200);
  logo.setBounce(1, 1);
  logo.setCollideWorldBounds(true);

  emitter.startFollow(logo);
}

export default GAME;
