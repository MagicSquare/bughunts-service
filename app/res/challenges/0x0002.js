var challenge = require('bughunts-challenge');

exports.name = '#0x0002';

exports.squares = [
    ['s','o','o','o','o','g'],
    ['o','o','o','o','s','s'],
    ['o','s','o','o','o','o'],
    ['o','o','o','s','o','o'],
    ['o','o','s','o','o','o'],
    ['o','o','o','o','s','o'],
    ['o','o','o','o','l','s']
];

exports.actors = [
    {
        type: 'l',
        pos: new challenge.Point(4, 6),
        dir: challenge.Game.DIR_LEFT
    }
];

exports.theme = 10;