var challenge = require('bughunts-challenge');

exports.name = '0x0001';

exports.squares = [
    ['o','o','o','o','o'],
    ['o','o','o','s','o'],
    ['o','l','o','g','o'],
    ['o','o','o','s','o'],
    ['o','o','o','o','o']
];

exports.actors = [
    {
        type: 'l',
        pos: new challenge.Point(1, 2),
        dir: challenge.Game.DIR_RIGHT
    }
];

exports.theme = 10;
