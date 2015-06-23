var RestClient = require('node-rest-client').Client,
    Challenge = require('./app/src/challenge'),
    twitter_answer = require('./app/src/twitter_answer'),
    twitter_question = require('./app/src/twitter_question'),
    challengeData = require('./res/challenge_data');

var mapSquares = '',
    nbX = 0,
    nbY = challengeData.map.length;
challengeData.map.map(function (line) {
    nbX = line.length;
    line.map(function (square) {
        mapSquares += square;
    });
});

var mapClient = new RestClient();
mapClient.get('http://151.80.235.36:8000/' + nbX + '/' + nbY +'/13/' + mapSquares, function (data, response) {

    var challenge = new Challenge(challengeData.hashTag, challengeData.map, data);
    twitter_question.ask(challenge);
    twitter_answer.listen(challenge);
});