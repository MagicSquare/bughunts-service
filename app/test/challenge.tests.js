'use strict';

var should = require('should'),
    Challenge = require('../src/challenge'),
    challengeData = require('../../res/challenge_data');

var map = null;
var bug = null;
var challenge = null;

describe('challenge', function () {
    describe('moveBug', function () {
        beforeEach(function(done) {

            challenge = challenge = new Challenge(challengeData.hashTag, challengeData.map);
            challenge.bug.x = 1;
            challenge.bug.y = 1;
            challenge.bug.d = challenge.TOP;
            done();
        });

        it('should be able to make the bug move forward', function (done) {
            challenge.moveBugForward(1);
            challenge.bug.y.should.be.equal(0);

            challenge.bug.d = challenge.RIGHT;
            challenge.moveBugForward(1);
            challenge.bug.x.should.be.equal(2);

            challenge.bug.d = challenge.BOTTOM;
            challenge.moveBugForward(1);
            challenge.bug.y.should.be.equal(1);

            challenge.bug.d = challenge.LEFT;
            challenge.moveBugForward(1);
            challenge.bug.x.should.be.equal(1);
            done();
        });

        it('should make the bug move forward several times', function (done) {
            challenge.bug.d = challenge.RIGHT;
            challenge.moveBugForward(3);
            challenge.bug.x.should.be.equal(4);
            done();
        });

        it('should be able to make the bug move backward', function (done) {
            challenge.moveBugBackward(1);
            challenge.bug.y.should.be.equal(2);

            challenge.bug.d = challenge.RIGHT;
            challenge.moveBugBackward(1);
            challenge.bug.x.should.be.equal(0);

            challenge.bug.d = challenge.BOTTOM;
            challenge.moveBugBackward(1);
            challenge.bug.y.should.be.equal(1);

            challenge.bug.d = challenge.LEFT;
            challenge.moveBugBackward(1);
            challenge.bug.x.should.be.equal(1);
            done();
        });

        it('should make the bug move backward several times', function (done) {
            challenge.bug.d = challenge.TOP;
            challenge.moveBugBackward(3);
            challenge.bug.y.should.be.equal(4);
            done();
        });

        it('should be able to make the bug turn', function (done) {
            challenge.turnBugLeft(1);
            challenge.bug.d.should.be.equal(challenge.LEFT);
            challenge.turnBugRight(1);
            challenge.bug.d.should.be.equal(challenge.TOP);
            done();
        });

        it('should make the bug turn several times', function (done) {
            challenge.turnBugLeft(10);
            challenge.bug.d.should.be.equal(challenge.BOTTOM);
            challenge.turnBugRight(10);
            challenge.bug.d.should.be.equal(challenge.TOP);
            done();
        });

        it('should make the bug move forward when instruction is FO', function (done) {
            challenge.tryChallenge('FO');
            challenge.bug.y.should.be.equal(0);
            done();
        });

        it('should make the bug move back when instruction is BA', function (done) {
            challenge.tryChallenge('BA');
            challenge.bug.y.should.be.equal(2);
            done();
        });

        it('should make the bug turn left when instruction is LE', function (done) {
            challenge.tryChallenge('LE');
            challenge.bug.d.should.be.equal(challenge.LEFT);
            done();
        });

        it('should make the bug turn right when instruction is RI', function (done) {
            challenge.tryChallenge('RI');
            challenge.bug.d.should.be.equal(challenge.RIGHT);
            done();
        });

        it('should win when the bug reaches the goal', function (done) {
            challenge.tryChallenge('RI FO FO RI FO').win.should.be.equal(true);
            done();
        });

        it('should win when the bug reaches the goal (parameter version)', function (done) {
            challenge.tryChallenge('RI FO 2 RI FO').win.should.be.equal(true);
            done();
        });

        it('should loose when the bug use all instructions without reaching the goal', function (done) {
            challenge.tryChallenge('RI FO FO').win.should.be.equal(false);
            done();
        });

        it('should return number of instructions when the goal is reached', function (done) {
            challenge.tryChallenge('RI FO FO RI FO').nbInstructions.should.be.equal(5);
            done();
        });

        it.skip('should loose when the bug is blocked', function (done) {
            done();
        });

    })
});