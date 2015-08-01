var challenge = require('bughunts-challenge');

exports.name = '#0x0003';

exports.squares = [
    ['o','o','s','o','o','s','o','o','o','o','o','o'],
    ['s','o','o','o','o','s','o','s','o','o','o','s'],
    ['o','o','o','s','o','o','o','s','o','o','o','o'],
    ['l','o','s','o','o','o','o','s','o','o','s','g'],
    ['o','o','s','o','o','s','o','o','o','o','s','o'],
    ['o','o','s','o','o','s','o','o','o','s','o','o'],
    ['o','o','o','o','o','o','o','s','o','o','o','o']
];

exports.actors = [
    {
        type: 'l',
        pos: new challenge.Point(0, 3),
        dir: challenge.Game.DIR_RIGHT
    }
];

exports.theme = 10;