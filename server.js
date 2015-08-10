var challenge = require('bughunts-challenge'),
    ChallengeService = require('./app/src/challengeService'),
    CommandService = require('./app/src/commandService'),
    images = require('./app/res/images_config'),
    config = require('./app/res/config'),
    express = require('express'),
    crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'CreativeRabbit2015',
    separator = 'µ',
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

app.get('/challenge/:challenge', function (req, res, next) {
    CommandService.retrieveChallenge(req.params.challenge, function(output) {
        res.jsonp(output);
    });
});

app.get('/challenge/:challenge/command/:command', function (req, res, next) {
    CommandService.executeChallenge(req.params.challenge, req.params.command, function(output) {
        if (output.win){
            var cipher = crypto.createCipher(algorithm,password);
            var data = [output.challenge, output.score, output.command];
            var token = cipher.update(data.join(separator),'utf8','hex');
            token += cipher.final('hex');
            output.token = token;
        }
        res.jsonp(output);
    });
});

app.get('/challenge/:challenge/newHighScore/:name', function(req, res, next) {
    var data;
    try{
    var token = req.query.token;
    var decipher = crypto.createDecipher(algorithm,password);
    data = decipher.update(token,'hex','utf8');
    data += decipher.final('utf8');
    data = data.split(separator);
    }catch(err){
        res.status(500).send('Error');
        console.log(err);
    }
    if ('#'+req.params.challenge == data[0]){
        ChallengeService.playerSolvedChallenge(data[0], req.params.name, data[1], data[2]);
        res.jsonp({});
    }else{
        res.status(403).send('Not allowed');
    }
});

app.get('/victory/:challenge/:command', function (req, res, next) {
    CommandService.executeChallenge(req.params.challenge, req.params.command, function(result) {
        res.render('victory', {
            url: 'http://lachasseauxbugs.fr:8111/victory/'+encodeURIComponent(req.params.challenge)+'/'+req.params.command+'/',
            challenge: result.challenge,
            message: result.message,
            image:result.image
        });
    });
});

/* Twitter
ChallengeService.getCurrentChallenge(function challengeCallback(game) {
    if(config.listenTwitter) {
        twitter_answer.listen(game);
    }
    CommandService.listen(game);
});*/

console.log('BugHunts service started on port ' + config.port);
app.listen(config.port);