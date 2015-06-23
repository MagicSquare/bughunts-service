var twitter_parser = require('./twitter_parser'),
    ChallengeListener = require('./challengeListener').ChallengeListener,
    challengeData = require('../../res/challenge_data');

function Challenge() {
    this.TOP = 0;
    this.RIGHT = 1;
    this.BOTTOM = 2;
    this.LEFT = 3;

    this.GOAL = 'g';
    this.EMPTY = 'o';

    this.bug = {
        x: 1,
        y: 1,
        d: this.TOP
    };

    this.map = challengeData.map;
    this.hashTag = challengeData.hashTag;
}

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
    twitter_parser.parseInstructions(instructions, new ChallengeListener(this));
    return (this.map[this.bug.y][this.bug.x]) == this.GOAL;
};

module.exports = Challenge;