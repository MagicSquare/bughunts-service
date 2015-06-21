var TOP = 0;
var RIGHT = 1;
var BOTTOM = 2;
var LEFT = 3;

var GOAL = 'g';
var EMPTY = 'o';

var bug = {
    x:1,
    y:1,
    d:TOP
};

var map =
    [
        ['o','o','o','o','o'],
        ['o','o','o','o','o'],
        ['o','o','o','g','o'],
        ['o','o','o','o','o'],
        ['o','o','o','o','o']
    ];

var moveBugForward = function(nbMove){
    switch(bug.d) {
        case TOP:
            bug.y = bug.y-nbMove;
            break;
        case RIGHT:
            bug.x = bug.x+nbMove;
            break;
        case BOTTOM:
            bug.y = bug.y+nbMove;
            break;
        case LEFT:
            bug.x = bug.x-nbMove;
            break;
    }
};

var moveBugBackward = function (nbMove){
    moveBugForward(-nbMove);
};

var turnBugLeft = function (nbMove){
    var newD = bug.d - nbMove;
    if (newD < 0){
        bug.d = 4 + newD%4;
    }else{
        bug.d = newD;
    }
};

var turnBugRight = function (nbMove){
    bug.d = (bug.d + nbMove)%4;
};

var tryChallenge = function(instructions){
    for(var i = 0; i < instructions.length; i++)
    {
        switch(instructions[i]) {
            case "FO":
                moveBugForward(1);
                break;
            case "BA":
                moveBugBackward(1);
                break;
            case "TL":
                turnBugLeft(1);
                break;
            case "TR":
                turnBugRight(1);
                break;
        }
    }
    return (map[bug.y][bug.x]) == GOAL;
};

exports.TOP = TOP;
exports.RIGHT = RIGHT;
exports.BOTTOM = BOTTOM;
exports.LEFT = LEFT;
exports.bug = bug;
exports.map = map;
exports.moveBugForward = moveBugForward;
exports.moveBugBackward = moveBugBackward;
exports.turnBugLeft = turnBugLeft;
exports.turnBugRight = turnBugRight;

exports.tryChallenge = tryChallenge;