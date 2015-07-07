var ChallengeService = require('./challengeService');
    
var challenge = null;

exports.execute = function execute(challenge, command) {

    var output = {
      command: command,
      message: null,
      win: null,
      score: null,
      image: null,
      challenge: challenge.hashTag
    };

    var instructions = command;
    if (instructions === null) {
        return;
    }

    var result = challenge.tryChallenge(instructions);
    output.win = result.win;
    output.score = result.score;
    if (result.win) {
        output.message = "Congratulations ! You won the challenge " + challenge.hashTag + ". Your score is : " + result.score;
    } else {
        output.message = "The bug didn't succeed, try again...";
    }

    var nbY = challenge.map.length;
    var nbX = challenge.map[0].length;
    var mapString = '';
    challenge.map.map(function (line) {
        line.map(function (square) {
            mapString += square;
        });
    });

    output.image = 'http://151.80.235.36:8000/beta/res/' + nbX + ':' + nbY + '/theme/' + challenge.theme + '/map/' + mapString + '/cmd/' + result.finalIntructions;
    
    return output;
    
};

exports.executeLastChallenge = function execute(command, callback) {
    
    if(challenge === null) {
      callback({error: 'No challenge found'});
      return;
    }
    
    callback(exports.execute(challenge, command));
};

exports.listen = function listen(newChallenge) {
  challenge = newChallenge;
};