var LadyBug = require('bughunts-lang').LadyBug,
    Big = require('big.js'),
    Point = require('./point');

var STONE_EXCEPTION = {type: 'stone', msg: "Encountered a stone"},
    OUTSIDE_MAP_EXCEPTION = {type: 'ouside', msg: "Outside of the map"};

function Challenge(hashTag, mapGame, mapImage, theme) {

    this.DIR_TOP = new Point(0, -1);
    this.DIR_RIGHT = new Point(1, 0);
    this.DIR_BOTTOM = new Point(0, 1);
    this.DIR_LEFT = new Point(-1, 0);

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
        pos: new Point(0, 0),
        dir: this.DIR_RIGHT.clone()
    };
}

Challenge.prototype.initBug = function () {
    this.bug = {
        pos: new Point(0, 0),
        dir: this.DIR_RIGHT.clone()
    };
    this.finalIntructions = [];
    this.nbInstructions = 0;
    this.nbCases = 0;
};

Challenge.prototype.pointIsOnMap = function (point) {
    return(
        point.y >= 0 && point.y < this.map.length &&
        point.x >= 0 && point.x < this.map[0].length
    );
};

Challenge.prototype.moveBugForward = function (nbMove) {
    this.nbInstructions++; 

    var multiplier = nbMove / Math.abs(nbMove), // 1 if forward, -1 if backward
        pos = this.bug.pos.clone(),
        dir = this.bug.dir.mulN(multiplier), // Invert the direction if backward
        instruction = multiplier > 0 ? this.INSTRUCTION_FORWARD : this.INSTRUCTION_BACKWARD;

    for (var i = 0; i < Math.abs(nbMove); i++) {

        // Move the bug
        pos.add(dir);

        // Check if the point is on the map and is available
        if (!this.pointIsOnMap(pos)) {
            throw OUTSIDE_MAP_EXCEPTION;
        }
        if (this.map[pos.y][pos.x] == this.STONE) {
            throw STONE_EXCEPTION;
        }

        this.finalIntructions.push(instruction);
        this.nbCases++;
        this.bug.pos.set(pos);

    }
};

Challenge.prototype.moveBugBackward = function (nbMove) {
    this.moveBugForward(-nbMove);
};

Challenge.prototype.turnBugLeft = function (nbMove) {
    this.nbInstructions++;

    for (var i = 0; i < nbMove; i++) {
        this.bug.dir.invert().mul(1, -1); // Equivalent to the 2*2 rotation matrix
        this.finalIntructions.push(this.INSTRUCTION_LEFT);
    }
};

Challenge.prototype.turnBugRight = function (nbMove) {
    this.nbInstructions++;

    for (var i = 0; i < nbMove; i++) {
        this.bug.dir.invert().mul(-1, 1); // Equivalent to the 2*2 rotation matrix
        this.finalIntructions.push(this.INSTRUCTION_RIGHT);
    }
};

Challenge.prototype.tryChallenge = function (instructions) {
    this.initBug();
    var self = this;
    var isOutsideMap = false;

    var l = new LadyBug({
      onMoveForward:  function(times) {self.moveBugForward(times);},
      onMoveBackward: function(times) {self.moveBugBackward(times);},
      onTurnLeft:     function(times) {self.turnBugLeft(times);},
      onTurnRight:    function(times) {self.turnBugRight(times);}
    });

    try{
        l.run(instructions.toUpperCase());
    }catch(e){
        console.log("exeption "+e.msg);
        isOutsideMap = e.type === 'outside';
    }

    var score = new Big(0);
    if (this.nbInstructions > 0 && this.nbCases > 0) {
        score = new Big(((1 / this.nbInstructions) * 100) * ((1 / this.nbCases) * 100));
    }
    var win = false;
    try {
        win = !isOutsideMap && (this.map[this.bug.pos.y][this.bug.pos.x]) == this.GOAL;
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