'use strict';

var should = require('should'),
    twitter_extractor = require('../src/twitter_extractor'),
    tweet_challenge3 = require('./res/tweet_challenge3.js');

var unknown_tweet = null;

describe('tweet extractor', function () {
    before(function(done) {
        unknown_tweet = {
            text: 'blah blah blah'
        };

        done();
    });
    
    it('should return the instructions when receiving a right message', function (done) {
        function instructions(message) {
          var result = twitter_extractor.extractInstructions({text: message});
          return result === null ? null : result.instructions;
        }
        
        instructions('@toto FO 5 ri 2').should.be.equal('FO 5 ri 2');
        instructions('@toto #0xTEST fo 5').should.be.equal('fo 5');
        instructions('@toto #0xTEST fo 5 blabla').should.be.equal('fo 5');
        instructions('@toto #0xTEST blabla fo 5').should.be.equal('fo 5');
        instructions('@toto #0xTEST blabla fo 5 blabla').should.be.equal('fo 5');
        instructions('@toto #0xTEST    fo 5').should.be.equal('fo 5');
        instructions('@toto     #0xTEST    fo 5').should.be.equal('fo 5');
        instructions('  @toto   fo   5   ').should.be.equal('fo 5');
        instructions('  @toto  #0xTEST blabla fo   5   ').should.be.equal('fo 5');
        instructions('@toto bla blabla fo fo 5').should.be.equal('fo fo 5');
        instructions('@toto bla blabla ri 5').should.be.equal('ri 5');
        instructions('@toto bla blabla ri 5').should.be.equal('ri 5');
        instructions('@toto this is a test ri 5').should.be.equal('ri 5');
        instructions('@toto1 @toto2 fo 5').should.be.equal('fo 5');
        instructions('@toto1 #0x01 #0x02 fo 5').should.be.equal('fo 5');
        instructions('@toto1   @toto2   #0x01    #0x02   bla   bla bla fo     5 ').should.be.equal('fo 5');
        
        done();
    });
    
    it('should return null when receiving a wrong message', function (done) {
        function instructions(message) {
          var result = twitter_extractor.extractInstructions({text: message});
          return result === null ? null : result.instructions;
        }
        
        should.not.exist(instructions('@toto'));
        should.not.exist(instructions('@toto #0xTEST'));
        should.not.exist(instructions('@toto #0xTEST blabla'));
        should.not.exist(instructions('@toto #0xTEST blabla blabla'));
        should.not.exist(instructions('#0xTEST blabla blabla'));
        should.not.exist(instructions('#0xTEST fo 2'));
        should.not.exist(instructions('fo 2 #0xTEST @toto'));
        
        done();
    });

    it('should return null when receiving a bad tweet', function (done) {
        var tweetData = twitter_extractor.extractInstructions(unknown_tweet);
        should.not.exist(tweetData);
        done();
    });

    it('should return the text when receiving a good tweet', function (done) {
        var tweetData = twitter_extractor.extractInstructions(tweet_challenge3.tweet);
        tweetData.instructions.should.be.equal('FO TL TL FO');
        done();
    });

    it('should return the challenge id when receiving a good tweet', function (done) {
        var tweetData = twitter_extractor.extractInstructions(tweet_challenge3.tweet);
        tweetData.challenge.should.be.equal('#challenge3');
        done();
    });
});