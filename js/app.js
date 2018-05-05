//Declaring the global variables needed throughout the script
var xArray = [0, 100, 200, 300, 400];
var columnsArray = [60, 145, 230];
var speedArray = [5, 10, 7, 11, 12, 6, 8, 9];
var score = document.querySelector('.score');
var scoreCount = 0;
var lives = 4;
var anime = true;
var moves = 0;
var control = false;

// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    //Randomly selecting the position and the speed of the enemies
    this.y = columnsArray[Math.floor(Math.random()*columnsArray.length)];
    this.speedX = speedArray[Math.floor(Math.random()*speedArray.length)];
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
    this.speed *= dt;
    this.x += this.speedX;
    //Reseting the enemy position after it exits the game screen
    if (this.x > 650) {
        this.x = -100;
        this.y = columnsArray[Math.floor(Math.random()*columnsArray.length)];
        this.speedX = speedArray[Math.floor(Math.random()*speedArray.length)];
    }
};

// Draw the enemy on the screen
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
                    moves++;
                    drawGem();
                }
                break;
            case 'right':
                if (this.x === 400){
                    return;
                }
                else {
                    this.x += 100;
                    moves++;
                    drawGem();
                }
                break;
            case 'up':
                if (this.y < 120) {
                    if (this.x === 100 || this.x === 200) {
                        return;
                    }
                    else {
                        scoreCount += 100;
                        increaseDifficulty();
                        score.textContent = scoreCount;
                        moves++;
                        drawGem();
                        this.y = 400;
                        this.x = 200;
                    }
                }
                else {
                    this.y -= 85;
                    moves++;
                    drawGem();
                }
                break;
            case 'down':
                if (this.y === 400) {
                    return;
                }
                else {
                    this.y += 85;    
                    moves++;
                    drawGem();
                }
                break;
        }
    }

}

//Gem object

class Gem {
    constructor() {
        this.sprite = 'images/gem blue.png';
        this.x = -100;
        this.y = -100;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update() {
        this.x = this.x;
        this.y = this.y;
    }
}

// Instantiating the objects

const enemy1 = new Enemy;
const enemy2 = new Enemy;
const enemy3 = new Enemy;
var allEnemies = [enemy1, enemy2, enemy3];
const player = new Player;
const gem = new Gem;

//This checks if the player, enemies or gems occupy the same spot on the canvas
function checkCollisions() {
    for (let enemy of allEnemies) {
        if (Math.floor(enemy.x/100)*100 === player.x && enemy.y === player.y) {
            player.x = 200;
            player.y = 400;
            decreaseLife();
        }
    }

    if (player.x === gem.x-15 && player.y === gem.y-30) {
        scoreCount += 500;
        score.textContent = scoreCount;
        increaseDifficulty();
        control = false;
        gem.x = -100;
        gem.y = -100;
    }
}

//Drawing the Gem on the canvas

function drawGem () {
    if (moves%10===0 && moves!==0 && !control) {
        gem.x = xArray[Math.floor(Math.random()*xArray.length)] + 15;
        gem.y = columnsArray[Math.floor(Math.random()*columnsArray.length)] + 30;
        control = true;
    }
}

//Increase the difficulty of the game if the player reaches score limits
function increaseDifficulty() {
    if (scoreCount >= 2000 && allEnemies.length < 4) {
        const enemy4 = new Enemy;
        allEnemies.push(enemy4);
        document.querySelector('.level').textContent = 'Intermediate';
    } else if (scoreCount >= 4000 && allEnemies.length < 5) {
        const enemy5 = new Enemy;
        allEnemies.push(enemy5);
        const enemy6 = new Enemy;
        allEnemies.push(enemy6);
        document.querySelector('.level').textContent = 'Expert';
    }
}

//Decreasing the life counter if the player is hit by an enemy
function decreaseLife() {
    if (lives > 0) {
        document.querySelector('.life').remove();
        lives--;
    } else {
        document.querySelector('.comun').style.display = 'none';
        document.querySelector('.gameover').style.display = 'block';
        document.querySelector('.scoreOvr').textContent = scoreCount;
        while (allEnemies.length >3) {
            allEnemies.pop();
        }
        anime = false;
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
