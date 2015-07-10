var mongo = require('mongoskin'),
    Challenge = require('./challenge'),
    config = require('../res/config'),
    twitter_credentials = require('../res/twitter_credentials');

var db = mongo.db(config.db, {native_parser: true});
db.bind('challenge');


exports.registerChallenge = function (challenge, callback) {
    db.challenge.insert({
        hashTag: challenge.hashTag,
        created: Date.now(),
        mapGame: challenge.map,
        mapImage: challenge.mapImage,
        theme: challenge.theme
    }, function (err, result) {
        if (err) {
            console.log(err);
            return;

        }
        if (result.length === 0) {
            console.log('Error while registering new challenge : ' + challenge.hashTag);
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
        var challenge = new Challenge(challengeData.hashTag, challengeData.mapGame, challengeData.mapImage, challengeData.theme);
        callback(challenge);
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
        var challenge = challenges[0];
        if (typeof challenge.players === 'undefined') {
            error('No players on this challenge');
            return;
        }
        var highscores = challenge.players;
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