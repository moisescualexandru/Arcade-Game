var columnsArray = [60, 145, 230];
var speedArray = [5, 10, 7, 11, 12, 6, 8, 9];
var score = document.querySelector('.score');
var scoreCount = 0;
var lives = 5;

// Enemies our player must avoid
var Enemy = function() {
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

// The Player class that loads the default image and sets the starting position
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
                    if (this.x === 100 || this.x === 300) {
                        return;
                    }
                    else {
                        this.y = 400;
                        this.x = 200;
                        scoreCount += 100;
                        increaseDifficulty();
                        score.textContent = scoreCount;
                    }
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

// Instantiating the objects

const enemy1 = new Enemy;
const enemy2 = new Enemy;
const enemy3 = new Enemy;
var allEnemies = [enemy1, enemy2, enemy3];
const player = new Player;

//This checks if the player and the enemies occupy the same spot on the canvas
function checkCollisions() {
    for (let enemy of allEnemies) {
        if (Math.floor(enemy.x/100)*100 === player.x && enemy.y === player.y) {
            player.x = 200;
            player.y = 400;
            decreaseLife();
        }
    }
}

//Increase the difficulty of the game if the player reaches score limits
function increaseDifficulty() {
    if (scoreCount >= 500 && allEnemies.length < 4) {
        const enemy4 = new Enemy;
        allEnemies.push(enemy4);
        document.querySelector('.level').textContent = 'Intermediate';
    } else if (scoreCount >= 1000 && allEnemies.length < 5) {
        const enemy5 = new Enemy;
        allEnemies.push(enemy5);
        const enemy6 = new Enemy;
        allEnemies.push(enemy6);
        document.querySelector('.level').textContent = 'Expert';
    }
}

function decreaseLife() {
    if (lives > 0) {
        document.querySelector('.life').remove();
        lives--;
    } else {
        
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
