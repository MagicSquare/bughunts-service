'use strict';

var should = require('should'),
    Challenge = require('../src/challenge'),
    challengeTestData = require('./res/challenge_test'),
    challengeStoneData = require('./res/challenge_stone'),
    challenge0XTEST2Data = require('./res/challenge_0xTEST2');

var map = null;
var bug = null;
var challenge = null;
var challengeStone = null;
var challenge0xTEST2 = null;

describe('challenge', function () {
    describe('moveBug', function () {
        beforeEach(function(done) {
            challenge = new Challenge(challengeTestData.hashTag, challengeTestData.map);
            challengeStone = new Challenge(challengeStoneData.hashTag, challengeStoneData.map);
            challenge0xTEST2 = new Challenge(challenge0XTEST2Data.hashTag, challenge0XTEST2Data.map);
            done();
        });

        it('should be able to make the bug move forward', function (done) {
            challenge.moveBugForward(1);
            challenge.bug.x.should.be.equal(2);

            challenge.bug.d = challenge.DIR_BOTTOM;
            challenge.moveBugForward(1);
            challenge.bug.y.should.be.equal(2);

            challenge.bug.d = challenge.DIR_LEFT;
            challenge.moveBugForward(1);
            challenge.bug.x.should.be.equal(1);

            challenge.bug.d = challenge.DIR_TOP;
            challenge.moveBugForward(1);
            challenge.bug.y.should.be.equal(1);

            done();
        });

        it('should make the bug move forward several times', function (done) {
            challenge.moveBugForward(3);
            challenge.bug.x.should.be.equal(4);
            done();
        });

        it('should be able to make the bug move backward', function (done) {
            challenge.bug.d = challenge.DIR_LEFT;
            challenge.moveBugBackward(1);
            challenge.bug.x.should.be.equal(2);

            challenge.bug.d = challenge.DIR_TOP;
            challenge.moveBugBackward(1);
            challenge.bug.y.should.be.equal(2);

            challenge.bug.d = challenge.DIR_RIGHT;
            challenge.moveBugBackward(1);
            challenge.bug.x.should.be.equal(1);

            challenge.bug.d = challenge.DIR_BOTTOM;
            challenge.moveBugBackward(1);
            challenge.bug.y.should.be.equal(1);

            done();
        });

        it('should make the bug move backward several times', function (done) {
            challenge.bug.d = challenge.DIR_TOP;
            challenge.moveBugBackward(3);
            challenge.bug.y.should.be.equal(4);
            done();
        });

        it('should be able to make the bug turn', function (done) {
            challenge.turnBugLeft(1);
            challenge.bug.d.should.be.equal(challenge.DIR_TOP);
            challenge.turnBugRight(1);
            challenge.bug.d.should.be.equal(challenge.DIR_RIGHT);
            done();
        });

        it('should make the bug turn several times', function (done) {
            challenge.turnBugLeft(10);
            challenge.bug.d.should.be.equal(challenge.DIR_LEFT);
            challenge.turnBugRight(10);
            challenge.bug.d.should.be.equal(challenge.DIR_RIGHT);
            done();
        });

        it('should make the bug move forward when instruction is FO', function (done) {
            challenge.tryChallenge('FO');
            challenge.bug.x.should.be.equal(2);
            done();
        });

        it('should make the bug move backward when instruction is BA', function (done) {
            challenge.tryChallenge('FO FO BA');
            challenge.bug.x.should.be.equal(2);
            done();
        });

        it('should make the bug turn left when instruction is LE', function (done) {
            challenge.tryChallenge('LE');
            challenge.bug.d.should.be.equal(challenge.DIR_TOP);
            done();
        });

        it('should make the bug turn right when instruction is RI', function (done) {
            challenge.tryChallenge('RI');
            challenge.bug.d.should.be.equal(challenge.DIR_BOTTOM);
            done();
        });

        it('should win when the bug reaches the goal', function (done) {
            challenge.tryChallenge('FO FO FO RI FO FO').win.should.be.equal(true);
            done();
        });

        it('should win when the bug reaches the goal (parameter version)', function (done) {
            challenge.tryChallenge('FO 3 RI FO 2').win.should.be.equal(true);
            done();
        });

        it('should win when the bug reaches the goal (case insensitive version)', function (done) {
            challenge.tryChallenge('fO 3 RI Fo 2').win.should.be.equal(true);
            done();
        });

        it('should loose when the bug use all instructions without reaching the goal', function (done) {
            challenge.tryChallenge('RI FO FO').win.should.be.equal(false);
            done();
        });

        it('should return number the score when the goal is reached', function (done) {
            challenge.tryChallenge('FO FO FO RI FO FO').score.should.be.equal('333.33');
            done();
        });

        it('should loose when the bug hit a stone moving forward', function (done) {
            // BOTTOM
            challengeStone.tryChallenge('FO FO RI FO FO').win.should.be.equal(false);
            // TOP
            challengeStone = new Challenge(challengeStoneData.hashTag, challengeStoneData.map);
            challengeStone.tryChallenge('RI FO 4 LE FO 2 LE FO 2').win.should.be.equal(false);
            // RIGHT
            challengeStone = new Challenge(challengeStoneData.hashTag, challengeStoneData.map);
            challengeStone.tryChallenge('RI FO 2 LE FO 2').win.should.be.equal(false);
            // LEFT
            challengeStone = new Challenge(challengeStoneData.hashTag, challengeStoneData.map);
            challengeStone.tryChallenge('FO 4 RI FO 2 RI FO 2').win.should.be.equal(false);

            done();
        });

        it('should loose when the bug hit a stone moving backward', function (done) {
            // BOTTOM
            challengeStone.tryChallenge('FO FO LE BA BA').win.should.be.equal(false);
            // TOP
            challengeStone = new Challenge(challengeStoneData.hashTag, challengeStoneData.map);
            challengeStone.tryChallenge('RI FO 4 LE FO 2 RI BA 2').win.should.be.equal(false);
            // RIGHT
            challengeStone = new Challenge(challengeStoneData.hashTag, challengeStoneData.map);
            challengeStone.tryChallenge('RI FO 2 RI BA 2').win.should.be.equal(false);
            // LEFT
            challengeStone = new Challenge(challengeStoneData.hashTag, challengeStoneData.map);
            challengeStone.tryChallenge('FO 4 RI FO 2 LE BA 2').win.should.be.equal(false);
            done();
        });

        it('should loose when the bug hit a stone in challenge 0xTEST2', function (done) {
            challenge0xTEST2.tryChallenge('RI FO 4 LE FO').win.should.be.equal(false);
            done();
        });

        it('should return the actual instructions used', function (done) {
            challenge.tryChallenge('FO FO 3 RI RI 5 LE LE 4 BA BA 2').finalIntructions.should.be.equal('FO;FO;FO;FO;RI;RI;RI;RI;RI;RI;LE;LE;LE;LE;LE;BA;BA;BA');
            done();
        });

        it('should stop when the bug hit a stone', function (done) {
            challengeStone.tryChallenge('RI FO LE FO 3 RI FO').finalIntructions.should.be.equal('RI;FO;LE;FO');
            challengeStone.bug.y.should.be.equal(2);
            challengeStone.bug.y.should.be.equal(2);
            done();
        });

        it.skip('should loose when the bug goes out of the map', function (done) {

        });
    })
});