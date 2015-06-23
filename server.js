var Challenge = require('./app/src/challenge'),
    twitter_answer = require('./app/src/twitter_answer'),
    challengeData = require('./res/challenge_data');

var challenge = new Challenge(challengeData.hashTag, challengeData.map);
twitter_answer.listen(challenge);