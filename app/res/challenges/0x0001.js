var challenge = require('bughunts-challenge');

var squares = [
    ['o','o','o','o','o'],
    ['o','o','o','o','o'],
    ['o','L','o','g','o'],
    ['o','o','o','o','o'],
    ['o','o','o','o','o']
];

exports.map = new challenge.Map(5, 5, squares);
exports.name = '0x0001';
exports.squares = squares;
exports.theme = 10;
