var columnsArray = [60, 145, 230];
var speedArray = [5, 10, 7, 11, 12, 6, 8, 9];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = columnsArray[Math.floor(Math.random()*columnsArray.length)];
    this.speedX = speedArray[Math.floor(Math.random()*speedArray.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.speed *= dt;
    this.x += this.speedX;
    if (this.x > 650) {
        this.x = -100;
        this.y = columnsArray[Math.floor(Math.random()*columnsArray.length)];
        this.speedX = speedArray[Math.floor(Math.random()*speedArray.length)];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 400;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update() {
        this.x = this.x;
        this.y = this.y;
    }

    handleInput(e) {
        switch(e) {
            case 'left':
                if (this.x === 0){
                    return;
                }
                else{
                    this.x -= 100; 
                }
                break;
            case 'right':
                if (this.x === 400){
                    return;
                }
                else {
                    this.x += 100;
                }
                break;
            case 'up':
                if (this.y < 120) {
                    this.y = 400;
                    this.x = 200;
                }
                else {
                    this.y -= 85;
                }
                break;
            case 'down':
                if (this.y === 400) {
                    return;
                }
                else {
                    this.y += 85;    
                }
                break;
        }
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy1 = new Enemy;
const enemy2 = new Enemy;
const enemy3 = new Enemy;
var allEnemies = [enemy1, enemy2, enemy3];
const player = new Player;

function checkCollisions() {
    for (let enemy of allEnemies) {
        if (Math.floor(enemy.x/100)*100 === player.x && enemy.y === player.y) {
            player.x = 200;
            player.y = 400;
        }
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
