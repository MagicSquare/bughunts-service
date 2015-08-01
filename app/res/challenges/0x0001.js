var challenge = require('bughunts-challenge');

exports.name = '#0x0001';

exports.squares = [
    ['o','o','s','o','g'],
    ['o','o','o','o','o'],
    ['s','o','o','o','o'],
    ['o','o','o','s','o'],
    ['l','s','o','o','o']
];

exports.actors = [
    {
        type: 'l',
        pos: new challenge.Point(0, 4),
        dir: challenge.Game.DIR_TOP
    }
];

exports.theme = 10;
