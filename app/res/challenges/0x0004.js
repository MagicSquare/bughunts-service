var challenge = require('bughunts-challenge');

exports.name = '#0x0004';

exports.squares = [
    ['s','l','2','s','s', 'o', 'g'],
    ['s','o','o','s','s', 'o', 'o'],
    ['1','o','5','s','6', 'o', '4'],
    ['o','s','o','o','o', 's', 'o'],
    ['o','o','o','s','3', 's', 'o'],
    ['o','o','o','o','o', 's', 's']
];

exports.actors = [
    {
        type: 'l',
        pos: new challenge.Point(1, 0),
        dir: challenge.Game.DIR_RIGHT
    },
    {
        type: 't',
        pos: new challenge.Point(0, 2),
        target : 2
    },
    {
        type: 'm',
        pos: new challenge.Point(2, 0),
        dir: challenge.Game.DIR_BOTTOM
    },
    {
        type: 't',
        pos: new challenge.Point(4, 4),
        target : 4
    },
    {
        type: 'm',
        pos: new challenge.Point(6, 2),
        dir: challenge.Game.DIR_LEFT
    },
    {
        type: 'w',
        pos: new challenge.Point(2, 2)
    },
    {
        type: 'w',
        pos: new challenge.Point(4, 2)
    }
];

exports.theme = 20;