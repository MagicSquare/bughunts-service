var challenge = require('bughunts-challenge'),
    ChallengeService = require('./app/src/challengeService'),
    CommandService = require('./app/src/commandService'),
    images = require('./app/res/images_config'),
    config = require('./app/res/config'),
    express = require('express'),
    twitter_answer = null,
    twitter_question = null;

if(config.listenTwitter) {
    twitter_answer = require('./app/src/twitter_answer');
    twitter_question = require('./app/src/twitter_question');
}

if (process.env.BUGSBOT_ENVIRONMENT === undefined || process.env.BUGSBOT_ENVIRONMENT === null || process.env.BUGSBOT_ENVIRONMENT !== 'PRODUCTION') {
    process.env.BUGSBOT_ENVIRONMENT = 'DEV';
}

var app = express();
app.set('view engine', 'jade');

app.get('/newChallenge/:hashtag/:nbX/:nbY/:theme/:mapGame', function (req, res, next) {
    CommandService.createGameWithViewer(req.params.hashtag, req.params.nbX, req.params.nbY, req.params.theme, req.params.mapGame, function(data){
        if(config.listenTwitter) {
            twitter_question.ask(game);
            twitter_answer.listen(game);
        }
        //res.type('png').send(data);
    });
});

app.get('/challenges', function (req, res, next) {
    ChallengeService.getChallenges(function(challenges) {
        res.jsonp(challenges);
    });
});

app.get('/highscores/:hashtag', function (req, res, next) {
    ChallengeService.getHighscores('#' + req.params.hashtag, function(highscores) {
        res.jsonp(highscores);
    });
});

app.get('/command/:message', function (req, res, next) {
    CommandService.executeLastChallenge(req.params.message, function(result) {
        res.jsonp(result);
    });
});

app.get('/challenge/:challenge/command/:message', function (req, res, next) {
    CommandService.executeChallenge(req.params.challenge, req.params.message, function(output) {
        res.jsonp(output);
    });
});

app.get('/victory/:challenge/:command', function (req, res, next) {
    CommandService.executeLastChallenge(req.params.command, function(result) {
        res.render('victory', {
            url: 'http://lachasseauxbugs.fr/service/victory/'+encodeURIComponent(req.params.challenge)+'/'+req.params.command+'/',
            challenge: result.challenge,
            message: result.message,
            image:result.image
        });
    });
});

ChallengeService.getCurrentChallenge(function challengeCallback(game) {
    if(config.listenTwitter) {
        twitter_answer.listen(game);
    }
    CommandService.listen(game);
});

console.log('BugHunts service started on port ' + config.port);
app.listen(config.port);