var RestClient = require('node-rest-client').Client,
    Challenge = require('./app/src/challenge'),
    twitter_answer = require('./app/src/twitter_answer'),
    twitter_question = require('./app/src/twitter_question'),
    challengeData = require('./res/challenge_data');

var mapSquares = '';
challengeData.map.map(function (line) {
    line.map(function (square) {
        mapSquares += square;
    });
});

var mapClient = new RestClient();
mapClient.get('http://151.80.235.36:8000/8/7/13/' + mapSquares, function (data, response) {

    var challenge = new Challenge(challengeData.hashTag, challengeData.map, data);
    twitter_question.ask(challenge);
    twitter_answer.listen(challenge);
});
