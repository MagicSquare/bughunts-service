var RestClient = require('node-rest-client').Client,
    Challenge = require('./app/src/challenge'),
    twitter_answer = require('./app/src/twitter_answer'),
    twitter_question = require('./app/src/twitter_question'),
    express = require('express');

var app = express();

app.get('/newChallenge/:hashtag/:nbX/:nbY/:mapGame', function(req, res, next) {
    var mapClient = new RestClient();
    mapClient.get('http://151.80.235.36:8000/' + req.params.nbX + '/' + req.params.nbY +'/13/' + req.params.mapGame, function (data, response) {
        var mapGame = [];
        for (var y = 0; y < req.params.nbY; y++) {
            var mapLine = [];
            var line = req.params.mapGame.substring(y * req.params.nbX, (y+1) * req.params.nbX);
            for (var i = 0; i < line.length; i++) {
                mapLine.push(line[i]);
            }
            mapGame.push(mapLine);
        }

        var challenge = new Challenge('#' + req.params.hashtag, mapGame, data);
        twitter_question.ask(challenge);
        twitter_answer.listen(challenge);
        res.type('png').send(data);
    });
});

app.listen(8111);