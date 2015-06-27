var twitter_parser = require('./twitter_parser'),
    ChallengeListener = require('./challengeListener').ChallengeListener,
    Big = require('big.js');

function Challenge(hashTag, mapGame, mapImage, theme) {
    this.TOP = 0;
    this.RIGHT = 1;
    this.BOTTOM = 2;
    this.LEFT = 3;

    this.GOAL = 'g';
    this.EMPTY = 'o';
    this.STONE = 's';

    this.hashTag = hashTag;
    this.map = mapGame;
    this.mapImage = mapImage;
    this.theme = theme;
    this.nbInstructions = 0;
    this.nbCases = 0;
    this.stoneHit = false;

    this.bug = {
        x: 1,
        y: 1,
        d: this.RIGHT
    };
}

Challenge.prototype.initBug = function () {
    this.bug = {
        x: 1,
        y: 1,
        d: this.RIGHT
    };
    this.nbInstructions = 0;
    this.nbCases = 0;
    this.stoneHit = false;
};

Challenge.prototype.pointIsOnMap = function (x, y) {
    var result = (y >= 0 && y < this.map.length);
    if (result === false) {
        return false;
    }
    return (x >= 0 && x < this.map[0].length);
};

Challenge.prototype.moveBugForward = function (nbMove) {
    var i = null,
        newX = null,
        newY = null;
    switch (this.bug.d) {
        case this.TOP:
            for (i = 1; i <= Math.abs(nbMove); i++) {
                newY = this.bug.y - i;
                if (nbMove < 0) {
                    newY = this.bug.y + i;
                }
                if (this.pointIsOnMap(this.bug.x - 1, newY - 1)) {
                    if (this.map[newY - 1][this.bug.x - 1] == this.STONE) {
                        this.stoneHit = true;
                    }
                }
            }
            this.bug.y = this.bug.y - nbMove;
            break;
        case this.RIGHT:
            for (i = 1; i <= Math.abs(nbMove); i++) {
                newX = this.bug.x + i;
                if (nbMove < 0) {
                    newX = this.bug.x - i;
                }
                if (this.pointIsOnMap(newX - 1, this.bug.y - 1)) {
                    if (this.map[this.bug.y - 1][newX - 1] == this.STONE) {
                        this.stoneHit = true;
                    }
                }
            }
            this.bug.x = this.bug.x + nbMove;
            break;
        case this.BOTTOM:
            for (i = 1; i <= Math.abs(nbMove); i++) {
                newY = this.bug.y + i;
                if (nbMove < 0) {
                    newY = this.bug.y - i;
                }
                if (this.pointIsOnMap(this.bug.x - 1, newY - 1)) {
                    if (this.map[newY - 1][this.bug.x - 1] == this.STONE) {
                        this.stoneHit = true;
                    }
                }
            }
            this.bug.y = this.bug.y + nbMove;
            break;
        case this.LEFT:
            for (i = 1; i <= Math.abs(nbMove); i++) {
                newX = this.bug.x - i;
                if (nbMove < 0) {
                    newX = this.bug.x + i;
                }
                if (this.pointIsOnMap(newX - 1, this.bug.y - 1)) {
                    if (this.map[this.bug.y - 1][newX - 1] == this.STONE) {
                        this.stoneHit = true;
                    }
                }
            }
            this.bug.x = this.bug.x - nbMove;
            break;
    }
    this.nbCases += Math.abs(nbMove);
};

Challenge.prototype.moveBugBackward = function (nbMove) {
    this.moveBugForward(-nbMove);
};

Challenge.prototype.turnBugLeft = function (nbMove) {
    var newD = this.bug.d - nbMove;
    if (newD < 0) {
        this.bug.d = 4 + newD % 4;
    } else {
        this.bug.d = newD;
    }
};

Challenge.prototype.turnBugRight = function (nbMove) {
    this.bug.d = (this.bug.d + nbMove) % 4;
};

Challenge.prototype.tryChallenge = function (instructions) {
    this.initBug();

    twitter_parser.parseInstructions(instructions.toUpperCase(), new ChallengeListener(this));

    var score = new Big(0);
    if (this.nbInstructions > 0 && this.nbCases > 0) {
        score = new Big(((1 / this.nbInstructions) * 100) * ((1 / this.nbCases) * 100));
    }
    var win = false;
    try {
        win = (this.map[this.bug.y - 1][this.bug.x - 1]) == this.GOAL;
    } catch (e) {
        win = false;
    }

    return {
        win: win && (!this.stoneHit),
        score: score.toFixed(2)
    };
};

module.exports = Challenge;