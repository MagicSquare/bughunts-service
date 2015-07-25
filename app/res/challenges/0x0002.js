var challenge = require('bughunts-challenge');

var squares = [
    ['l','1','o','o','o'],
    ['o','o','o','s','o'],
    ['2','o','3','g','s'],
    ['o','o','o','s','o'],
    ['o','o','o','o','o']
];
var actors = [
    {
        type: 'l',
        pos: new challenge.Point(0, 0),
        dir: challenge.Game.DIR_RIGHT
    },
    {
        type: 't',
        pos: new challenge.Point(1, 0),
        target : 2
    },
    {
        type: 'm',
        pos: new challenge.Point(0, 2),
        dir: challenge.Game.DIR_RIGHT
    },
    {
        type: 'w',
        pos: new challenge.Point(2, 2)
    }
];

exports.map = new challenge.Map(5, 5, squares, actors);
exports.name = '#0x0002';