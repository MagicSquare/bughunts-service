var Twitter = require('twitter'),
    RestClient = require('node-rest-client').Client,
    twitter_extractor = require('./twitter_extractor'),
    twitter_credentials = require('../res/twitter_credentials'),
    ChallengeService = require('./challengeService'),
    commandService = require('./commandService');

exports.listen = function (challenge) {
    console.log('Listening challenge ' + challenge.hashTag);
    var client = new Twitter(twitter_credentials.credentials);
    client.stream('statuses/filter', {track: twitter_credentials.botAccount + ' ' + challenge.hashTag}, function (stream) {
        stream.on('data', function (tweet) {
            var instructions = twitter_extractor.extractInstructions(tweet).instructions;
            if (instructions === null) {
                return;
            }
            
            var result = commandService.execute(challenge, instructions);
            
            if(result.win) {
              ChallengeService.playerSolvedChallenge(challenge.hashTag, tweet.user.screen_name, result.score);
            }
            
            var mapClient = new RestClient();
            mapClient.get(result.image, function (data, response) {
                client.post('media/upload', {media: data}, function (error, media, response) {
                    if (!error) {
                        var parameters = {
                            // Reply to the current tweet
                            status: '@' + tweet.user.screen_name + ' ' + result.message,
                            in_reply_to_status_id: tweet.id_str,
                            media_ids: media.media_id_string // Pass the media id string
                        };

                        client.post('statuses/update', parameters, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        });
                    }
                });
            });
        });

        stream.on('error', function (error) {
            console.log(error);
        });
    });
};