var game = new Phaser.Game(800, 600, Phaser.CANVAS, "phaser-example", {
  preload: preload,
  create: create,
  update: update
});

var sprite;
var count = 0;

function preload() {
  game.load.spritesheet(
    "start",
    "./assets/img/bri_big_anim_start.png",
    392,
    372,
    4
  );
  game.load.spritesheet(
    "middle",
    "./assets/img/bri_big_anim_middle.png",
    449,
    432,
    4
  );
  game.load.spritesheet(
    "finish",
    "./assets/img/bri_big_anim_finish.png",
    326,
    337,
    4
  );
}

function create() {
  sprite = game.add.sprite(100, 200, "start");
  sprite2 = game.add.sprite(100, 200, "middle");
  sprite3 = game.add.sprite(100, 200, "finish");

  sprite.animations.add("walk");
  sprite2.animations.add("walk");
  sprite3.animations.add("walk");

  sprite.animations.play("walk", 50, true);
  sprite2.animations.play("walk", 50, true);
  sprite3.animations.play("walk", 50, true);

  game.add.tween(sprite3).to({ y: 100 }, 5000, Phaser.Easing.Linear.None, true);
  sprite.scale.x = 0.2;
  sprite.scale.y = 0.2;
  sprite3.scale.x = 0.5;
  sprite3.scale.y = 0.5;
}

//  update isn't called until 'create' has completed. If you need to process stuff before that point (i.e. while the preload is still happening)
//  then create a function called loadUpdate() and use that
function update() {
  sprite2.visible = false;
  sprite3.visible = false;

  if (sprite.scale.x >= 0.5) {
    if (count >= 100) {
      if (sprite3.scale.x < 0.2) {
        sprite2.visible = true;
        sprite2.animations.stop();
        sprite2.scale.x = 0.2;
        sprite2.scale.y = 0.2;
        sprite2.x = 100;
        sprite2.y = 100;
      } else {
        sprite2.visible = false;
        sprite3.visible = true;
        sprite3.scale.x -= 0.005;
        sprite3.scale.y -= 0.005;
      }
    } else {
      sprite2.visible = true;
      sprite.visible = false;
      sprite2.scale.x = 0.5;
      sprite2.scale.y = 0.5;
      count++;
    }
  } else {
    sprite.scale.x += 0.005;
    sprite.scale.y += 0.005;
  }
}
