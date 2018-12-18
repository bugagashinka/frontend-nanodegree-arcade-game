const playerStartPos = { x: 202, y: 380 };
// Enemies our player must avoid
var Enemy = function(startPos, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = startPos.x;
  this.y = startPos.y;
  this.speed = speed;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;
  if (this.x > ctx.canvas.width) {
    this.x = -100;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  ctx.strokeRect(
    this.x,
    this.y + 80,
    Resources.get(this.sprite).width,
    Resources.get(this.sprite).height - 110,
  );
};

// Now write your own player class
var Player = function(startPos) {
  this.x = startPos.x;
  this.y = startPos.y;
  this.sprite = 'images/char-boy.png';
};
// This class requires an update(), render() and
Player.prototype.update = function(dt) {
  this.x = this.x;
  this.y = this.y;
};
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  ctx.strokeRect(
    this.x + 15,
    this.y + 85,
    Resources.get(this.sprite).width - 30,
    Resources.get(this.sprite).height - 120,
  );
};
// a handleInput() method.
Player.prototype.handleInput = function(direction) {
  if (direction == 'left') {
    this.move({
      x: this.x - 100,
      y: this.y,
    });
  } else if (direction == 'up') {
    this.move({
      x: this.x,
      y: this.y - 80,
    });
  } else if (direction == 'right') {
    this.move({
      x: this.x + 100,
      y: this.y,
    });
  } else if (direction == 'down') {
    this.move({
      x: this.x,
      y: this.y + 80,
    });
  }
};

Player.prototype.move = function move(newPos) {
  if (newPos.x > 402 || newPos.x < 2 || newPos.y > 380 || newPos.y < 60) {
    if (newPos.y < 60) this.reset();
    return;
  }
  this.x = newPos.x;
  this.y = newPos.y;
};

//Reset Player to initial position
Player.prototype.reset = function() {
  this.x = playerStartPos.x;
  this.y = playerStartPos.y;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
  new Enemy({ x: 0, y: 55 }, 80),
  new Enemy({ x: 0, y: 145 }, 100),
  new Enemy({ x: 0, y: 230 }, 140),
  new Enemy({ x: -250, y: 55 }, 80),
  new Enemy({ x: -250, y: 230 }, 120),
];
// Place the player object in a variable called player
var player = new Player(playerStartPos);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
