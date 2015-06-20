'use strict';

var should = require('should'),
    twitter_extractor = require('../src/twitter_extractor');

var unknown_tweet = null,
    tweet_challenge3 = null;

describe('tweet extractor', function () {
    before(function(done) {
        unknown_tweet = {
            text: 'blah blah blah'
        };

        tweet_challenge3 = {
            text: '#bugshunt #challenge3 FO TL TL FO'
        };

        done();
    });

    it('should return null when receiving a bad tweet', function (done) {
        var tweetData = twitter_extractor.extractInstructions(unknown_tweet);
        should.not.exist(tweetData);
        done();
    });

    it('should return the texte when receiving a good tweet', function (done) {
        var tweetData = twitter_extractor.extractInstructions(tweet_challenge3);
        tweetData.instructions.should.be.equal('FO TL TL FO');
        done();
    });

    it('should return the challenge id when receiving a good tweet', function (done) {
        var tweetData = twitter_extractor.extractInstructions(tweet_challenge3);
        tweetData.challenge.should.be.equal('3');
        done();
    });
});