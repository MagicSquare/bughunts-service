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
        var game = new challenge.Game(challengeData.hashTag, challengeData.mapGame, challengeData.mapImage, challengeData.theme);
        callback(game);
    });
};

exports.playerSolvedChallenge = function(challengeHashtag, player, score) {
    db.challenge.update({hashTag: challengeHashtag}, {'$push': {players: {name: player, score: score}}}, function(err) {
        if (err) {
            console.log(err);
        }
    });
};

exports.getHighscores = function(challengeHashtag, callback) {
    function error(msg, error) {
        console.log(msg + ((typeof error === 'undefined')? '' : ': ' + error) );
        callback({error: msg});
    }
    db.challenge.find({hashTag: challengeHashtag}).toArray(function (err, challenges) {
        if (err) {
            error('Error when loading highscores', err);
            return;
        }
        if (challenges.length === 0) {
            error('No challenge found for highscores !');
            return;
        }
        var game = challenges[0];
        if (typeof game.players === 'undefined') {
            error('No players on this challenge');
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