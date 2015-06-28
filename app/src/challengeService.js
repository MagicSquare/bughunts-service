var mongo = require('mongoskin'),
    Challenge = require('./challenge');

var db = mongo.db("mongodb://localhost:27017/bugsbot", {native_parser: true});
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