'use strict';

var should = require('should'),
    CommandService = require('../src/commandService.js'),
    challenge0001 = require('../res/challenges/0x0001.js');

describe('command service', function () {
    before(function(done) {
        done();
    });

    it('should return an error if the challenge is unknown', function (done) {
        CommandService.executeChallenge('toto', 'FO', function(output) {
            output.error.should.be.equal('No challenge #toto found');
        });
        done();
    });

    it('should return an output with ', function (done) {
        CommandService.executeChallenge('0x0001', 'FO FO', function(output) {
            var expected = {
                command: ['FO','FO'],
                message: "Congratulations ! You won the challenge #0x0001. Your score is : 4.00",
                win: true,
                score: "4.00",
                challenge: '#0x0001',
                details: [
                    [{"bug": {"dir": {"x": 1, "y": 0}, "pos": {"x": 2, "y": 2}}, "type": "bug"}],
                    [{"bug": {"dir": {"x": 1, "y": 0}, "pos": {"x": 3, "y": 2}}, "type": "bug"}]
                ],
                map: {"actors": [{"dir": {"x": 1, "y": 0}, "pos": {"x": 3, "y": 2}, "type": "l"}],
                    "mapSize": 25,
                    "res": {"x": 5, "y": 5},
                    "squares": ["o", "o", "o", "o", "o", "o", "o", "o", "s", "o", "o", "l", "o", "g", "o", "o", "o", "o", "s", "o", "o", "o", "o", "o", "o"]
                },
                theme: 10
            };
            output.should.be.eql(expected);
        });
        done();
    });
});