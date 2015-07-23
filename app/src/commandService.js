var ChallengeService = require('./challengeService'),
    images = require('../res/images_config');
    
var game = null;

exports.execute = function execute(game, command) {

    var output = {
      command: command,
      message: null,
      win: null,
      score: null,
      image: null,
      challenge: game.hashTag,
      details: [],
      map: game.map
    };

    var instructions = command;
    if (instructions === null) {
        return;
    }

    var result = game.tryChallenge(instructions);
    output.win = result.win;
    output.score = result.score;
    output.details = result.details;
    if (result.win) {
        output.message = "Congratulations ! You won the challenge " + game.hashTag + ". Your score is : " + result.score;
    } else {
        output.message = "The bug didn't succeed, try again...";
    }

    var mapString = '';
    game.map.squares.map(function (square) {
      mapString += square;
    });

    output.image = images.config.host + '/v2/res/' + game.map.res.x + ':' + game.map.res.y + '/theme/' + game.theme + '/map/' + mapString + '/cmd/' + result.instructions + '/type/' + images.config.responseType;
    
    return output;
    
};

exports.executeLastChallenge = function execute(command, callback) {
    
    if(game === null) {
      callback({error: 'No challenge found'});
      return;
    }
    
    callback(exports.execute(game, command));
};

exports.listen = function listen(newChallenge) {
  game = newChallenge;
};