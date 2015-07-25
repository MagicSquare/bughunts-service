var ChallengeService = require('./challengeService'),
    challenge = require('bughunts-challenge'),
    RestClient = require('node-rest-client').Client,
    images = require('../res/images_config');

var game = null;

exports.execute = function(game, command) {

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

exports.executeLastChallenge = function(command, callback) {

    if(game === null) {
        callback({error: 'No challenge found'});
        return;
    }

    callback(exports.execute(game, command));
};

exports.executeChallenge = function (challenge, command, callback) {
    try{
        var challengeDetails = require('../res/challenges/'+challenge+'.js');
    }catch(err){
        callback({error: 'No challenge found'});
        return;
    }
    var game = createGame(challengeDetails.name, challengeDetails.theme, challengeDetails.squares);

    callback(exports.execute(game, command));
};

createGame = function(name, theme, mapArray){
    var map = new challenge.Map(mapArray[0].length, mapArray.length, mapArray);
    var game = new challenge.Game('#' + name, map);
    game.theme = theme;
    return game;
}

exports.createGameWithViewer = function(name, nbX, nbY, theme, mapGame, callback){
    var mapClient = new RestClient();
    console.log ("call : "+images.config.host + '/v2/res/' + nbX + ':' + nbY + '/theme/' + theme + '/map/' + mapGame + '/rules/true');
    mapClient.get(images.config.host + '/v2/res/' + nbX + ':' + nbY + '/theme/' + theme + '/map/' + mapGame + '/rules/true', function (data, response) {
        var mapArray = extractMapArray(mapGame, nbX, nbY);
        var map = new challenge.Map(mapArray[0].length, mapArray.length, mapArray);
        var game = new challenge.Game('#' + name, map);
        game.theme = theme;
        game.mapImage = data;

        listen(game);

        callback(data);
    });
};

var listen = function(newChallenge) {
    game = newChallenge;
};

var extractMapArray = function(mapGame, nbX, nbY) {
    var mapArray = [];
    for (var y = 0; y < nbY; y++) {
        var mapLine = [];
        var line = mapGame.substring(y * nbX, (y + 1) * nbX);
        for (var i = 0; i < line.length; i++) {
            mapLine.push(line[i]);
        }
        mapArray.push(mapLine);
    }
    return mapArray;
};

exports.extractMapArray = extractMapArray;
exports.listen = listen;