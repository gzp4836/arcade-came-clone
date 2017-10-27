var Constant = {
    numCols: 5,
    numRows: 6,
    colX: 101,
    rowY: 83,
    speed: 500,
    gap: 0,
    numEnemy: 4,
    gapX: 0.8
};
Constant.colsX = Constant.colX * Constant.numCols;
Constant.rowsY = Constant.rowY * Constant.numRows;
// 这是我们的玩家要躲避的敌人
var Enemy = function (loc) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = loc.x || 0;
    this.y = loc.y || 0;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function (dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    if (this.x >= player.x - Constant.gapX * Constant.colX && this.x <= player.x + Constant.gapX * Constant.colX && player.y === this.y) {
        var heart = new Heart({"x": player.x, "y": player.y});
        allHeart.push(heart);
        player.reset();
        setTimeout(function () {
            heart.eated = true;
        }, 100)
    } else {
        console.log();
    }
    if (this.x >= Constant.colsX) {
        this.x = 0;
        return;
    }
    this.x += dt * this.speed;
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function () {
    this.reset();
};
Player.prototype.update = function () {

};

Player.prototype.reset = function () {
    this.x = (Constant.numCols - 1) / 2 * Constant.colX;
    this.y = (Constant.numRows - 1 - Constant.gap) * Constant.rowY;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (d) {
    switch (d) {
        case "left" :
            var x = this.x - Constant.colX;
            if (x >= 0) {
                this.x = x;
            }
            break;
        case "right" :
            var x = this.x + Constant.colX;
            if (x < Constant.colsX) {
                this.x = x;
            }
            break;
        case "up" :
            var y = this.y - Constant.rowY;
            if (y > Constant.gap * Constant.rowY) {
                this.y = y;
            } else if (Math.abs(y) === Constant.gap * Constant.rowY) {
                this.y = y;
                star.show = true;
                star.x = this.x;
                star.y = this.y;
                player.reset();
                setTimeout(function () {
                    star.show = false;
                }, 1000);

            }
            break;
        case "down" :
            var y = this.y + Constant.rowY;
            if (y < Constant.rowsY - Constant.rowY * Constant.gap) {
                this.y = y;
            }
            break;
    }
};
var Star = function () {
    this.sprite = 'images/Star.png';
    this.show = false;
    this.x = 0;
    this.y = 0;
};
Star.prototype.render = function () {
    if (this.show) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

};
var Heart = function (loc) {
    this.sprite = 'images/Heart.png';
    this.x = loc.x;
    this.y = loc.y;
    this.eated = false;
};
Heart.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};
Heart.prototype.update = function () {
    // if(player.x === this.x && player.y === this.y){
    //     allHeart.splice(this.indexOf(),1);
    // }

};
var allHeart = [];
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];
for (var i = 0; i < Constant.numEnemy; i++) {
    var loc = {
        "x": Resources.random() * Constant.colsX,
        "y": (i % 4 + 1 - Constant.gap) * Constant.rowY
    };
    var enemy = new Enemy(loc);
    enemy.speed = Resources.random() * Constant.speed;
    // loc.y = (4 - Constant.gap) * Constant.rowY;
    allEnemies.push(enemy);
}
var player = new Player();
var star = new Star();


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

