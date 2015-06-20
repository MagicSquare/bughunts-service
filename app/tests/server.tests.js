'use strict';

var should = require('should'),
    extractor = require('../src/extractor');

var bad_tweet = null;

describe('bad_tweet extractor', function () {
    before(function(done) {
        bad_tweet = {
            text: 'blah blah blah'
        };
        done();
    });

    it('should return error message when receiving a bad tweet', function (done) {
        var instructions = extractor.extractInstructions(bad_tweet);
        instructions.should.be.equal('Syntax Error');
        done();
    });
});