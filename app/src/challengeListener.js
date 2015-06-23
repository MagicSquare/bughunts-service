var BugsHuntsListener = require('./lang/BugHuntsListener').BugHuntsListener;


function ChallengeListener(challenge) {
    BugsHuntsListener.call(this); // inherit default listener
    this.challenge = challenge;
    return this;
}

// inherit default listener
ChallengeListener.prototype = Object.create(BugsHuntsListener.prototype);
ChallengeListener.prototype.constructor = ChallengeListener;

// override default listener behavior
ChallengeListener.prototype.enterRuleFO = function (ctx) {
    var nbMove = 1;
    this.challenge.nbInstructions = this.challenge.nbInstructions +1;
    if (ctx.param !== null) {
        this.challenge.nbInstructions = this.challenge.nbInstructions +1;
        nbMove = parseInt(ctx.param.text);
    }
    this.challenge.moveBugForward(nbMove);
};

ChallengeListener.prototype.exitRuleFO = function (ctx) {
};

ChallengeListener.prototype.enterRuleBA = function (ctx) {
    var nbMove = 1;
    this.challenge.nbInstructions = this.challenge.nbInstructions +1;
    if (ctx.param !== null) {
        this.challenge.nbInstructions = this.challenge.nbInstructions +1;
        nbMove = parseInt(ctx.param.text);
    }
    this.challenge.moveBugBackward(nbMove);
};

ChallengeListener.prototype.exitRuleBA = function (ctx) {
};

ChallengeListener.prototype.enterRuleRI = function (ctx) {
    var nbMove = 1;
    this.challenge.nbInstructions = this.challenge.nbInstructions +1;
    if (ctx.param !== null) {
        this.challenge.nbInstructions = this.challenge.nbInstructions +1;
        nbMove = parseInt(ctx.param.text);
    }
    this.challenge.turnBugRight(nbMove);
};

ChallengeListener.prototype.exitRuleRI = function (ctx) {
};

ChallengeListener.prototype.enterRuleLE = function (ctx) {
    var nbMove = 1;
    this.challenge.nbInstructions = this.challenge.nbInstructions +1;
    if (ctx.param !== null) {
        this.challenge.nbInstructions = this.challenge.nbInstructions +1;
        nbMove = parseInt(ctx.param.text);
    }
    this.challenge.turnBugLeft(nbMove);
};

ChallengeListener.prototype.exitRuleLE = function (ctx) {
};

exports.ChallengeListener = ChallengeListener;