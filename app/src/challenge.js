var LadyBug = require('bughunts-lang').LadyBug;
    Big = require('big.js');

var STONE_EXCEPTION = "Encountered a stone";

function Challenge(hashTag, mapGame, mapImage, theme) {

    this.DIR_TOP = 0;
    this.DIR_RIGHT = 1;
    this.DIR_BOTTOM = 2;
    this.DIR_LEFT = 3;

    this.INSTRUCTION_FORWARD = 'FO';
    this.INSTRUCTION_BACKWARD = 'BA';
    this.INSTRUCTION_LEFT = 'LE';
    this.INSTRUCTION_RIGHT = 'RI';

    this.GOAL = 'g';
    this.EMPTY = 'o';
    this.STONE = 's';

    this.hashTag = hashTag;
    this.map = mapGame;
    this.mapImage = mapImage;
    this.theme = theme;
    this.nbInstructions = 0;
    this.finalIntructions = [];
    this.nbCases = 0;

    this.bug = {
        x: 1,
        y: 1,
        d: this.DIR_RIGHT
    };
}

Challenge.prototype.initBug = function () {
    this.bug = {
        x: 1,
        y: 1,
        d: this.DIR_RIGHT
    };
    this.finalIntructions = [];
    this.nbInstructions = 0;
    this.nbCases = 0;
};

Challenge.prototype.pointIsOnMap = function (x, y) {
    var result = (y >= 0 && y < this.map.length);
    if (result === false) {
        return false;
    }
    return (x >= 0 && x < this.map[0].length);
};

Challenge.prototype.moveBugForward = function (nbMove) {
    this.nbInstructions++; 
    var i = null,
        newX = null,
        newY = null;
    var instruction;
    if (nbMove > 0) {
        instruction = this.INSTRUCTION_FORWARD;
    }else{
        instruction = this.INSTRUCTION_BACKWARD;
    }
    switch (this.bug.d) {
        case this.DIR_TOP:
            for (i = 1; i <= Math.abs(nbMove); i++) {
                newY = this.bug.y - i;
                if (nbMove < 0) {
                    newY = this.bug.y + i;
                }
                if (this.pointIsOnMap(this.bug.x - 1, newY - 1)) {
                    if (this.map[newY - 1][this.bug.x - 1] == this.STONE) {
                        throw STONE_EXCEPTION;
                    }
                }
                this.finalIntructions.push(instruction);
            }
            this.bug.y = this.bug.y - nbMove;
            break;
        case this.DIR_RIGHT:
            for (i = 1; i <= Math.abs(nbMove); i++) {
                newX = this.bug.x + i;
                if (nbMove < 0) {
                    newX = this.bug.x - i;
                }
                if (this.pointIsOnMap(newX - 1, this.bug.y - 1)) {
                    if (this.map[this.bug.y - 1][newX - 1] == this.STONE) {
                        throw STONE_EXCEPTION;
                    }
                }
                this.finalIntructions.push(instruction);
            }
            this.bug.x = this.bug.x + nbMove;
            break;
        case this.DIR_BOTTOM:
            for (i = 1; i <= Math.abs(nbMove); i++) {
                newY = this.bug.y + i;
                if (nbMove < 0) {
                    newY = this.bug.y - i;
                }
                if (this.pointIsOnMap(this.bug.x - 1, newY - 1)) {
                    if (this.map[newY - 1][this.bug.x - 1] == this.STONE) {
                        throw STONE_EXCEPTION;
                    }
                }
                this.finalIntructions.push(instruction);
            }
            this.bug.y = this.bug.y + nbMove;
            break;
        case this.DIR_LEFT:
            for (i = 1; i <= Math.abs(nbMove); i++) {
                newX = this.bug.x - i;
                if (nbMove < 0) {
                    newX = this.bug.x + i;
                }
                if (this.pointIsOnMap(newX - 1, this.bug.y - 1)) {
                    if (this.map[this.bug.y - 1][newX - 1] == this.STONE) {
                        throw STONE_EXCEPTION;
                    }
                }
                this.finalIntructions.push(instruction);
            }
            this.bug.x = this.bug.x - nbMove;
            break;
    }
    this.nbCases += Math.abs(nbMove);
};

Challenge.prototype.moveBugBackward = function (nbMove) {
    this.nbInstructions++;
    this.moveBugForward(-nbMove);
};

Challenge.prototype.turnBugLeft = function (nbMove) {
    this.nbInstructions++;
    var newD = this.bug.d - nbMove;
    if (newD < 0) {
        this.bug.d = 4 + newD % 4;
    } else {
        this.bug.d = newD;
    }
    for (var i=0; i<nbMove; i++){
        this.finalIntructions.push(this.INSTRUCTION_LEFT);
    }
};

Challenge.prototype.turnBugRight = function (nbMove) {
    this.nbInstructions++;
    this.bug.d = (this.bug.d + nbMove) % 4;
    for (var i=0; i<nbMove; i++){
        this.finalIntructions.push(this.INSTRUCTION_RIGHT);
    }
};

Challenge.prototype.tryChallenge = function (instructions) {
    this.initBug();
    
    var moveBugForward = function(instance) { return function(times) { instance.moveBugForward(times); } };
    var moveBackward = function(instance) { return function(times) { instance.moveBugBackward(times); } };
    var turnBugLeft = function(instance) { return function(times) { instance.turnBugLeft(times); } };
    var turnBugRight = function(instance) { return function(times) { instance.turnBugRight(times); } };

    var l = new LadyBug({
      onMoveForward:  moveBugForward(this),
      onMoveBackward: moveBackward(this),
      onTurnLeft:     turnBugLeft(this),
      onTurnRight:    turnBugRight(this)
    });

    try{        
        //twitter_parser.parseInstructions(instructions.toUpperCase(), new ChallengeListener(this));
        l.run(instructions.toUpperCase());
    }catch(e){
        console.log("exeption "+e);
    }

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
        win: win,
        score: score.toFixed(2),
        finalIntructions: this.finalIntructions.join(';')
    };
};

module.exports = Challenge;