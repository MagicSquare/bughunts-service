var RestClient = require('node-rest-client').Client,
    Challenge = require('./app/src/challenge'),
    ChallengeService = require('./app/src/challengeService'),
    twitter_answer = require('./app/src/twitter_answer'),
    twitter_question = require('./app/src/twitter_question'),
    express = require('express');

if (process.env.BUGSBOT_ENVIRONMENT === undefined || process.env.BUGSBOT_ENVIRONMENT === null || process.env.BUGSBOT_ENVIRONMENT !== 'PRODUCTION') {
    process.env.BUGSBOT_ENVIRONMENT = 'DEV';
}

var app = express();

function extractMapArray(mapGame, nbX, nbY) {
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
}

app.get('/newChallenge/:hashtag/:nbX/:nbY/:theme/:mapGame', function (req, res, next) {
    var mapClient = new RestClient();
    mapClient.get('http://151.80.235.36:8000/' + req.params.nbX + '/' + req.params.nbY + '/' + req.params.theme + '/' + req.params.mapGame, function (data, response) {
        var mapArray = extractMapArray(req.params.mapGame, req.params.nbX, req.params.nbY);
        var challenge = new Challenge('#' + req.params.hashtag, mapArray, data, req.params.theme);

        twitter_question.ask(challenge);
        twitter_answer.listen(challenge);

        res.type('png').send(data);
    });
});

app.get('/highscores', function (req, res, next) {
    ChallengeService.getChallenges(function(challenges) {
        res.json(challenges);
    });
});

app.get('/highscores/:hashtag', function (req, res, next) {
    ChallengeService.getHighscores('#' + req.params.hashtag, function(highscores) {
        res.json(highscores);
    });
});

ChallengeService.getCurrentChallenge(twitter_answer.listen);

var port = process.env.BUGSBOT_PORT || 8111;
console.log('BugsBot started with environment ' + process.env.BUGSBOT_ENVIRONMENT + ' on port ' + port);
app.listen(port);