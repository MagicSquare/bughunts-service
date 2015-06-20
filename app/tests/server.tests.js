'use strict';

var should = require('should'),
    extractor = require('../src/extractor');

var tweet = null;

describe('tweet extractor', function () {
    before(function(done) {
        tweet = {
            // Insert twitter message
            text: 'Try again'
        };
        done();
    });

    it('receiving the given message should return the instructions', function (done) {
        var instructions = extractor.extractInstructions(tweet);
        instructions.should.be.equal('Try again');
        done();
    });
});