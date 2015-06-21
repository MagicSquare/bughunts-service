'use strict';

var should = require('should'),
    twitter_extractor = require('../src/twitter_extractor'),
    tweet_challenge3 = require('./resources/tweet_challenge3.js');

var unknown_tweet = null;

describe('tweet extractor', function () {
    before(function(done) {
        unknown_tweet = {
            text: 'blah blah blah'
        };

        done();
    });

    it('should return null when receiving a bad tweet', function (done) {
        var tweetData = twitter_extractor.extractInstructions(unknown_tweet);
        should.not.exist(tweetData);
        done();
    });

    it('should return the texte when receiving a good tweet', function (done) {
        var tweetData = twitter_extractor.extractInstructions(tweet_challenge3.tweet);
        tweetData.instructions.should.be.equal('FO TL TL FO');
        done();
    });

    it('should return the challenge id when receiving a good tweet', function (done) {
        var tweetData = twitter_extractor.extractInstructions(tweet_challenge3.tweet);
        tweetData.challenge.should.be.equal('3');
        done();
    });
});