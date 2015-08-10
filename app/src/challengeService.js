var mongo = require('mongoskin'),
    challenge = require('bughunts-challenge'),
    config = require('../res/config');

var db = mongo.db(config.db, {native_parser: true});
db.bind('challenge');

exports.registerChallenge = function (game, callback) {
    db.challenge.insert({
        hashTag: game.hashTag,
        created: Date.now(),
        mapGame: game.map,
        mapImage: game.mapImage,
        theme: game.theme
    }, function (err, result) {
        if (err) {
            console.log(err);
            return;

        }
        if (result.length === 0) {
            console.log('Error while registering new challenge : ' + game.hashTag);
        }
        var challengeData = result[0];
        console.log("New challenge registered : " + challengeData.hashTag);
        callback(err, challengeData);
    });
};

exports.getCurrentChallenge = function (callback) {
    db.challenge.find().sort({created: -1}).limit(1).toArray(function (err, challenges) {
        if (err) {
            console.log(err);
            return;
        }
        if (challenges.length === 0) {
            console.log('No challenge found !');
            return;
        }
        var challengeData = challenges[0];
        var map = challengeData.mapGame;
        if(map instanceof Array) {
            map = new challenge.Map(map[0].length, map.length, map);
        }
        var game = new challenge.Game(challengeData.hashTag, map);
        game.mapImage = challengeData.mapImage;
        game.theme = challengeData.theme;
        callback(game);
    });
};

exports.playerSolvedChallenge = function(challengeHashtag, player, score, command) {
    db.challenge.update({hashTag: challengeHashtag}, {'$push': {players: {name: player, score: score, command: command}}}, {upsert:true}, function(err) {
        if (err) {
            console.log(err);
        }
    });
};

exports.getHighscores = function(challengeHashtag, callback) {
    function error(type, msg, error) {
        console.log(msg + ((typeof error === 'undefined')? '' : ': ' + error) );
        callback({error: msg, type: type});
    }
    db.challenge.find({hashTag: challengeHashtag}).toArray(function (err, challenges) {
        if (err) {
            error(999, 'Error when loading highscores', err);
            return;
        }
        if (challenges.length === 0) {
            error(1, 'no highscore for challenge '+challengeHashtag);
            return;
        }
        var game = challenges[0];
        if (typeof game.players === 'undefined') {
            error(1, 'No players on this challenge');
            return;
        }
        var highscores = game.players;
        highscores.sort(function(p1, p2) {
            if (parseFloat(p1.score) > parseFloat(p2.score)) {
                return -1;
            }
            if (parseFloat(p1.score) < parseFloat(p2.score)) {
                return 1;
            }
            return 0;
        });
        callback(highscores);
    });
};

exports.getChallenges = function(callback) {
    db.challenge.find({}, {hashTag: 1, _id: 0}).toArray(function(err, challenges) {
        if (err) {
            console.log(err);
            return;
        }
        callback(challenges);
    });
};