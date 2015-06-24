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

    this.hashTag = hashTag;
    this.map = mapGame;
    this.mapImage = mapImage;
    this.theme = theme;
    this.nbInstructions = 0;
    this.nbCases = 0;

    this.bug = {
        x: 1,
        y: 1,
        d: this.RIGHT
    };
}

Challenge.prototype.initBug = function() {
    this.bug = {
        x: 1,
        y: 1,
        d: this.RIGHT
    };
    this.nbInstructions = 0;
    this.nbCases = 0;
};

Challenge.prototype.moveBugForward = function (nbMove) {
    switch (this.bug.d) {
        case this.TOP:
            this.bug.y = this.bug.y - nbMove;
            break;
        case this.RIGHT:
            this.bug.x = this.bug.x + nbMove;
            break;
        case this.BOTTOM:
            this.bug.y = this.bug.y + nbMove;
            break;
        case this.LEFT:
            this.bug.x = this.bug.x - nbMove;
            break;
    }
    this.nbCases += nbMove;
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
        score = new Big(((1/this.nbInstructions)*100) * ((1/this.nbCases)*100));
    }
    return {
        win : (this.map[this.bug.y-1][this.bug.x-1]) == this.GOAL,
        score : score.toFixed(2)
    };
};

module.exports = Challenge;