var ChallengeService = require('./challengeService'),
    challenge = require('bughunts-challenge'),
    RestClient = require('node-rest-client').Client;

var game = null;

exports.execute = function(game, command) {

    var instructions = command;
    if (instructions === null) {
        return;
    }

    var result = game.tryChallenge(instructions);

    var output = {
        command: result.instructions,
        message: "The bug didn't succeed, try again...",
        win: result.win,
        score: result.score,
        challenge: game.hashTag,
        details: result.details,
        map: game.initialMap
    };

    if (result.win) {
        output.message = "Congratulations ! You won the challenge " + output.challenge + ". Your score is : " + output.score;
    }

    return output;
};

exports.executeLastChallenge = function(command, callback) {

    if(game === null) {
        callback({error: 'No challenge found'});
        return;
    }

    callback(exports.execute(game, command));
};

exports.executeChallenge = function (name, command, callback) {
    var game;
    try {
        game = createGame(name);
    }catch(err){
        console.log(err);
        callback({error: err});
        return;
    }

    var output = exports.execute(game, command);

    callback(output);
};

exports.retrieveChallenge = function (name, callback){
    var game;
    try {
        game = createGame(name);
    }catch(err){
        callback({error: err});
        return;
    }

    var output = {
        map: game.initialMap
    };

    callback(output);
};

function createGame(name){
    var challengeDetails;
    try{
        challengeDetails = require('../res/challenges/'+name+'.js');
    }catch(err){
        throw 'No challenge #'+name+' found';
    }

    var map = new challenge.Map(challengeDetails.squares[0].length, challengeDetails.squares.length, challengeDetails.squares, challengeDetails.actors, parseInt(challengeDetails.theme));
    return new challenge.Game('#' + challengeDetails.name, map);
}

exports.createGameWithViewer = function(name, nbX, nbY, theme, mapGame, callback){
    var mapClient = new RestClient();
    console.log ("call : "+images.config.host + '/v2/res/' + nbX + ':' + nbY + '/theme/' + theme + '/map/' + mapGame + '/rules/true');
    mapClient.get(images.config.host + '/v2/res/' + nbX + ':' + nbY + '/theme/' + theme + '/map/' + mapGame + '/rules/true', function (data, response) {
        var mapArray = extractMapArray(mapGame, nbX, nbY);
        var map = new challenge.Map(mapArray[0].length, mapArray.length, mapArray);
        var game = new challenge.Game('#' + name, map);
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