var Twitter = require('twitter'),
    RestClient = require('node-rest-client').Client,
    twitter_extractor = require('./twitter_extractor'),
    twitter_credentials = require('../res/twitter_credentials'),
    ChallengeService = require('./challengeService'),
    commandService = require('./commandService'),
    images = require('../res/images_config');

exports.listen = function (game) {
    console.log('Listening challenge ' + game.hashTag);
    var client = new Twitter(twitter_credentials.credentials);
    client.stream('statuses/filter', {track: twitter_credentials.botAccount}, function (stream) {
        stream.on('data', function (tweet) {
            var instructions = twitter_extractor.extractInstructions(tweet).instructions;
            if (instructions === null) {
                return;
            }
            
            var output = commandService.execute(game, instructions);
            
            if(output.win) {
              ChallengeService.playerSolvedChallenge(game.hashTag, tweet.user.screen_name, output.score);
            }

            var mapString = '';
            game.map.squares.map(function (square) {
                mapString += square;
            });
            output.image = images.config.host + '/v2/res/' + game.map.res.x + ':' + game.map.res.y + '/theme/' + images.config.default_theme + '/map/' + mapString + '/cmd/' + output.instructions + '/type/' + images.config.responseType;


            var mapClient = new RestClient();
            mapClient.get(output.image, function (data, response) {
                client.post('media/upload', {media: data}, function (error, media, response) {
                    if (!error) {
                        var parameters = {
                            // Reply to the current tweet
                            status: '@' + tweet.user.screen_name + ' ' + output.message,
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