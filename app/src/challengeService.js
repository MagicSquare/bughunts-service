var mongo = require('mongoskin'),
    Challenge = require('./challenge'),
    twitter_credentials = require('../res/twitter_credentials');

var db = mongo.db(twitter_credentials.db, {native_parser: true});
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
    db.challenge.find({hashTag: challengeHashtag}).toArray(function (err, challenges) {
        if (err) {
            console.log(err);
            return;
        }
        if (challenges.length === 0) {
            console.log('No challenge found for highscores !');
            return;
        }
        var challenge = challenges[0];
        var highscores = challenge.players;
        highscores.sort(function(p1, p2) {
            if (p1.score > p2.score) {
                return -1;
            }
            if (p1.score < p2.score) {
                return 1;
            }
            return 0;
        });
        callback(highscores);
    });
};