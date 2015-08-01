var challenge = require('bughunts-challenge');

exports.name = '#0x0005';

exports.squares = [
    ['s','s','o','1','o','s','o','o','g'],
    ['s','s','o','s','o','s','o','s','o'],
    ['o','o','o','l','o','s','o','s','o'],
    ['o','s','s','3','s','s','o','s','o'],
    ['o','s','o','o','o','o','o','s','o'],
    ['o','o','o','2','s','s','o','o','o']
];

exports.actors = [
    {
        type: 'l',
        pos: new challenge.Point(3, 2),
        dir: challenge.Game.DIR_RIGHT
    },
    {
        type: 't',
        pos: new challenge.Point(0, 3),
        target : 2
    },
    {
        type: 'm',
        pos: new challenge.Point(3, 5),
        dir: challenge.Game.DIR_TOP
    },
    {
        type: 'w',
        pos: new challenge.Point(3, 3)
    }
];

exports.theme = 20;